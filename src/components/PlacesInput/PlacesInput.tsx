import s from './PlacesInput.module.css'
import usePlacesInput from './usePlacesInput'
const PlacesInput = () => {
  const { value, places, isOpen, selected,
    setIsOpen, handleInput, handleKey, handleClick } = usePlacesInput()
  return (
    <div className={s.places}>
      <input onInput={handleInput} onKeyDown={handleKey}
        onBlur={() => setIsOpen(false)}
        onFocus={() => setIsOpen(true)}
        value={value}
        placeholder='Search by Location...' />
      {isOpen && <div className={s.options}>
        {places.map((place, index) => <div key={place.place_id}
          className={selected === index ? s.selected : ''}
          onMouseDown={e => e.preventDefault()}
          onClick={handleClick}>
          {place.description}
        </div>)}
      </div>}
    </div>
  )
}

export default PlacesInput