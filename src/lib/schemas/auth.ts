import { z } from "zod";

export const loginSchema = z.object({
	email: z
		.string()
		.min(1, { message: "Email is required" })
		.email({ message: "Please enter a valid email address." }),
	password: z.string().min(1, { message: "Password is required" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
	email: z
		.string()
		.min(1, { message: "Email address is required." })
		.email({ message: "Please enter a valid email address." })
		.trim()
		.toLowerCase(),
	password: z
		.string()
		.min(1, { message: "Password is required" })
		.min(8, { message: "Password must be at least 8 characters" })
		.max(64, { message: "Password must be at most 64 characters" })
		.regex(/[A-Z]/, { message: "Password must contain an uppercase letter" })
		.regex(/[a-z]/, { message: "Password must contain a lowercase letter" })
		.regex(/[0-9]/, { message: "Password must contain a number" })
		.regex(/[^a-zA-Z0-9]/, {
			message: "Password must contain a special character",
		}),
	subscribe: z.boolean().refine((val) => val === true, {
		message: "You must agree to the Terms of Service to create an account.",
	}),
});

export type SignupSchema = z.infer<typeof signupSchema>;
