import { useState, createContext } from "react"
import { ILocationContext, Location } from "../../utils/ILocation"
export const LocationContext = createContext<ILocationContext>({ location: null, setLocation: () => { } })
const LocationProvider = ({ children }: { children: React.ReactNode }) => {
  const [location, setLocation] = useState<Location | null>(null)
  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  )
}

export default LocationProvider