import { useState, useRef, useEffect } from "react";
import css from "./Filters.module.css";

/*
 Props:
 - options: array of string options
 - defaultSelected: initial selected option (string)
 - onSelect: function(option) called when user selects an option
*/
export default function Filters({
  options = [],
  defaultSelected = "A to Z",
  onSelect = () => {},
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultSelected);
  const dropdownRef = useRef(null);

  const toggleMenu = () => setIsOpen((p) => !p);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    onSelect(option);
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(e) {
      if (e.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className={css.dropdown} ref={dropdownRef}>
      <button
        className={css.filterBtn}
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-controls="filter-menu"
        type="button"
      >
        {selected}
        <svg className={css.btnSvg} aria-hidden="true" focusable="false">
          <use href={`/svg/icon.svg#${isOpen ? "icon-chevron-up" : "icon-chevron-down"}`} />
        </svg>
      </button>

      {isOpen && (
        <ul id="filter-menu" className={css.dropdownMenu}>
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className={`${css.dropdownItem} ${selected === option ? css.active : ""}`}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}