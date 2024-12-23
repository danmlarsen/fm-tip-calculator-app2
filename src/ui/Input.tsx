import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface TInput extends ComponentProps<"input"> {
  className?: string;
  type?: string;
  isSubmitted?: boolean;
  invalid?: boolean;
}

export default function Input({
  className,
  type = "text",
  isSubmitted,
  invalid,
  ...props
}: TInput) {
  return (
    <input
      className={twMerge(
        `w-full rounded-md bg-cyan-100 px-4 py-2 text-right text-2xl text-cyan-900 transition duration-300 placeholder:text-cyan-900/35 focus:outline-none ${isSubmitted && !invalid ? "focus:ring focus:ring-cyan-500" : ""} ${invalid ? "ring-red ring" : ""}`,
        className,
      )}
      type={type}
      {...props}
    />
  );
}
