import Button from "../ui/Button";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/Form";
import Input from "../ui/Input";
import { UseFormReturn } from "react-hook-form";
import { IFormInput } from "./Calculator";

const tipValues = [5, 10, 15, 25, 50];

export default function CalculatorTipSelect({
  form,
}: {
  form: UseFormReturn<IFormInput>;
}) {
  return (
    <FormField
      control={form.control}
      name="tipPercent"
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>Select Tip %</FormLabel>
            <div className="grid grid-cols-2 gap-4">
              {tipValues.map((val) => (
                <Button
                  key={val}
                  className={`${val === field.value ? "bg-cyan-500 text-cyan-900" : ""}`}
                  onClick={() => form.setValue("tipPercent", val)}
                >
                  {val}%
                </Button>
              ))}
              <FormControl>
                <Input
                  className="placeholder:text-cyan-800"
                  placeholder="Custom"
                  onChange={(e) => form.setValue("tipPercent", +e.target.value)}
                />
              </FormControl>
            </div>
          </FormItem>
        );
      }}
    />
  );
}
