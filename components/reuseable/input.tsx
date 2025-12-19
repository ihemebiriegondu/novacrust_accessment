import { type InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label className="text-base font-medium text-primary">{label}</label>
        )}
        <input
          ref={ref}
          className={`px-6 py-4 rounded-full border border-border text-base outline-none focus:border-primary transition-colors ${className}`}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";
