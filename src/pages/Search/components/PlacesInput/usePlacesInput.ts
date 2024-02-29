import { useEffect, useRef, useState } from 'react'
import { loadLibrary } from './utils/loadLibrary'
import { Place } from './utils/IPlace'
import { getPredictions } from './utils/getPredictions'
const usePlacesInput = () => {
  const service = useRef<google.maps.places.AutocompleteService>()
  const [places, setPlaces] = useState<Place[] | []>([])
  const [selected, setSelected] = useState(0)
  const [value, setValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const timeoutID = useRef<number | null>(null)
  useEffect(() => {
    loadLibrary(service)
  }, [])
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value
    if (timeoutID.current) clearTimeout(timeoutID.current)
    if (!isOpen) setIsOpen(true)
    if (text === '') {
      setPlaces([])
    } else {
      getPredictions(timeoutID, service, text, setPlaces)
    }
    setValue(text)
  }

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let next = selected
    if (e.code === 'ArrowDown' && next < places.length - 1) next += 1
    if (e.code === 'ArrowUp' && next > 0) next -= 1
    if (e.code === 'Enter' && places.length > 0) {
      setValue(places[selected].description)
      setIsOpen(false)
    }
    setSelected(next)
  }
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const option = e.target as HTMLDivElement
    setValue(option.textContent as string)
    setIsOpen(false)
  }
  return { value, places, isOpen, selected, setIsOpen, handleInput, handleKey, handleClick }
}

export default usePlacesInput