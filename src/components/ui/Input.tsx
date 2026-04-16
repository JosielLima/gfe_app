import * as React from 'react';
import { Input as BaseInput, type InputProps as BaseInputProps } from '@base-ui/react/input';
import { cn } from '#/lib/utils';

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
        data-invalid={invalid ? '' : undefined}
        className={(state) => cn(
          "flex h-12 w-full rounded-md border border-[var(--color-border-alt)] bg-[var(--color-bg-canvas)] px-3 py-2 text-sm text-[var(--color-text-title)] transition-colors",
          "placeholder:text-[var(--color-text-placeholder)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)] focus-visible:border-[var(--color-brand-primary)]",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--color-bg-subtle)]",
          "data-[invalid]:border-[var(--color-brand-error)] data-[invalid]:focus-visible:ring-[var(--color-brand-error)] data-[invalid]:text-[var(--color-brand-error)]",
          typeof className === 'function' ? className(state) : className
        )}
      />
    );
  }
);
Input.displayName = 'Input';
