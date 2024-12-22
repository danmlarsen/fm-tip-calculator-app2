import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface TInput extends ComponentProps<"input"> {
  className?: string;
  type?: string;
  isTouched?: boolean;
  invalid?: boolean;
}

export default function Input({
  className,
  type = "text",
  isTouched,
  invalid,
  ...props
}: TInput) {
  return (
    <input
      className={twMerge(
        `w-full rounded-md bg-cyan-100 px-4 py-2 text-right text-2xl text-cyan-900 placeholder:text-cyan-900/35 focus:outline-none ${isTouched && !invalid ? "focus:ring focus:ring-cyan-500" : ""} ${invalid ? "ring-red ring" : ""}`,
        className,
      )}
      type={type}
      {...props}
    />
  );
}
