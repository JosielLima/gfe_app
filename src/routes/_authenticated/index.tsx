import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { logoutAction } from "#/server/actions/logout";

export const Route = createFileRoute("/_authenticated/")({
	component: App,
});

function App() {
	// Acessa o usuário que foi injetado pelo beforeLoad da rota pai (_authenticated)
	const { user } = Route.useRouteContext();
	const navigate = useNavigate();

	const logoutMutation = useMutation({
		mutationFn: () => logoutAction(),
		onSuccess: () => {
			navigate({ to: "/login" });
		},
	});

	return (
		<main className="page-wrap px-4 pb-8 pt-14">
			<section>
				<h1 className="display-title mb-5 max-w-3xl text-4xl leading-[1.02] font-bold tracking-tight sm:text-6xl">
					Bem-vindo de volta, <span className="text-primary">{user.email}</span>
				</h1>
				
				<button
					type="button"
					onClick={() => logoutMutation.mutate()}
					disabled={logoutMutation.isPending}
					className="mt-6 rounded bg-neutral-900 px-6 py-2 font-medium text-white transition-colors hover:bg-neutral-800 disabled:opacity-50 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
				>
					{logoutMutation.isPending ? "Saindo..." : "Sair da conta"}
				</button>
			</section>
		</main>
	);
}
