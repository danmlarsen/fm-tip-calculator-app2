import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Calculator from "../components/Calculator";

import * as utils from "../utils/utils";

describe("Calculator form component", () => {
  const validInputs = {
    bill: "100",
    numPeople: "2",
    tipPercent: "10%",
    customTipPercent: "10",
  };

  const calculatedTipAmount = 5;
  const calculatedTotalAmount = 55;

  vi.spyOn(utils, "calcTipAmountPerPerson").mockImplementation(
    () => calculatedTipAmount,
  );
  vi.spyOn(utils, "calcTotalAmountPerPerson").mockImplementation(
    () => calculatedTotalAmount,
  );
  const user = userEvent.setup();

  beforeEach(() => {
    render(<Calculator />);
  });

  it("should render the entire form", () => {
    expect(screen.queryByLabelText("Bill")).toBeVisible();
    expect(screen.queryByLabelText("Select Tip %")).toBeVisible();
    expect(screen.queryByLabelText("Number of People")).toBeVisible();
  });

  it("should display validation errors if required values is not provided", async () => {
    await user.click(screen.getByText(validInputs.tipPercent));

    expect(screen.getAllByText("Can't be zero").length).toBe(2);
  });

  it("should display validation errors if invalid values is provided", async () => {
    await user.type(screen.getByLabelText("Bill"), "invalid");
    await user.type(screen.getByLabelText("Number of People"), "0.1");
    await user.click(screen.getByText(validInputs.tipPercent));

    expect(screen.getByText("Must be a positive number")).toBeVisible();
    expect(screen.getByText("Must be 1 or more")).toBeVisible();
  });

  it("should call calcTipAmountPerPerson and calcTotalAmountPerPerson with correct values when valid form is submitted", async () => {
    await user.type(screen.getByLabelText("Bill"), validInputs.bill);
    await user.type(
      screen.getByLabelText("Number of People"),
      validInputs.numPeople,
    );
    await user.click(screen.getByText(validInputs.tipPercent));

    expect(utils.calcTipAmountPerPerson).toHaveBeenCalledWith({
      bill: Number(validInputs.bill),
      numPeople: Number(validInputs.numPeople),
      tipPercent: Number(validInputs.tipPercent.slice(0, -1)),
    });
    expect(utils.calcTotalAmountPerPerson).toHaveBeenCalledWith({
      bill: Number(validInputs.bill),
      numPeople: Number(validInputs.numPeople),
      tipAmount: calculatedTipAmount,
    });
  });

  it("should display correctly calculated values after submit", async () => {
    await user.type(screen.getByLabelText("Bill"), validInputs.bill);
    await user.type(
      screen.getByLabelText("Number of People"),
      validInputs.numPeople,
    );
    await user.click(screen.getByText(validInputs.tipPercent));

    await waitFor(() => {
      expect(screen.getByLabelText("Tip Amount").textContent).toEqual(
        `$${calculatedTipAmount.toFixed(2)}`,
      );
      expect(screen.getByLabelText("Total").textContent).toEqual(
        `$${calculatedTotalAmount.toFixed(2)}`,
      );
    });
  });

  it("should display correctly calculated values if custom tip % is provided", async () => {
    await user.type(screen.getByLabelText("Bill"), validInputs.bill);
    await user.type(
      screen.getByLabelText("Number of People"),
      validInputs.numPeople,
    );
    await user.type(
      screen.getByPlaceholderText("Custom"),
      validInputs.customTipPercent,
    );
    await user.keyboard("{Enter}");

    await waitFor(() => {
      expect(screen.getByLabelText("Tip Amount").textContent).toEqual(
        `$${calculatedTipAmount.toFixed(2)}`,
      );
      expect(screen.getByLabelText("Total").textContent).toEqual(
        `$${calculatedTotalAmount.toFixed(2)}`,
      );
    });
  });

  it("should reset entire form when reset is clicked", async () => {
    await user.type(screen.getByLabelText("Bill"), validInputs.bill);
    await user.type(
      screen.getByLabelText("Number of People"),
      validInputs.numPeople,
    );
    await user.click(screen.getByText(validInputs.tipPercent));
    await user.click(screen.getByRole("button", { name: "Reset" }));

    const billInput = screen.queryByLabelText("Bill") as HTMLInputElement;
    const numPeopleInput = screen.queryByLabelText(
      "Number of People",
    ) as HTMLInputElement;

    expect(billInput.value).toEqual("");
    expect(numPeopleInput.value).toEqual("");
  });
});
