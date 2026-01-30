import * as React from "react";

type Variant = "default" | "outline" | "ghost";
type Size = "default" | "sm";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Button({
  className,
  variant = "default",
  size = "default",
  asChild,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
}) {
  const base =
    "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400/60 disabled:pointer-events-none disabled:opacity-50";
  const sizes: Record<Size, string> = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3"
  };
  const variants: Record<Variant, string> = {
    default: "bg-zinc-950 text-white hover:bg-zinc-800",
    outline: "border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-950",
    ghost: "bg-transparent hover:bg-zinc-100 text-zinc-950"
  };

  if (asChild) {
    // Basic "asChild" support: pass styles to a single child element (e.g. <a>)
    const child = React.Children.only(props.children) as React.ReactElement<any>;
    return React.cloneElement(child, {
      className: cn(base, sizes[size], variants[variant], child.props.className, className)
    });
  }

  return (
    <button
      className={cn(base, sizes[size], variants[variant], className)}
      {...props}
    />
  );
}
