import { createServerFn } from "@tanstack/react-start";
import bcrypt from "bcryptjs";
import { prisma } from "#/db";
import { loginSchema } from "#/lib/schemas/auth";

export const loginAction = createServerFn({ method: "POST" })
	.inputValidator((data: unknown) => loginSchema.parse(data))
	.handler(async ({ data }) => {
		const email = data.email.toLowerCase().trim();
		const password = data.password;

		const user = await prisma.user.findUnique({
			where: { email },
		});

		if (!user) {
			throw new Error("E-mail ou senha incorretos.");
		}

		const isValidPassword = await bcrypt.compare(password, user.password);

		if (!isValidPassword) {
			throw new Error("E-mail ou senha incorretos.");
		}

		return { success: true };
	});
