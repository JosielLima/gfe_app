import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { Check } from "lucide-react";
import * as React from "react";
import { cn } from "#/lib/utils";

export interface CheckboxProps extends BaseCheckbox.Root.Props {}

/**
 * Custom Checkbox component using Base UI.
 * Renders a clickable span that behaves like a checkbox.
 */
export const Checkbox = React.forwardRef<HTMLElement, CheckboxProps>(
	({ className, ...props }, ref) => {
		return (
			<BaseCheckbox.Root
				{...props}
				ref={ref}
				className={(state) =>
					cn(
						"peer h-4 w-4 shrink-0 rounded-sm border border-line-alt bg-canvas transition-all cursor-pointer flex items-center justify-center",
						"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
						"disabled:cursor-not-allowed disabled:opacity-50",
						state.checked && "bg-primary border-primary",
						typeof className === "function" ? className(state) : className,
					)
				}
			>
				<BaseCheckbox.Indicator className="flex items-center justify-center text-white">
					<Check className="h-3 w-3" strokeWidth={4} />
				</BaseCheckbox.Indicator>
			</BaseCheckbox.Root>
		);
	},
);
Checkbox.displayName = "Checkbox";
