import Button from "../ui/Button";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/Form";
import Input from "../ui/Input";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { IFormInput } from "./Calculator";

const tipValues = [5, 10, 15, 25, 50];

export default function CalculatorTipSelect({
  form,
  handleSubmit,
}: {
  form: UseFormReturn<IFormInput>;
  handleSubmit: SubmitHandler<IFormInput>;
}) {
  async function triggerSubmit() {
    const isValid = await form.trigger();
    if (isValid) {
      form.handleSubmit(handleSubmit)();
    }
  }

  return (
    <FormField
      control={form.control}
      name="tipPercent"
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>Select Tip %</FormLabel>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {tipValues.map((val) => (
                <Button
                  key={val}
                  className={`${val === field.value ? "bg-cyan-500 text-cyan-900" : ""}`}
                  onClick={() => {
                    form.setValue("tipPercent", val);
                    form.setValue("customTipPercent", "");
                    triggerSubmit();
                  }}
                  type="button"
                >
                  {`${val}%`}
                </Button>
              ))}

              <FormField
                control={form.control}
                name="customTipPercent"
                render={({ field }) => {
                  return (
                    <FormControl>
                      <Input
                        className="placeholder:text-cyan-800"
                        placeholder="Custom"
                        {...field}
                      />
                    </FormControl>
                  );
                }}
              />
            </div>
          </FormItem>
        );
      }}
    />
  );
}
