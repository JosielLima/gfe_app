import { createServerFn } from "@tanstack/react-start";
import { redirect } from "@tanstack/react-router";
import { getCookie } from "@tanstack/react-start/server";
import {
	SESSION_COOKIE_NAME,
	deleteSessionCookie,
	invalidateSession,
} from "#/server/auth/session";

export const logoutAction = createServerFn({ method: "POST" }).handler(
	async () => {
		const sessionId = getCookie(SESSION_COOKIE_NAME);

		if (sessionId) {
			await invalidateSession(sessionId);
		}

		deleteSessionCookie();

		throw redirect({ to: "/login" });
	},
);
