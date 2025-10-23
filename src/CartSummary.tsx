import React, { useContext, useState } from "react";
import { AppContext } from "./context";
import "./App.css";

const CartSummary: React.FC = () => {
  const { items, setItems } = useContext(AppContext);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptItems, setReceiptItems] = useState<any[]>([]);

  const total = items.reduce(
    (sum, i) => sum + i.item_cost * i.item_quantity,
    0
  );

  const purchasedItems = items.filter((i) => i.item_quantity > 0);

  const clearCart = () => {
    setItems(items.map((i) => ({ ...i, item_quantity: 0 })));
  };

  const handleBuyNow = () => {
    if (purchasedItems.length === 0) return;

    // Prepare receipt snapshot (so receipt shows the purchased quantities)
    setReceiptItems(purchasedItems.map((p) => ({ ...p })));

    // Deduct stock and reset item_quantity for purchased items
    const updatedItems = items.map((i) => {
      const purchased = purchasedItems.find((p) => p.item_name === i.item_name);
      if (purchased) {
        return {
          ...i,
          stock: Math.max((i.stock ?? 0) - purchased.item_quantity, 0),
          item_quantity: 0,
        };
      }
      return i;
    });

    setItems(updatedItems);
    setShowReceipt(true);
  };

  const closeReceipt = () => {
    setShowReceipt(false);
    setReceiptItems([]);
  };

  return (
    <div className="cart-summary">
      <h2>🛒 Cart Summary</h2>

      {purchasedItems.length === 0 ? (
        <p className="empty">No items purchased yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>PRODUCT</th>
              <th>UNIT PRICE</th>
              <th>QUANTITY</th>
              <th>SUBTOTAL</th>
            </tr>
          </thead>
          <tbody>
            {purchasedItems.map((item) => (
              <tr key={item.item_name}>
                <td>{item.item_name}</td>
                <td>₱{item.item_cost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td>{item.item_quantity}</td>
                <td>₱{(item.item_cost * item.item_quantity).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {purchasedItems.length > 0 && (
        <div className="summary-footer">
          <p className="total">
            <strong>Total:</strong> ₱{total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <div className="summary-buttons">
            <button className="clear-btn" onClick={clearCart}>
              Clear Cart
            </button>
            <button className="purchase-btn" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      )}
      {showReceipt && (
        <div className="receipt-modal" role="dialog" aria-modal="true">
          <div className="receipt-content">
            <h3>🧾 Purchase Receipt</h3>

            <table className="receipt-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {receiptItems.map((item) => (
                  <tr key={item.item_name}>
                    <td>{item.item_name}</td>
                    <td>₱{item.item_cost.toFixed(2)}</td>
                    <td>{item.item_quantity}</td>
                    <td>₱{(item.item_cost * item.item_quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-end fw-bold mt-3">
                Total: ₱
                {receiptItems
                  .reduce((total, item) => total + item.item_cost * item.item_quantity, 0)
                  .toFixed(2)}
            </p>
            <p>Thank you for your purchase!</p>

            <div style={{ marginTop: 12 }}>
              <button className="close-btn" onClick={closeReceipt}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartSummary;
