import { createContext, useState, useEffect, useContext } from "react"
import { PetType } from "../../utils/IPetType"
import { TokenContext } from "../../../../components/TokenProvider/TokenProvider"
import { getPetTypes } from "./utils/getPetTypes"
import { useSearchParams } from "react-router-dom"
import { getBreeds } from "./utils/getBreeds"
export const TypesContext = createContext<PetType[] | null>(null)
export const BreedsContext = createContext<string[] | null>(null)
const PetsInfoProvider = ({ children }: { children: React.ReactNode }) => {
  const token = useContext(TokenContext)
  const [params] = useSearchParams()
  const [types, setTypes] = useState<PetType[] | null>(null)
  const [breeds, setBreeds] = useState<string[] | null>(null)
  const getPetsInfo = async (token: string) => {
    const types = await getPetTypes(token, setTypes)
    const selected = types?.find((type: PetType) =>
      type.name.toLowerCase() === params.get('type')?.toLowerCase())
    getBreeds(token, selected._links.breeds.href, setBreeds)
  }
  useEffect(() => {
    if (token) getPetsInfo(token)
  }, [token])
  return (
    <TypesContext.Provider value={types}>
      <BreedsContext.Provider value={breeds}>
        {children}
      </BreedsContext.Provider>
    </TypesContext.Provider>
  )
}

export default PetsInfoProvider