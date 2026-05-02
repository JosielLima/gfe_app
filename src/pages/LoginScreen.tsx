import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { Input } from "#/components/ui/Input";
import { useToastManager } from "#/components/ui/Toast";
import { type LoginSchema, loginSchema } from "#/lib/schemas/auth";
import { loginAction } from "#/server/actions/login";

export function LoginScreen() {
	const toast = useToastManager();

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
	});

	const navigate = useNavigate({ from: "/login" });

	const loginMutation = useMutation({
		mutationFn: (data: LoginSchema) => loginAction({ data }),
		onSuccess: () => {
			navigate({ to: "/" });
		},
		onError: (err: any) => {
			console.error("Login Mutation Error:", err);
			const message =
				err?.message ||
				err?.data?.message ||
				err?.response?.data?.message ||
				(typeof err === "string" ? err : "Incorrect email or password.");

			toast.add({ title: message, type: "error" });
			setError("root.serverError", {
				type: "manual",
				message,
			});
		},
	});

	const onSubmit = (data: LoginSchema) => {
		loginMutation.mutate(data);
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

					<form
						className="space-y-5"
						onSubmit={handleSubmit(onSubmit)}
						noValidate
					>
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
								disabled={loginMutation.isPending}
								className="w-full rounded-md bg-primary px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-(--lagoon-deep) disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{loginMutation.isPending ? "Logging in..." : "Submit"}
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
