import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  tone?: "primary" | "ghost" | "danger";
}

export function Button({
  children,
  className = "",
  tone = "primary",
  type = "button",
  ...props
}: PropsWithChildren<ButtonProps>) {
  return (
    <button {...props} className={`button button-${tone} ${className}`.trim()} type={type}>
      {children}
    </button>
  );
}
