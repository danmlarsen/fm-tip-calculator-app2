import { CalculatorContextProvider } from "../context/CalculatorContext";
import CalculatorForm from "./CalculatorForm";
import CalculatorResult from "./CalculatorResult";

export default function Calculator() {
  return (
    <CalculatorContextProvider>
      <div className="flex w-full max-w-[920px] flex-col gap-8 rounded-t-3xl bg-white px-6 py-8">
        <div>
          <CalculatorForm />
        </div>
        <div className="rounded-2xl bg-cyan-900 p-6 text-white">
          <CalculatorResult />
        </div>
      </div>
    </CalculatorContextProvider>
  );
}
