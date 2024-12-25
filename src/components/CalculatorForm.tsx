import { SubmitHandler, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/Form";
import Input from "../ui/Input";
import CalculatorTipSelect from "./CalculatorTipSelect";

import IconDollar from "../assets/images/icon-dollar.svg";
import IconPerson from "../assets/images/icon-person.svg";
import { IFormInput } from "./Calculator";

export default function CalculatorForm({
  form,
  handleSubmit,
}: {
  form: UseFormReturn<IFormInput>;
  handleSubmit: SubmitHandler<IFormInput>;
}) {
  return (
    <div className="space-y-8 text-cyan-800 md:space-y-10">
      <FormField
        control={form.control}
        name="bill"
        rules={{
          required: `Can't be zero`,
          pattern: {
            value: /^(?!0+$|0+\.0+$)\d+(\.\d+)?$/,
            message: "Must be a positive number",
          },
        }}
        render={({ field, fieldState }) => {
          return (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Bill</FormLabel>
                <FormMessage />
              </div>

              <div className="relative">
                <img
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  src={IconDollar}
                  alt="Dollar icon"
                />
                <FormControl>
                  <Input
                    placeholder="0"
                    invalid={fieldState.invalid}
                    {...field}
                  />
                </FormControl>
              </div>
            </FormItem>
          );
        }}
      />

      <CalculatorTipSelect form={form} handleSubmit={handleSubmit} />

      <FormField
        control={form.control}
        name="numPeople"
        rules={{
          required: `Can't be zero`,
          pattern: { value: /^(?!0+$)\d+$/, message: "Must be 1 or more" },
        }}
        render={({ field, fieldState }) => {
          return (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Number of People</FormLabel>
                <FormMessage />
              </div>
              <div className="relative">
                <img
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  src={IconPerson}
                  alt="Dollar icon"
                />
                <FormControl>
                  <Input
                    placeholder="0"
                    invalid={fieldState.invalid}
                    {...field}
                  />
                </FormControl>
              </div>
            </FormItem>
          );
        }}
      />

      <button type="submit" className="hidden" />
    </div>
  );
}
