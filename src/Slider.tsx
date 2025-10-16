import { useEffect, useState } from "react";
import "./Slider.css";

const images = [
  "https://images.vexels.com/media/users/3/339257/raw/17ba72db8040d3f7c3018bb5b238494d-canoe-river-landscape-t-shirt-design.jpg",
  "https://images.lifestyleasia.com/wp-content/uploads/sites/2/2023/01/02193005/adidas-sneakers-for-men-1600x900.jpeg",
  "https://cdn.thewatchpages.com/app/uploads/2020/08/13212007/Oyster_1926_b-1.jpg",
];

const Slider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider-container">
      <img
        src={images[index]}
        alt={`Slide ${index}`}
        className="slider-image"
      />
      <div className="slider-dots">
        {images.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Slider;
