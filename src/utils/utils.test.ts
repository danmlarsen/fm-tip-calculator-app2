import { calcTipAmountPerPerson, calcTotalAmountPerPerson } from "./utils";

describe("calcTipAmountPerPerson()", () => {
  const validInput = {
    bill: 100,
    tipPercent: 10,
    numPeople: 2,
  };

  it("should return a tip amount of 100*0.1/2=5 when said input is provided", () => {
    const result = calcTipAmountPerPerson(validInput);

    expect(result).toBe(5);
  });
});

describe("calcTipAmountPerPerson()", () => {
  const validInput = {
    bill: 100,
    numPeople: 2,
    tipAmount: 5,
  };

  it("should return a total amount of 100/2+5=55 when said input is provided", () => {
    const result = calcTotalAmountPerPerson(validInput);

    expect(result).toBe(55);
  });
});
