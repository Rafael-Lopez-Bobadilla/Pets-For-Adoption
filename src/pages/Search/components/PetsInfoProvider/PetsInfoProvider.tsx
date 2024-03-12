import { createContext, useState, useEffect, useContext } from "react"
import { PetType } from "../../utils/IPetType"
import { TokenContext } from "../../../../components/TokenProvider/TokenProvider"
import { getPetTypes } from "./utils/getPetTypes"
import { useSearchParams } from "react-router-dom"
import { getBreeds } from "./utils/getBreeds"
export const TypesContext = createContext<PetType[] | null>(null)
export const BreedsContext = createContext<string[] | null>(null)
export const SelectedContext = createContext<PetType | undefined>(undefined)
const PetsInfoProvider = ({ children }: { children: React.ReactNode }) => {
  const token = useContext(TokenContext)
  const [params] = useSearchParams()
  const [types, setTypes] = useState<PetType[] | null>(null)
  const [breeds, setBreeds] = useState<string[] | null>(null)
  const [selected, setSelected] = useState<PetType | undefined>()
  useEffect(() => {
    if (token) getPetTypes(token, setTypes)
  }, [token])
  useEffect(() => {
    if (token && types && params.has('type') && (!selected || params.get('type') !== selected.name)) {
      const nextSelected = types?.find((type: PetType) =>
        type.name.toLowerCase() === params.get('type')?.toLowerCase())
      setSelected(nextSelected)
      getBreeds(token, nextSelected!._links.breeds.href, setBreeds)
    }
  }, [params, types])
  return (
    <TypesContext.Provider value={types}>
      <SelectedContext.Provider value={selected}>
        <BreedsContext.Provider value={breeds}>
          {children}
        </BreedsContext.Provider>
      </SelectedContext.Provider>
    </TypesContext.Provider>
  )
}

export default PetsInfoProvider