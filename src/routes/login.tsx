import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { Input } from "#/components/ui/Input";
import { type LoginSchema, loginSchema } from "#/lib/schemas/auth";

export const Route = createFileRoute("/login")({
	component: LoginScreen,
});

export function LoginScreen() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = (data: LoginSchema) => {
		console.log("Form data:", data);
		// Simulate API call
		return new Promise((resolve) => setTimeout(resolve, 1500));
	};

	return (
		<div className="flex h-screen bg-page">
			{/* Page body -> Content -> Form */}
			<div className="flex w-full flex-col justify-center px-8 lg:w-1/2 md:px-16 lg:px-24 py-8 overflow-y-auto">
				<div className="mx-auto w-full max-w-sm space-y-8">
					<div>
						<h1 className="text-3xl font-bold text-title">
							Log in to your account
						</h1>
					</div>

					<form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
						<div className="space-y-1.5">
							<label htmlFor="email" className="text-sm font-medium text-title">
								Email
							</label>
							<Input
								id="email"
								type="email"
								placeholder="john@example.com"
								invalid={!!errors.email}
								{...register("email")}
							/>
							{errors.email && (
								<p className="text-xs text-error">{errors.email.message}</p>
							)}
						</div>

						<div className="space-y-1.5">
							<label
								htmlFor="password"
								className="text-sm font-medium text-title"
							>
								Password
							</label>
							<Input
								id="password"
								type="password"
								placeholder="**********"
								invalid={!!errors.password}
								{...register("password")}
							/>
							{errors.password && (
								<p className="text-xs text-error">{errors.password.message}</p>
							)}
						</div>

						<div className="space-y-4 pt-2">
							<button
								type="submit"
								disabled={isSubmitting}
								className="w-full rounded-md bg-primary px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[var(--lagoon-deep)] disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{isSubmitting ? "Logging in..." : "Submit"}
							</button>

							<div className="text-center text-sm text-body">
								Don’t have an account?{" "}
								<Link
									to="/signup"
									className="font-semibold text-primary hover:underline"
								>
									Sign up
								</Link>
							</div>
						</div>
					</form>
				</div>
			</div>

			{/* Content -> Image */}
			<div className="hidden w-1/2 bg-page lg:block p-4">
				<img
					src="/image_login.png"
					alt="Login visual"
					className="h-full w-full object-cover rounded-2xl"
				/>
			</div>
		</div>
	);
}
