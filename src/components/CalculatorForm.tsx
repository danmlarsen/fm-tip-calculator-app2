import { FormControl, FormItem, FormLabel } from "../ui/Form";
import Input from "../ui/Input";
import CalculatorTipSelect from "./CalculatorTipSelect";

import IconDollar from "../assets/images/icon-dollar.svg";
import IconPerson from "../assets/images/icon-person.svg";

export default function CalculatorForm() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log("form submit");
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="space-y-8 text-cyan-800">
        <FormItem>
          <FormLabel>Bill</FormLabel>
          <div className="relative bg-cyan-100">
            <img
              className="absolute left-4 top-1/2 -translate-y-1/2"
              src={IconDollar}
              alt="Dollar icon"
            />
            <FormControl>
              <Input placeholder="0" />
            </FormControl>
          </div>
        </FormItem>
        <CalculatorTipSelect />
        <FormItem>
          <FormLabel>Number of People</FormLabel>
          <div className="relative bg-cyan-100">
            <img
              className="absolute left-4 top-1/2 -translate-y-1/2"
              src={IconPerson}
              alt="Dollar icon"
            />
            <FormControl>
              <Input placeholder="0" />
            </FormControl>
          </div>
        </FormItem>
      </div>
    </form>
  );
}
