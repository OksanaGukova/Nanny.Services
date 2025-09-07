import { useState, useEffect } from "react";
import css from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  const themes = ["", "theme-blue", "theme-gray"]; // "" = дефолтна (червона)
  const [index, setIndex] = useState(0);

  useEffect(() => {
    document.body.classList.remove("theme-blue", "theme-gray");
    if (themes[index]) {
      document.body.classList.add(themes[index]);
    }
  }, [index]);

  const toggleTheme = () => {
    setIndex((prev) => (prev + 1) % themes.length);
  };

  return (
    <div className={css.toggleWrapper} onClick={toggleTheme}>
      <div
        className={`${css.toggleSlider} ${
          index === 0 ? css.red : index === 1 ? css.blue : css.gray
        }`}
      >
        {index === 0 ? "🔴" : index === 1 ? "🔵" : "⚫"}
      </div>
    </div>
  );
}