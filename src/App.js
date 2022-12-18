import { useState } from "react";
import Container from "react-bootstrap/Container";

import OrderConfirmation from "./pages/confirmation/OrderConfirmation";
import OrderEntry from "./pages/entry/OrderEntry";
import OrderSummary from "./pages/summary/OrderSummary";
import { OrderDetailsProvider } from "./contexts/OrderDetails";

export const camelCaseToCapitalLettersWithSpaces = (colorName) => {
  return colorName.replace(/\B([A-Z])\B/g, " $1");
};

function App() {
  const [color, setColor] = useState("MediumVioletRed");
  const [checked, setChecked] = useState(false);
  // orderPhase needs to be 'inProgress', 'review' or 'completed'
  const [orderPhase, setOrderPhase] = useState("inProgress");

  let Component = OrderEntry; // default to order page
  switch (orderPhase) {
    case "inProgress":
      Component = OrderEntry;
      break;
    case "review":
      Component = OrderSummary;
      break;
    case "completed":
      Component = OrderConfirmation;
      break;
    default:
  }

  return (
    <OrderDetailsProvider>
      <div className="App">
        <button
          disabled={checked}
          style={{ backgroundColor: checked ? "gray" : color }}
          onClick={() =>
            setColor(
              color === "MediumVioletRed" ? "MidnightBlue" : "MediumVioletRed"
            )
          }
        >
          Change to{" "}
          {color === "MediumVioletRed" ? "midnight blue" : "medium violet red"}
        </button>
        <input
          aria-checked={checked}
          id={"app-checkbox"}
          type="checkbox"
          checked={checked}
          // Clever way to check if the check was checked or not checked using native API
          onChange={(e) => setChecked(e.target.checked)}
        />
        <label htmlFor={"app-checkbox"}>Disable the button</label>
      </div>
      <Container>{<Component setOrderPhase={setOrderPhase} />}</Container>
    </OrderDetailsProvider>
  );
}

export default App;
