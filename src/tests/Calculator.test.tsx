import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Calculator from "../components/Calculator";

import * as utils from "../utils/utils";

vi.spyOn(utils, "calcTipAmountPerPerson").mockImplementation(() => 5);
vi.spyOn(utils, "calcTotalAmountPerPerson").mockImplementation(() => 55);

describe("Calculator form component", () => {
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
    await user.click(screen.getByText("10%"));

    expect(screen.getAllByText("Can't be zero").length).toBe(2);
  });

  it("should display validation errors if invalid values is provided", async () => {
    await user.type(screen.getByLabelText("Bill"), "invalid");
    await user.type(screen.getByLabelText("Number of People"), "0.1");
    await user.click(screen.getByText("10%"));

    expect(screen.getByText("Must be a positive number")).toBeVisible();
    expect(screen.getByText("Must be 1 or more")).toBeVisible();
  });

  it("should call calcTipAmountPerPerson and calcTotalAmountPerPerson with correct values when valid form is submitted", async () => {
    await user.type(screen.getByLabelText("Bill"), "100");
    await user.type(screen.getByLabelText("Number of People"), "2");
    await user.click(screen.getByText("10%"));

    expect(utils.calcTipAmountPerPerson).toHaveBeenCalledWith({
      bill: 100,
      numPeople: 2,
      tipPercent: 10,
    });
    expect(utils.calcTotalAmountPerPerson).toHaveBeenCalledWith({
      bill: 100,
      numPeople: 2,
      tipAmount: 5.0,
    });
  });

  it("should display correctly calculated values after submit", async () => {
    await user.type(screen.getByLabelText("Bill"), "100");
    await user.type(screen.getByLabelText("Number of People"), "2");
    await user.click(screen.getByText("10%"));

    waitFor(() => {
      expect(screen.getByText("$5.00")).toBeVisible();
      expect(screen.getByText("$55.00")).toBeVisible();
    });
  });

  it("should display correctly calculated values if custom tip % is provided", async () => {
    await user.type(screen.getByLabelText("Bill"), "100");
    await user.type(screen.getByLabelText("Number of People"), "2");
    await user.type(screen.getByPlaceholderText("Custom"), "10");
    await user.keyboard("{Enter}");

    waitFor(() => {
      expect(screen.getByText("$5.00")).toBeVisible();
      expect(screen.getByText("$55.00")).toBeVisible();
    });
  });

  it("should reset entire form when reset is clicked", async () => {
    await user.type(screen.getByLabelText("Bill"), "100");
    await user.type(screen.getByLabelText("Number of People"), "2");
    await user.click(screen.getByText("10%"));
    await user.click(screen.getByRole("button", { name: "Reset" }));

    const billInput = screen.queryByLabelText("Bill") as HTMLInputElement;
    const numPeopleInput = screen.queryByLabelText(
      "Number of People",
    ) as HTMLInputElement;

    expect(billInput.value).toEqual("");
    expect(numPeopleInput.value).toEqual("");
  });
});
