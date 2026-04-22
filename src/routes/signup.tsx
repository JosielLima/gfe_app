import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { signupSchema, type SignupSchema } from "#/lib/schemas/auth";
import { Input } from "#/components/ui/Input";

export const Route = createFileRoute("/signup")({
	component: SignupScreen,
});

function SignupScreen() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignupSchema>({
		resolver: zodResolver(signupSchema),
	});

	const onSubmit = (data: SignupSchema) => {
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
							Create an account
						</h1>
					</div>

					<form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
						<div className="space-y-1.5">
							<label htmlFor="name" className="text-sm font-medium text-title">
								Name
							</label>
							<Input
								id="name"
								type="text"
								placeholder="John Doe"
								invalid={!!errors.name}
								{...register("name")}
							/>
							{errors.name && (
								<p className="text-xs text-error">{errors.name.message}</p>
							)}
						</div>

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
								{isSubmitting ? "Creating account..." : "Sign Up"}
							</button>

							<div className="text-center text-sm text-body">
								Already have an account?{" "}
								<Link
									to="/login"
									className="font-semibold text-primary hover:underline"
								>
									Log in
								</Link>
							</div>
						</div>
					</form>
				</div>
			</div>

			{/* Content -> Image */}
			<div className="hidden w-1/2 bg-page lg:block  p-4">
				<img
					src="/image_SingUp.png"
					alt="Sign up visual"
					className="h-full w-full object-cover rounded-2xl"
				/>
			</div>
		</div>
	);
}
