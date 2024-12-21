import { useCalculator } from "../context/CalculatorContext";
import Button from "../ui/Button";
import { FormItem, FormLabel } from "../ui/Form";
import Input from "../ui/Input";

const tipValues = [5, 10, 15, 25, 50];

export default function CalculatorTipSelect() {
  const { state, dispatch } = useCalculator();

  return (
    <FormItem>
      <FormLabel>Select Tip %</FormLabel>
      <div className="grid grid-cols-2 gap-4">
        {tipValues.map((val) => (
          <Button
            key={val}
            className={`${val === state.tipPercent ? "bg-cyan-500 text-cyan-900" : ""}`}
            onClick={() => dispatch({ type: "selectTipPercent", payload: val })}
          >
            {val}%
          </Button>
        ))}
        <Input
          className="placeholder:text-cyan-800"
          placeholder="Custom"
          onChange={(e) =>
            dispatch({ type: "selectTipPercent", payload: +e.target.value })
          }
        />
      </div>
    </FormItem>
  );
}
