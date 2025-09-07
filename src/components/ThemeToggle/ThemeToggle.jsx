import { useState, useEffect } from "react";
import css from "./ThemeToggle.module.css";

  const themes = ["", "theme-blue", "theme-green"]; // "" = дефолтна (червона)
  
export default function ThemeToggle() {

  const [index, setIndex] = useState(0);

  useEffect(() => {
    document.body.classList.remove("theme-blue", "theme-green");
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
          index === 0 ? css.red : index === 1 ? css.blue : css.green
        }`}
      >
      {index === 0 ? "🔴" : index === 1 ? "🔵" : "🟢"}
      </div>
    </div>
  );
}