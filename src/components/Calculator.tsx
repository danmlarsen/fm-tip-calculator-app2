import { SubmitHandler, useForm } from "react-hook-form";
import CalculatorForm from "./CalculatorForm";
import CalculatorResult from "./CalculatorResult";
import { Form } from "../ui/Form";
import { useState } from "react";

export interface IFormInput {
  bill: string;
  tipPercent: number;
  numPeople: string;
}

export default function Calculator() {
  const form = useForm<IFormInput>({
    defaultValues: {
      bill: "",
      tipPercent: 0,
      numPeople: "",
    },
  });

  const [tipAmount, setTipAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const handleSubmit: SubmitHandler<IFormInput> = ({
    bill,
    tipPercent,
    numPeople,
  }) => {
    const tipAmount = (+bill * (tipPercent / 100)) / +numPeople;
    const totalAmount = +bill / +numPeople + tipAmount;

    setTotalAmount(totalAmount);
    setTipAmount(tipAmount);
  };

  const handleReset = () => {
    setTipAmount(0);
    setTotalAmount(0);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} noValidate>
        <div className="flex w-full max-w-[920px] flex-col gap-8 rounded-t-3xl bg-white px-6 py-8">
          <div>
            <CalculatorForm form={form} />
          </div>
          <div className="rounded-2xl bg-cyan-900 p-6 text-white">
            <CalculatorResult
              tipAmount={tipAmount}
              totalAmount={totalAmount}
              onReset={handleReset}
            />
          </div>
        </div>
      </form>
    </Form>
  );
}
