import * as React from "react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "w-full rounded-2xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-zinc-400/60",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";
