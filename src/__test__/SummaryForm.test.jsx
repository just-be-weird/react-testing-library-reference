import { render, screen } from "@testing-library/react";
import { SummaryForm } from "../pages/summary/SummaryForm";
import userEvent from "@testing-library/user-event";

test("Checkbox is unchecked by default", () => {
  render(<SummaryForm />);
  // get checkbox
  const checkbox = screen.getByRole("checkbox", {
    name: /i agree to terms and conditions/i,
  });
  expect(checkbox).not.toBeChecked();

  const confirmButton = screen.getByRole("button", { name: /confirm order/i });
  expect(confirmButton).toBeDisabled();
});

test("Checking checkbox enables the button", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);
  // get checkbox
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const button = screen.getByRole("button", { name: /confirm order/i });

  await user.click(checkbox);

  expect(checkbox).toBeChecked();
  expect(button).toBeEnabled();
});

test("Unchecking checkbox disables the button", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);
  // get checkbox
  const checkbox = screen.getByRole("checkbox", {
    name: /i agree to terms and conditions/i,
  });
  const button = screen.getByRole("button", { name: /confirm order/i });

  await user.click(checkbox);
  expect(button).toBeEnabled();

  await user.click(checkbox);
  expect(checkbox).not.toBeChecked();
  expect(button).toBeDisabled();
});

test("popover responds to hover", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  // popover starts out hidden
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  // popover appears on mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndConditions);
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  // popover disappears when we mouse out
  await user.unhover(termsAndConditions);
  expect(popover).not.toBeInTheDocument();
});
