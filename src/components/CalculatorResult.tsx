import { motion, AnimatePresence } from "motion/react";

import Button from "../ui/Button";

const containerVariant = {
  show: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

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
      <AnimatePresence mode="wait">
        <motion.div
          variants={containerVariant}
          key={`${tipAmount}-${totalAmount}`}
          initial="hide"
          animate="show"
          exit="hide"
          className="space-y-5 md:space-y-6"
        >
          <CalculatorResultItem label="Tip Amount" value={tipAmount} />
          <CalculatorResultItem label="Total" value={totalAmount} />
        </motion.div>
      </AnimatePresence>

      <div>
        <Button
          className="w-full bg-cyan-500 uppercase text-cyan-900 md:text-xl"
          onClick={onReset}
          type="reset"
          disabled={!isDirty}
          name="Reset"
        >
          Reset
        </Button>
      </div>
    </div>
  );
}

const childVariant = {
  show: { opacity: 1 },
  hide: { opacity: 0 },
};

function CalculatorResultItem({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="flex min-h-12 items-center justify-between md:min-h-[4.4375rem]">
      <div className="flex flex-col">
        <span>{label}</span>
        <span className="text-[0.8125rem] text-cyan-800">/ person</span>
      </div>

      <motion.div
        variants={childVariant}
        className="text-3xl text-cyan-500 md:text-5xl"
        aria-label={label}
      >
        {`$${value.toFixed(2).toString()}`}
      </motion.div>
    </div>
  );
}
