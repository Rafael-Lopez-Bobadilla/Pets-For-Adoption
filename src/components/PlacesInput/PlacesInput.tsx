import s from './PlacesInput.module.css'
import { useEffect, useRef } from 'react'
import { Loader } from "@googlemaps/js-api-loader"
const PlacesInput = () => {
  const service = useRef<google.maps.places.AutocompleteService | undefined>()
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
    service.current?.getPlacePredictions({ input: text }, predictions => {
      console.log(predictions)
    })
  }
  return (
    <div className={s.places}>
      <input onChange={handleInput} />
      <div className={s.options}>

      </div>
    </div>
  )
}

export default PlacesInput