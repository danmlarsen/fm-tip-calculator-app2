import { SubmitHandler, useForm } from "react-hook-form";
import CalculatorForm from "./CalculatorForm";
import CalculatorResult from "./CalculatorResult";
import { Form } from "../ui/Form";
import { useState } from "react";
import {
  calcTipAmountPerPerson,
  calcTotalAmountPerPerson,
} from "../utils/utils";

export interface IFormInput {
  bill: string;
  tipPercent: number;
  customTipPercent: string;
  numPeople: string;
}

export default function Calculator() {
  const form = useForm<IFormInput>({
    defaultValues: {
      bill: "",
      tipPercent: 0,
      customTipPercent: "",
      numPeople: "",
    },
  });

  const [tipAmount, setTipAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const handleSubmit: SubmitHandler<IFormInput> = ({
    bill,
    tipPercent,
    customTipPercent,
    numPeople,
  }) => {
    const activeTipPercent = customTipPercent
      ? Number(customTipPercent)
      : tipPercent;

    const tipAmount = calcTipAmountPerPerson({
      bill: Number(bill),
      tipPercent: activeTipPercent,
      numPeople: Number(numPeople),
    });

    const totalAmount = calcTotalAmountPerPerson({
      bill: Number(bill),
      numPeople: Number(numPeople),
      tipAmount,
    });

    setTotalAmount(totalAmount);
    setTipAmount(tipAmount);
  };

  const handleReset = () => {
    setTipAmount(0);
    setTotalAmount(0);
    form.reset();
  };

  return (
    <div className="grid md:min-h-[30rem]">
      <Form {...form}>
        <form
          className="grid"
          onSubmit={form.handleSubmit(handleSubmit)}
          noValidate
        >
          <div className="grid w-full gap-8 rounded-t-3xl bg-white px-6 py-8 md:grid-cols-2 md:gap-12 md:rounded-3xl md:p-8 md:pl-12">
            <div className="flex items-center justify-center">
              <CalculatorForm form={form} handleSubmit={handleSubmit} />
            </div>
            <div className="grid rounded-2xl bg-cyan-900 p-6 text-white md:p-10">
              <CalculatorResult
                tipAmount={tipAmount}
                totalAmount={totalAmount}
                onReset={handleReset}
                isDirty={form.formState.isDirty}
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
