import * as React from "react";
import { twMerge } from "tailwind-merge";

interface TButton extends React.ComponentProps<"button"> {
  children?: React.ReactNode;
  className?: string;
}

export default function Button({ children, className, ...props }: TButton) {
  return (
    <button
      className={twMerge(
        "disabled:bg-cyan-850 inline-flex min-h-12 items-center justify-center rounded-md bg-cyan-900 px-4 text-white transition duration-300 hover:bg-cyan-400 hover:text-cyan-900 disabled:text-cyan-900 md:text-2xl",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
