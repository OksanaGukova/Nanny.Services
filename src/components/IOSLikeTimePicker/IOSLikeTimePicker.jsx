import { useState } from "react";
import css from "./IOSLikeTimePicker.module.css";

export default function IOSLikeTimePicker({ value, onChange }) {
  const [hour, setHour] = useState(value.split(":")[0]);
  const [minute, setMinute] = useState(value.split(":")[1]);

  const handleHourChange = (e) => {
    const newHour = e.target.value;
    setHour(newHour);
    onChange(`${newHour}:${minute}`);
  };

  const handleMinuteChange = (e) => {
    const newMinute = e.target.value;
    setMinute(newMinute);
    onChange(`${hour}:${newMinute}`);
  };

  const hours = Array.from({ length: 24 }, (_, i) =>
    String(i).padStart(2, "0")
  );
  const minutes = ["00", "30"];

  return (
    <div className={css.timePicker}>
      <label className={css.label}>Meeting time</label>
      <div className={css.pickerContainer}>
        <select
          className={css.scrollSelect}
          size="5"
          value={hour}
          onChange={handleHourChange}
        >
          {hours.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>
        <span className={css.separator}>:</span>
        <select
          className={css.scrollSelect}
          size="5"
          value={minute}
          onChange={handleMinuteChange}
        >
          {minutes.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
