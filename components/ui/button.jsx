import React from "react";

// Utility function to combine class names
const cn = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const Button = React.forwardRef(
  (
    {
      className,
      variant = "default",
      size = "default",
      children,
      disabled,
      loading,
      ...props
    },
    ref
  ) => {
    const variants = {
      default: "bg-blue-600 hover:bg-blue-700 text-white",
      secondary: "bg-zinc-800 hover:bg-zinc-700 text-white",
      outline: "border border-zinc-800 hover:bg-zinc-800/50 text-white",
      ghost: "hover:bg-zinc-800/50 text-white",
      destructive: "bg-red-600 hover:bg-red-700 text-white",
    };

    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-8 px-3 text-sm",
      lg: "h-12 px-6 text-lg",
      icon: "h-10 w-10",
    };

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
          "disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

// Export both as default and named export
export { Button };
export default Button;
