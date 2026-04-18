import {
	Input as BaseInput,
	type InputProps as BaseInputProps,
} from "@base-ui/react/input";
import * as React from "react";
import { cn } from "#/lib/utils";

export interface InputProps extends BaseInputProps {
	/**
	 * Maps to the 'Destructive' variation in Figma.
	 * Triggers the error state styling.
	 */
	invalid?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, invalid, ...props }, ref) => {
		return (
			<BaseInput
				{...props}
				ref={ref}
				data-invalid={invalid ? "" : undefined}
				className={(state) =>
					cn(
						"flex h-12 w-full rounded-md border border-line-alt bg-canvas px-3 py-2 text-sm text-title transition-colors",
						"placeholder:text-placeholder",
						"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary",
						"disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface",
						"data-[invalid]:border-error data-[invalid]:focus-visible:ring-error data-[invalid]:text-error",
						typeof className === "function" ? className(state) : className,
					)
				}
			/>
		);
	},
);
Input.displayName = "Input";
