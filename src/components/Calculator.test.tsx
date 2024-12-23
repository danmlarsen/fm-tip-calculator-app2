import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Calculator from "./Calculator";

describe("Calculator", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    render(<Calculator />);
  });

  it("renders", () => {
    expect(screen.queryByLabelText("Bill")).toBeVisible();
    expect(screen.queryByLabelText("Select Tip %")).toBeVisible();
    expect(screen.queryByLabelText("Number of People")).toBeVisible();
  });

  it("should display correctly calculated values after submit", async () => {
    await user.type(screen.getByLabelText("Bill"), "100");
    await user.type(screen.getByLabelText("Number of People"), "2");
    await user.click(screen.getByText("10%"));

    expect(screen.getByText("$5.00")).toBeVisible();
    expect(screen.getByText("$55.00")).toBeVisible();
  });

  it("should reset entire form when reset is clicked", async () => {
    await user.type(screen.getByLabelText("Bill"), "100");
    await user.type(screen.getByLabelText("Number of People"), "2");
    await user.click(screen.getByText("10%"));
    await user.click(screen.getByText("Reset"));

    const billInput = screen.queryByLabelText("Bill") as HTMLInputElement;
    const numPeopleInput = screen.queryByLabelText(
      "Number of People",
    ) as HTMLInputElement;

    expect(billInput.value).toEqual("");
    expect(numPeopleInput.value).toEqual("");
  });
});
