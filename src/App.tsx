import { useContext, useEffect } from "react";
import { AppContext } from "./context";
import CartSummary from "./CartSummary";
import Slider from "./Slider";
import "./App.css";

const App = () => {
  const { items, setItems } = useContext(AppContext);

  // Initialize product list with descriptions
  useEffect(() => {
    if (items.length === 0) {
      setItems([
        {
          item_name: "T-Shirt",
          item_cost: 10.55,
          item_quantity: 0,
          description: "Soft cotton T-shirt perfect for casual wear.",
        },
        {
          item_name: "Shoes",
          item_cost: 100.0,
          item_quantity: 0,
          description: "Comfortable running shoes for everyday use.",
        },
        {
          item_name: "Watch",
          item_cost: 500.99,
          item_quantity: 0,
          description: "The Apple Watch is a versatile smartwatch .",
        },
      ] as any); // Add `as any` to allow extra description field if your context type is strict
    }
  }, [items, setItems]);

  const increase = (name: string) => {
    setItems(
      items.map((i) =>
        i.item_name === name
          ? { ...i, item_quantity: i.item_quantity + 1 }
          : i
      )
    );
  };

  const decrease = (name: string) => {
    setItems(
      items.map((i) =>
        i.item_name === name && i.item_quantity > 0
          ? { ...i, item_quantity: i.item_quantity - 1 }
          : i
      )
    );
  };

  return (
    <div className="container">
      <Slider />

      <div className="main-content">
        {/* Featured Product */}
        <div className="featured">
          <img
            src="https://th.bing.com/th/id/ODL.cf1f293b0e98b2fe1f4c8e2e5d3a6e31?w=150&h=112&c=1&rs=1&qlt=80&o=6&cb=12&dpr=1.1&pid=RichNav"
            alt="Featured Product"
          />
          <h3>Featured Product</h3>
          <p className="price">$49.99</p>
          <div className="stars">⭐⭐⭐⭐⭐</div>
        </div>

        {/* Product List */}
        <div className="product-list">
          <h2>Product List</h2>
          <div className="product-items">
            {items.map((item) => (
              <div key={item.item_name} className="product-card">
                <img
                  src={
                    item.item_name === "T-Shirt"
                      ? "https://is4.revolveassets.com/images/p4/n/uv/ALLR-MS48_V1.jpg"
                      : item.item_name === "Shoes"
                      ? "https://is4.revolveassets.com/images/p4/n/uv/ONR-WZ252_V1.jpg"
                      : "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/49-cell-titanium-alpine-blue-ultra?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1693501939819"
                  }
                  alt={item.item_name}
                />
                <h3>{item.item_name}</h3>
                <p className="desc">{(item as any).description}</p>
                <p className="price">${item.item_cost.toFixed(2)}</p>
                <div className="quantity-control">
                  <button onClick={() => decrease(item.item_name)}>-</button>
                  <span>{item.item_quantity}</span>
                  <button onClick={() => increase(item.item_name)}>+</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CartSummary />
    </div>
  );
};

export default App;
