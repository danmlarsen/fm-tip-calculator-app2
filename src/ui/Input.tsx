import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface TInput extends ComponentProps<"input"> {
  className?: string;
  type?: string;
  invalid?: boolean;
}

export default function Input({
  className,
  type = "text",
  invalid,
  ...props
}: TInput) {
  return (
    <input
      className={twMerge(
        `w-full rounded-md bg-cyan-100 px-4 py-2 text-right text-2xl text-cyan-900 caret-cyan-500 transition duration-300 placeholder:text-cyan-900/35 focus:outline-none ${!invalid ? "focus:ring-2 focus:ring-cyan-500" : ""} ${invalid ? "ring-red caret-red ring-2" : ""}`,
        className,
      )}
      type={type}
      {...props}
    />
  );
}
