import dns from "node:dns";
import { promisify } from "node:util";
import { createServerFn } from "@tanstack/react-start";
import { setResponseStatus } from "@tanstack/react-start/server";
import bcrypt from "bcryptjs";
import { prisma } from "#/db";
import { signupSchema } from "#/lib/schemas/auth";
import { createSession, setSessionCookie } from "#/server/auth/session";

const resolveMx = promisify(dns.resolveMx);

export const signupAction = createServerFn({ method: "POST" })
	.inputValidator((data: unknown) => signupSchema.parse(data))
	.handler(async ({ data }) => {
		const { email, password } = data;

		// 1. [Meta extra] Verificar registro MX do domínio
		const domain = email.split("@")[1];
		try {
			const records = await resolveMx(domain);
			if (!records || records.length === 0) {
				setResponseStatus(400);
				throw new Error("Este e-mail não parece ser válido (domínio sem MX).");
			}
		} catch (_error) {
			setResponseStatus(400);
			throw new Error(
				"Este e-mail não parece ser válido (domínio inacessível).",
			);
		}

		// 2. Verificar se email já existe no banco
		const existingUser = await prisma.user.findUnique({
			where: { email },
		});

		if (existingUser) {
			setResponseStatus(409); // Conflict
			throw new Error("Account already exists. Sign in instead?");
		}

		// 3. Hash da senha com bcryptjs
		const saltRounds = 12;
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		// 4. Criar usuário no banco
		const user = await prisma.user.create({
			data: {
				email,
				password: hashedPassword,
			},
		});

		const session = await createSession(user.id);
		setSessionCookie(session.id);

		return { success: true };
	});
