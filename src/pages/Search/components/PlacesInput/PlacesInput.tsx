import s from './PlacesInput.module.css'
import usePlacesInput from './utils/usePlacesInput'
const PlacesInput = ({ closeOverlay }: { closeOverlay?: () => void }) => {
  const { value, places, isOpen, selected,
    setIsOpen, handleInput, handleKey, handleChange, inputRef,
    handleBlur } = usePlacesInput(closeOverlay)
  return (
    <div className={s.places}>
      <input onInput={handleInput} onKeyDown={handleKey}
        onBlur={handleBlur}
        onFocus={() => setIsOpen(true)}
        value={value}
        ref={inputRef}
        name='location'
        autoComplete='off'
        placeholder='Search by Location...' />
      {isOpen && <div className={s.options}>
        {places.map((place, index) => <div key={place.place_id}
          className={selected === index ? s.selected : ''}
          onMouseDown={e => e.preventDefault()}
          onClick={() => handleChange(place.description, place.place_id)}>
          {place.description}
        </div>)}
      </div>}
    </div>
  )
}

export default PlacesInput