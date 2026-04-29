import { z } from "zod";

export const loginSchema = z.object({
	email: z.email({ message: "Please enter a valid email address" }),
	password: z
		.string()
		.min(6, { message: "Password must be at least 6 characters" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
	email: z.email({ message: "Please enter a valid email address" }),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters" })
		.regex(/[A-Z]/, { message: "Must contain at least 1 uppercase letter" })
		.regex(/[0-9]/, { message: "Must contain at least 1 number" })
		.regex(/[^a-zA-Z0-9]/, {
			message: "Must contain at least 1 special character",
		}),
	subscribe: z.literal(true, {
		message:
			"Você deve concordar com os Termos de Serviço para criar uma conta.",
	}),
});

export type SignupSchema = z.infer<typeof signupSchema>;
