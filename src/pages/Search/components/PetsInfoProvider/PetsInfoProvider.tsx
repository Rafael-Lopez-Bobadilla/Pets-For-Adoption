import { createContext, useState, useEffect, useContext } from "react"
import { PetType } from "./utils/IPetType"
import { TokenContext } from "../../../../components/TokenProvider/TokenProvider"
import { getPetTypes } from "./utils/getPetTypes"
import { Breeds } from "./utils/IBreeds"
import { useSearchParams } from "react-router-dom"
import { getBreeds } from "./utils/getBreeds"
interface FiltersInfo {
  selected: PetType | undefined,
  breeds: Breeds
}
const initialBreeds = { data: null, loading: false }
export const TypesContext = createContext<PetType[] | null>(null)
export const FiltersContext = createContext<FiltersInfo>({ selected: undefined, breeds: initialBreeds })
const PetsInfoProvider = ({ children }: { children: React.ReactNode }) => {
  const token = useContext(TokenContext)
  const [params] = useSearchParams()
  const [types, setTypes] = useState<PetType[] | null>(null)
  const [breeds, setBreeds] = useState<Breeds>(initialBreeds)
  const selected = types?.find((type: PetType) =>
    type.name.toLowerCase() === params.get('type')?.toLocaleLowerCase())
  useEffect(() => {
    if (token) getPetTypes(token, setTypes)
  }, [token])
  useEffect(() => {
    if (selected && token) {
      getBreeds(token, selected._links.breeds.href, setBreeds)
    }
  }, [selected, token])
  return (
    <TypesContext.Provider value={types}>
      <FiltersContext.Provider value={{ selected, breeds }}>
        {children}
      </FiltersContext.Provider>
    </TypesContext.Provider>
  )
}

export default PetsInfoProvider