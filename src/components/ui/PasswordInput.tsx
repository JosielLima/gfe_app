import { Eye, EyeOff } from "lucide-react";
import * as React from "react";
import { cn } from "#/lib/utils";
import { Input, type InputProps } from "./Input";

export const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, ...props }, ref) => {
		const [showPassword, setShowPassword] = React.useState(false);

		const toggleVisibility = () => {
			setShowPassword((prev) => !prev);
		};

		return (
			<div className="relative">
				<Input
					{...props}
					type={showPassword ? "text" : "password"}
					ref={ref}
					className={cn("pr-10", className)}
				/>
				<button
					type="button"
					onClick={toggleVisibility}
					className="absolute right-3 top-1/2 -translate-y-1/2 text-body hover:text-title transition-colors"
					aria-label={showPassword ? "Hide password" : "Show password"}
				>
					{showPassword ? (
						<EyeOff className="h-5 w-5" />
					) : (
						<Eye className="h-5 w-5" />
					)}
				</button>
			</div>
		);
	},
);

PasswordInput.displayName = "PasswordInput";
