import { Place } from "./IPlace"
export const getPredictions = (timeoutID: React.MutableRefObject<number | null>,
  service: React.MutableRefObject<google.maps.places.AutocompleteService | undefined>,
  text: string,
  setPlaces: React.Dispatch<React.SetStateAction<[] | Place[]>>) => {
  timeoutID.current = setTimeout(() => {
    timeoutID.current = null
    service.current?.getPlacePredictions({ input: text }, predictions => {
      const places = predictions!.map(prediction => {
        const { description, place_id } = prediction
        return { description, place_id }
      })
      setPlaces(places)
    })
  }, 250)
} 