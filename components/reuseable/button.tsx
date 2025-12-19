import { type ButtonHTMLAttributes, forwardRef } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary"
  fullWidth?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", fullWidth = false, children, ...props }, ref) => {
    const baseStyles = "px-6 py-3.5 rounded-full font-medium transition-colors text-base"
    const variantStyles = {
      primary: "bg-primary text-white hover:bg-[#083d3d]",
      secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    }
    const widthStyles = fullWidth ? "w-full" : ""

    return (
      <button ref={ref} className={`${baseStyles} ${variantStyles[variant]} ${widthStyles} ${className}`} {...props}>
        {children}
      </button>
    )
  },
)

Button.displayName = "Button"
