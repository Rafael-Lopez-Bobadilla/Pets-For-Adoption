import { useEffect, useRef, useState, useContext } from 'react'
import { loadLibrary } from './loadLibrary'
import { Place } from './IPlace'
import { getPredictions } from './getPredictions'
import { useSearchParams } from 'react-router-dom'
import { LocationContext } from '../../LocationProvider/LocationProvider'
import { getLocation } from '../../../utils/getLocation'
const usePlacesInput = (closeOverlay?: () => void) => {
  const service = useRef<google.maps.places.AutocompleteService>()
  const inputRef = useRef<HTMLInputElement>(null)
  const [places, setPlaces] = useState<Place[] | []>([])
  const [selected, setSelected] = useState(0)
  const [value, setValue] = useState('')
  const [params, setParams] = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)
  const timeoutID = useRef<number | null>(null)
  const { location, setLocation } = useContext(LocationContext)
  useEffect(() => {
    loadLibrary(service)
  }, [])
  useEffect(() => {
    if (location && location.address !== value) setValue(location.address)
    if (!location && value !== '') setValue('')
  }, [location])
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value
    if (timeoutID.current) clearTimeout(timeoutID.current)
    if (!isOpen) setIsOpen(true)
    if (text === '') {
      setPlaces([{ description: 'Anywhere in North America', place_id: 'Any' }])
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
      handleChange(places[selected].description, places[selected].place_id)
    }
    setSelected(next)
  }
  const handleChange = async (value: string, id: string) => {
    let newParams = new URLSearchParams(params)
    setIsOpen(false)
    if (closeOverlay !== undefined) closeOverlay()
    setPlaces([])
    inputRef.current?.blur()
    if (id === 'Any') {
      setValue('')
      setLocation(null)
      newParams.delete('location')
      setParams(newParams)
      return
    }
    setValue(value)
    const coords = await getLocation(id)
    const { lat, lng } = coords.results[0].geometry.location
    setLocation({ id: id, coords: `${lat},${lng}`, address: value })
    newParams.set('location', id)
    setParams(newParams)
  }
  const handleBlur = () => {
    setIsOpen(false)
    if (location && location.address !== value) setValue(location.address)
  }
  return {
    value, places, isOpen, selected, setIsOpen,
    handleInput, handleKey, handleChange, inputRef,
    handleBlur
  }
}

export default usePlacesInput