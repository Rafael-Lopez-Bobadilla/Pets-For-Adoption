import s from "./PlacesInput.module.css";
import usePlacesInput from "./hooks/usePlacesInput";
import { useState } from "react";
const PlacesInput = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    value,
    options,
    selected,
    handleInput,
    handleKey,
    handleChange,
    inputRef,
  } = usePlacesInput();
  return (
    <div className={s.places}>
      <input
        onInput={handleInput}
        onKeyDown={handleKey}
        onBlur={() => setIsOpen(false)}
        onFocus={() => setIsOpen(true)}
        value={value}
        ref={inputRef}
        name="location"
        autoComplete="off"
        placeholder="Search by Location..."
      />
      {isOpen && (
        <div className={s.options}>
          {options.map((place, index) => (
            <div
              key={place.place_id}
              className={selected === index ? s.selected : ""}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleChange(place.description, place.place_id)}
            >
              {place.description}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlacesInput;
