import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { signupSchema, type SignupSchema } from "#/lib/schemas/auth";
import { Input } from "#/components/ui/Input";
import { Check, CircleCheck, X } from "lucide-react";

export const Route = createFileRoute("/signup")({
	component: SignupScreen,
});

function SignupScreen() {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isSubmitting },
	} = useForm<SignupSchema>({
		resolver: zodResolver(signupSchema),
	});

	const onSubmit = (data: SignupSchema) => {
		console.log("Form data:", data);
		// Simulate API call
		return new Promise((resolve) => setTimeout(resolve, 1500));
	};

	const passwordValue = watch("password") || "";
	const passwordCriteria = [
		{ label: "8 characters minimum", met: passwordValue.length >= 8 },
		{ label: "One uppercase character", met: /[A-Z]/.test(passwordValue) },
		{ label: "One number", met: /[0-9]/.test(passwordValue) },
		{ label: "One special character", met: /[^a-zA-Z0-9]/.test(passwordValue) },
	];

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

						{/* Password Checklist */}
						<div className="space-y-2 pt-1 pb-2">
							{passwordCriteria.map((criterion, index) => (
								<div key={index} className="flex items-center space-x-2 text-sm">
									{criterion.met ? (
										<CircleCheck className="w-5 h-5 fill-green-700 text-white" />
									) : (
										<CircleCheck className="w-5 h-5  fill-gray-400 text-white" />
									)}
									<span className={criterion.met ? "text-title" : "text-body"}>
										{criterion.label}
									</span>
								</div>
							))}
						</div>
						<div className="flex items-start space-x-3 pt-2 pb-2">
							<div className="flex h-5 items-center">
								<input
									id="subscribe"
									type="checkbox"
									className="h-4 w-4 border-2 border-line-alt text-primary focus:ring-primary bg-transparent"
									{...register("subscribe")}
								/>
							</div>
							<label htmlFor="subscribe" className="text-sm font-medium text-body">
								I agree with CodePulse <span className="text-primary hover:underline cursor-pointer">Terms of Service</span>
							</label>
						</div>

						<div className="space-y-4 pt-2">
							<button
								type="submit"
								disabled={isSubmitting}
								className="w-full rounded-md bg-primary px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[var(--lagoon-deep)] disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{isSubmitting ? "Creating account..." : "Create account"}
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
