import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface TInput extends ComponentProps<"input"> {
  className?: string;
  type?: string;
}

export default function Input({ className, type = "text", ...props }: TInput) {
  return (
    <input
      className={twMerge(
        "w-full bg-cyan-100 px-4 py-2 text-right text-2xl text-cyan-900 placeholder:text-cyan-900/35",
        className,
      )}
      type={type}
      {...props}
    />
  );
}
