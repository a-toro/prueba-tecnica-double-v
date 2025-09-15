import React from "react";

type Variant = "primary" | "destroy" | "ghost";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  loading?: boolean;
  fullWidth?: boolean;
}

export default function Button({
  variant = "primary",
  loading = false,
  disabled,
  className = "",
  children,
  fullWidth,
  ...props
}: ButtonProps) {
  const base = ` ${
    fullWidth ? "w-full" : "w-full sm:w-auto"
  }inline-flex justify-center items-center rounded-sm px-4 py-2 text-sm font-medium transition-colors focus:outline-none h-fit`;

  const variantClasses: Record<Variant, string> = {
    primary: "bg-black/90 text-white",
    destroy: "bg-red-600 text-white",
    ghost: "bg-white border-gray-400 border",
  };

  return (
    <button
      type="button"
      disabled={disabled || loading}
      className={`${base} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {loading ? "Cargando..." : children}
    </button>
  );
}
