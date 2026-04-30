import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { getAuthUser } from "#/server/actions/auth";

export const Route = createFileRoute("/_authenticated")({
	beforeLoad: async ({ location }) => {
		const user = await getAuthUser();

		if (!user) {
			throw redirect({
				to: "/login",
				search: {
					redirect: location.href,
				},
			});
		}

		// Estende o contexto da rota para que rotas filhas tenham acesso ao usuário
		return {
			user,
		};
	},
	component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
	return (
		<>
			<Outlet />
		</>
	);
}
