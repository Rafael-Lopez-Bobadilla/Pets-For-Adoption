import { useEffect, useRef, useState } from 'react'
import { Loader } from "@googlemaps/js-api-loader"
interface Place {
  description: string,
  place_id: string
}
const usePlacesInput = () => {
  const service = useRef<google.maps.places.AutocompleteService | undefined>()
  const [places, setPlaces] = useState<Place[] | []>([])
  const [selected, setSelected] = useState(0)
  const [value, setValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const timeoutID = useRef<number | null>()
  useEffect(() => {
    if (!window.google) {
      const loader = new Loader({
        apiKey: 'AIzaSyBeMIrIdcecTGx6XPecpuBi-2jnNj-86mM',
        libraries: ['places'],
        version: 'weekly'
      })
      loader.importLibrary('places').then(() => {
        service.current = new google.maps.places.AutocompleteService()
      })
    }
  }, [])
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value
    if (timeoutID.current) clearTimeout(timeoutID.current)
    if (!isOpen) setIsOpen(true)
    if (text === '') {
      setPlaces([])
    } else {
      timeoutID.current = setTimeout(() => {
        timeoutID.current = null
        service.current?.getPlacePredictions({ input: text }, predictions => {
          console.log('request')
          const places = predictions!.map(prediction => {
            const { description, place_id } = prediction
            return { description, place_id }
          })
          setPlaces(places)
        })
      }, 250)
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