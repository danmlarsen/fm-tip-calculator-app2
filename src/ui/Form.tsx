import * as React from "react";
import { twMerge } from "tailwind-merge";

export function Form() {
  return <div>form</div>;
}

export function FormField() {
  return <div>form field</div>;
}

type FormItemContextValue = {
  id: string;
};
const FormitemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

interface TFormItem extends React.ComponentProps<"div"> {
  className?: string;
}

export function FormItem({ className, ...props }: TFormItem) {
  const id = React.useId();

  return (
    <FormitemContext.Provider value={{ id }}>
      <div className={twMerge("space-y-2", className)} {...props} />
    </FormitemContext.Provider>
  );
}

interface TFormLabel extends React.ComponentProps<"label"> {
  children?: React.ReactNode;
  className?: string;
}

export function FormLabel({ children, className, ...props }: TFormLabel) {
  const { id } = React.useContext(FormitemContext);

  return (
    <label className={twMerge("block", className)} htmlFor={id} {...props}>
      {children}
    </label>
  );
}

export function FormControl({
  children,
  ...props
}: {
  children: React.ReactElement;
}) {
  const { id } = React.useContext(FormitemContext);

  return React.cloneElement(children, { id, ...props });
}
