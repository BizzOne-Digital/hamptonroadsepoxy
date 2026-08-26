import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-gold text-white hover:bg-[#255cc4] shadow-sm hover:shadow-md",
  secondary:
    "bg-forest text-ivory hover:bg-[#0a1522] shadow-sm hover:shadow-md",
  outline:
    "border border-forest text-forest hover:bg-forest hover:text-ivory bg-transparent",
  ghost: "text-forest hover:bg-cream bg-transparent",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-colors duration-200 whitespace-nowrap";

interface CommonProps {
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

interface LinkButtonProps extends CommonProps {
  href: string;
}

export function LinkButton({ href, variant = "primary", className = "", children }: LinkButtonProps) {
  return (
    <Link href={href} className={`${base} ${variantClasses[variant]} ${className}`}>
      {children}
    </Link>
  );
}

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">, CommonProps {}

export default function Button({ variant = "primary", className = "", children, ...rest }: ButtonProps) {
  return (
    <button className={`${base} ${variantClasses[variant]} ${className} disabled:opacity-60 disabled:cursor-not-allowed`} {...rest}>
      {children}
    </button>
  );
}
