import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SignupScreen } from "../routes/signup";

// Mock TanStack Router
vi.mock("@tanstack/react-router", () => ({
	createFileRoute: () => () => ({}),
	Link: ({ children, to }: any) => <a href={to}>{children}</a>,
}));

describe("SignupScreen", () => {
	it("renders signup form fields", () => {
		render(<SignupScreen />);
		
		expect(screen.getByText(/Create an account/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/I agree with CodePulse/i)).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /Create account/i })).toBeInTheDocument();
	});

	it("updates password checklist as user types", async () => {
		const user = userEvent.setup();
		render(<SignupScreen />);
		
		const passwordInput = screen.getByLabelText(/Password/i);
		
		// Initial state (all failed)
		expect(screen.getByText(/8 characters minimum/i)).toBeInTheDocument();
		
		// Type 8 characters
		await user.type(passwordInput, "abcdefgh");
		expect(screen.getByText(/8 characters minimum/i)).toBeInTheDocument();
		
		// Type uppercase
		await user.clear(passwordInput);
		await user.type(passwordInput, "Abcdefgh");
		expect(screen.getByText(/One uppercase character/i)).toBeInTheDocument();
		
		// Type number
		await user.clear(passwordInput);
		await user.type(passwordInput, "Abcdefgh1");
		expect(screen.getByText(/One number/i)).toBeInTheDocument();
		
		// Type special character
		await user.clear(passwordInput);
		await user.type(passwordInput, "Abcdefgh1!");
		expect(screen.getByText(/One special character/i)).toBeInTheDocument();
	});

	it("validates email format", async () => {
		const user = userEvent.setup();
		render(<SignupScreen />);
		
		const emailInput = screen.getByLabelText(/Email/i);
		await user.type(emailInput, "invalid-email");
		
		const submitButton = screen.getByRole("button", { name: /Create account/i });
		await user.click(submitButton);

		expect(await screen.findByText(/Please enter a valid email address/i)).toBeInTheDocument();
	});

	it("can toggle terms checkbox", async () => {
		const user = userEvent.setup();
		render(<SignupScreen />);
		
		const checkbox = screen.getByLabelText(/I agree with CodePulse/i) as HTMLInputElement;
		expect(checkbox.checked).toBe(false);
		
		await user.click(checkbox);
		expect(checkbox.checked).toBe(true);
	});
});
