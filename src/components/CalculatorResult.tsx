import { useCalculator } from "../context/CalculatorContext";
import Button from "../ui/Button";

export default function CalculatorResult() {
  const { state, dispatch } = useCalculator();

  return (
    <div className="space-y-8">
      <div className="space-y-5">
        <CalculatorResultItem label="Tip Amount" value={state.tipAmount} />
        <CalculatorResultItem label="Total" value={state.total} />
      </div>
      <div>
        <Button
          className="w-full bg-cyan-500 uppercase text-cyan-900"
          onClick={() => dispatch({ type: "reset" })}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}

function CalculatorResultItem({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <span>{label}</span>
        <span className="text-cyan-800">/ person</span>
      </div>
      <div className="text-3xl text-cyan-500">
        ${value.toFixed(2).toString()}
      </div>
    </div>
  );
}
