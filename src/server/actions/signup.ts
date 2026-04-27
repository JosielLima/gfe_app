import dns from "node:dns";
import { promisify } from "node:util";
import { createServerFn } from "@tanstack/react-start";
import bcrypt from "bcryptjs";
import { prisma } from "#/db";
import { signupSchema } from "#/lib/schemas/auth";

const resolveMx = promisify(dns.resolveMx);

export const signupAction = createServerFn({ method: "POST" })
	.inputValidator((data: unknown) => signupSchema.parse(data))
	.handler(async ({ data }) => {
		// 1. Sanitizar
		const email = data.email.toLowerCase().trim();
		const password = data.password;

		// 2. [Meta extra] Verificar registro MX do domínio
		const domain = email.split("@")[1];
		try {
			const records = await resolveMx(domain);
			if (!records || records.length === 0) {
				throw new Error("Este e-mail não parece ser válido (domínio sem MX).");
			}
		} catch (error) {
			throw new Error(
				"Este e-mail não parece ser válido (domínio inacessível).",
			);
		}

		// 3. Verificar se email já existe no banco
		const existingUser = await prisma.user.findUnique({
			where: { email },
		});

		if (existingUser) {
			throw new Error("A conta já existe. Deseja fazer login?");
		}

		// 4. Hash da senha com bcryptjs
		const saltRounds = 12;
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		// 5. Criar usuário no banco
		await prisma.user.create({
			data: {
				email,
				password: hashedPassword,
			},
		});

		return { success: true };
	});
