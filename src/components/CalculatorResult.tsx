import Button from "../ui/Button";

export default function CalculatorResult({
  tipAmount,
  totalAmount,
  onReset,
  isDirty = false,
}: {
  tipAmount: number;
  totalAmount: number;
  onReset: () => void;
  isDirty?: boolean;
}) {
  return (
    <div className="flex flex-col justify-between gap-8">
      <div className="space-y-5 md:space-y-8">
        <CalculatorResultItem label="Tip Amount" value={tipAmount} />
        <CalculatorResultItem label="Total" value={totalAmount} />
      </div>
      <div>
        <Button
          className="w-full bg-cyan-500 uppercase text-cyan-900"
          onClick={onReset}
          type="reset"
          disabled={!isDirty}
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
        <span className="text-[13px] text-cyan-800">/ person</span>
      </div>
      <div className="text-3xl text-cyan-500 md:text-5xl">
        {`$${value.toFixed(2).toString()}`}
      </div>
    </div>
  );
}
