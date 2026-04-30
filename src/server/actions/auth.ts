import { createServerFn } from "@tanstack/react-start";
import { getCurrentSession } from "#/server/auth/session";

export const getAuthUser = createServerFn({ method: "GET" }).handler(
	async () => {
		const { user } = await getCurrentSession();

		if (!user) {
			return null;
		}

		// Retorna apenas dados não sensíveis do usuário
		return {
			id: user.id,
			email: user.email,
		};
	},
);
