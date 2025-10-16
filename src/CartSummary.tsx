import { useContext } from "react";
import { AppContext } from "./context";
import "./App.css";

const CartSummary = () => {
  const { items } = useContext(AppContext);

  const total = items.reduce(
    (sum, i) => sum + i.item_cost * i.item_quantity,
    0
  );

  return (
    <div className="cart-summary">
      <h3>Purchase Summary</h3>
      <p>Total: ${total.toFixed(2)}</p>
    </div>
  );
};

export default CartSummary;
