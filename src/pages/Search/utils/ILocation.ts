export interface Location {
  id: string,
  coords: string,
  address: string
}

export interface ILocationContext {
  location: Location | null,
  setLocation: React.Dispatch<React.SetStateAction<Location | null>>
}