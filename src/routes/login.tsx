import { createFileRoute } from "@tanstack/react-router";
import { Input } from "#/components/ui/Input";

export const Route = createFileRoute("/login")({
	component: LoginScreen,
});

function LoginScreen() {
	return (
		<div className="flex min-h-screen bg-[var(--color-bg-base)]">
			{/* Page body -> Content -> Form */}
			<div className="flex w-full flex-col justify-center px-8 sm:w-1/2 md:px-16 lg:px-24">
				<div className="mx-auto w-full max-w-sm space-y-8">
					<div>
						<h1 className="text-3xl font-bold text-[var(--color-text-title)]">
							Log in to your account
						</h1>
					</div>

					<form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
						<div className="space-y-1.5">
							<label
								htmlFor="email"
								className="text-sm font-medium text-[var(--color-text-title)]"
							>
								Email
							</label>
							<Input id="email" type="email" placeholder="john@example.com" />
						</div>

						<div className="space-y-1.5">
							<label
								htmlFor="password"
								className="text-sm font-medium text-[var(--color-text-title)]"
							>
								Password
							</label>
							<Input id="password" type="password" placeholder="**********" />
						</div>

						<div className="space-y-4 pt-2">
							<button
								type="submit"
								className="w-full rounded-md bg-[var(--color-brand-primary)] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[var(--lagoon-deep)]"
							>
								Submit
							</button>

							<div className="text-center text-sm text-[var(--color-text-body)]">
								Don’t have an account?{" "}
								<a
									href="#"
									className="font-semibold text-[var(--color-brand-primary)] hover:underline"
								>
									Sign up
								</a>
							</div>
						</div>
					</form>
				</div>
			</div>

			{/* Content -> Image */}
			<div className="hidden w-1/2 bg-[var(--color-bg-subtle)] sm:block border-l border-[var(--color-border-base)]">
				<img
					src="/image_login.png"
					alt="Login visual"
					className="h-full w-full object-cover"
				/>
			</div>
		</div>
	);
}
