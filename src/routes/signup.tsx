import { createFileRoute } from "@tanstack/react-router";
import { SignupScreen } from "#/pages/SignupScreen";

export const Route = createFileRoute("/signup")({
	component: SignupScreen,
});
