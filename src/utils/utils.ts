export const calcTipAmountPerPerson = ({
  bill,
  tipPercent,
  numPeople,
}: {
  bill: number;
  tipPercent: number;
  numPeople: number;
}) => (bill * (tipPercent / 100)) / numPeople;

export const calcTotalAmountPerPerson = ({
  bill,
  numPeople,
  tipAmount,
}: {
  bill: number;
  numPeople: number;
  tipAmount: number;
}) => bill / numPeople + tipAmount;
