import { createFileRoute } from "@tanstack/react-router";
import { HomeScreen } from "#/pages/HomeScreen";

export const Route = createFileRoute("/_authenticated/")({
	component: App,
});

function App() {
	// Acessa o usuário que foi injetado pelo beforeLoad da rota pai (_authenticated)
	const { user } = Route.useRouteContext();

	return <HomeScreen user={user} />;
}
