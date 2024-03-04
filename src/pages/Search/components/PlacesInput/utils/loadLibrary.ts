import { Loader } from "@googlemaps/js-api-loader"
export const loadLibrary = (service: React.MutableRefObject<google.maps.places.AutocompleteService | undefined>) => {
  if (!window.google) {
    const loader = new Loader({
      apiKey: 'AIzaSyBeMIrIdcecTGx6XPecpuBi-2jnNj-86mM',
      libraries: ['places'],
      version: 'weekly'
    })
    loader.importLibrary('places').then(() => {
      service.current = new google.maps.places.AutocompleteService()
    })
  } else {
    service.current = new google.maps.places.AutocompleteService()
  }
}