import { render, screen, waitFor } from "../test-utils/testing-library-utils";
import { rest } from "msw";
import { server } from "../mocks/server";
import userEvent from "@testing-library/user-event";
import OrderEntry from "../pages/entry/OrderEntry";

test("handles error for scoops and toppings routes", async () => {
  // Override our handlers (there mocked response) defined in handlers.js for following paths/urls
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry setOrderPhase={jest.fn()} />);
  // As alerts are going to be rendered only when the ERROR occurs
  // and that will only happen when the promise is rejected which makes the
  // rendering of alert async
  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert"); // { name: "An unexpected error occurred. Please try again later.", }
    expect(alerts).toHaveLength(2);
  });
});

test("disable order button if there are no scoops ordered", async () => {
  const user = userEvent.setup();
  render(<OrderEntry setOrderPhase={jest.fn()} />);

  // order button should be disabled at first, even before options load
  const orderButton = screen.getByRole("button", { name: /order sundae/i });
  expect(orderButton).toBeDisabled();

  // expect button to be enabled after adding scoop
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(orderButton).toBeEnabled();

  // expect button to be disabled again after removing scoop
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "0");
  expect(orderButton).toBeDisabled();
});
