import { randomBytes } from "node:crypto";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import { prisma as db } from "#/db";

export const SESSION_COOKIE_NAME = "auth_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 dias em segundos

/**
 * 1. Gerar um ID longo e aleatório (o crachá)
 */
export function generateSessionId(): string {
	return randomBytes(32).toString("hex");
}

/**
 * 2. Salvar no banco conectando ao usuário, com uma data de validade
 */
export async function createSession(userId: string) {
	const sessionId = generateSessionId();
	const expiresAt = new Date(Date.now() + SESSION_MAX_AGE * 1000);

	const session = await db.session.create({
		data: {
			id: sessionId,
			userId,
			expiresAt,
		},
	});

	return session;
}

/**
 * 3. Colocar esse ID em um Cookie HttpOnly para enviar ao navegador
 */
export function setSessionCookie(sessionId: string) {
	setCookie(SESSION_COOKIE_NAME, sessionId, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		path: "/",
		maxAge: SESSION_MAX_AGE,
	});
}

/**
 * Valida o crachá lendo do banco de dados e verificando expiração
 */
export async function validateSession(sessionId: string) {
	const session = await db.session.findUnique({
		where: { id: sessionId },
		include: { user: true },
	});

	if (!session) {
		return { session: null, user: null };
	}

	// Se passou da validade, deletamos do banco (Limpeza de Sessões Velhas)
	if (Date.now() >= session.expiresAt.getTime()) {
		await db.session.delete({ where: { id: sessionId } });
		return { session: null, user: null };
	}

	return { session, user: session.user };
}

/**
 * Obtém a sessão do usuário atual baseada no cookie recebido na requisição
 */
export async function getCurrentSession() {
	const sessionId = getCookie(SESSION_COOKIE_NAME);
	if (!sessionId) {
		return { session: null, user: null };
	}

	const result = await validateSession(sessionId);
	if (!result.session) {
		// Se a sessão for inválida ou expirou, limpamos o cookie do navegador
		deleteSessionCookie();
	}
	return result;
}

/**
 * Invalida (deleta) a sessão no banco de dados (usado no Logout)
 */
export async function invalidateSession(sessionId: string) {
	await db.session.delete({ where: { id: sessionId } }).catch(() => {
		// Ignorar erro se a sessão já não existir
	});
}

/**
 * Deleta o cookie do navegador (usado no Logout ou quando expira)
 */
export function deleteSessionCookie() {
	setCookie(SESSION_COOKIE_NAME, "", {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		path: "/",
		maxAge: 0,
	});
}
