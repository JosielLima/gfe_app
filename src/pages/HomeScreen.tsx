import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { logoutAction } from "#/server/actions/logout";

interface HomeScreenProps {
	user: { email: string };
}

export function HomeScreen({ user }: HomeScreenProps) {
	const navigate = useNavigate();

	const logoutMutation = useMutation({
		mutationFn: () => logoutAction(),
		onSuccess: () => {
			navigate({ to: "/login" });
		},
	});

	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 relative">
			{/* NavBar for Logout */}
			<nav className="absolute top-0 right-0 w-full flex justify-end p-6">
				<button
					type="button"
					onClick={() => logoutMutation.mutate()}
					disabled={logoutMutation.isPending}
					className="text-gray-600 hover:text-gray-900 font-semibold text-sm transition-colors disabled:opacity-50"
				>
					{logoutMutation.isPending ? "Logging out..." : "Log out"}
				</button>
			</nav>

			{/* Success Card */}
			<div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-10 flex flex-col items-center">
				{/* Icon */}
				<div className="w-16 h-16 bg-white border border-gray-100 rounded-full flex items-center justify-center mb-6 shadow-sm">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="text-emerald-500 w-8 h-8"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
						role="img"
						aria-label="Success Checkmark"
					>
						<title>Success Checkmark</title>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M5 13l4 4L19 7"
						/>
					</svg>
				</div>

				{/* Text */}
				<p className="text-gray-500 text-lg font-medium">Welcome back,</p>
				<h1 className="text-gray-900 text-2xl font-bold mt-1 text-center break-all">
					{user.email}
				</h1>
			</div>
		</div>
	);
}
