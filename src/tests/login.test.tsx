import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginScreen } from "../routes/login";

// Mock TanStack Router
vi.mock("@tanstack/react-router", () => ({
	createFileRoute: () => () => ({}),
	Link: ({ children, to }: any) => <a href={to}>{children}</a>,
}));

describe("LoginScreen", () => {
	it("renders login form fields", () => {
		render(<LoginScreen />);
		
		expect(screen.getByText(/Log in to your account/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /Submit/i })).toBeInTheDocument();
	});

	it("shows validation errors for empty fields on submit", async () => {
		const user = userEvent.setup();
		render(<LoginScreen />);
		
		const submitButton = screen.getByRole("button", { name: /Submit/i });
		await user.click(submitButton);

		expect(await screen.findByText(/Please enter a valid email address/i)).toBeInTheDocument();
		expect(await screen.findByText(/Password must be at least 6 characters/i)).toBeInTheDocument();
	});

	it("shows error for invalid email", async () => {
		const user = userEvent.setup();
		render(<LoginScreen />);
		
		const emailInput = screen.getByLabelText(/Email/i);
		await user.type(emailInput, "invalid-email");
		
		const submitButton = screen.getByRole("button", { name: /Submit/i });
		await user.click(submitButton);

		expect(await screen.findByText(/Please enter a valid email address/i)).toBeInTheDocument();
	});

	it("disables button during submission", async () => {
		const user = userEvent.setup();
		render(<LoginScreen />);
		
		const emailInput = screen.getByLabelText(/Email/i);
		const passwordInput = screen.getByLabelText(/Password/i);
		const submitButton = screen.getByRole("button", { name: /Submit/i });

		await user.type(emailInput, "test@example.com");
		await user.type(passwordInput, "password123");
		
		await user.click(submitButton);

		expect(submitButton).toBeDisabled();
		expect(screen.getByText(/Logging in.../i)).toBeInTheDocument();

		await waitFor(() => {
			expect(submitButton).not.toBeDisabled();
		}, { timeout: 2000 });
	});
});
