import * as React from "react";
import { twMerge } from "tailwind-merge";
import { Slot } from "@radix-ui/react-slot";

import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form";

export const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ ...props }: ControllerProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
}

export function useFormField() {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormitemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
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
      <div className={twMerge("space-y-[0.375rem]", className)} {...props} />
    </FormitemContext.Provider>
  );
}

interface TFormLabel extends React.ComponentProps<"label"> {
  children?: React.ReactNode;
  className?: string;
}

export function FormLabel({ children, className, ...props }: TFormLabel) {
  const { formItemId } = useFormField();

  return (
    <label
      className={twMerge("block", className)}
      htmlFor={formItemId}
      {...props}
    >
      {children}
    </label>
  );
}

export function FormControl({ ...props }) {
  const { formItemId, error } = useFormField();

  return <Slot id={formItemId} aria-invalid={!!error} {...props} />;
}

interface TFormMessage extends React.ComponentProps<"p"> {
  children?: React.ReactNode;
  className?: string;
}

export function FormMessage({ children, className, ...props }: TFormMessage) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p id={formMessageId} className={twMerge("text-red", className)} {...props}>
      {body}
    </p>
  );
}
