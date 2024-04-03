import { createContext, useState, useEffect, useContext } from "react"
import { PetType } from "../../utils/IPetType"
import { TokenContext } from "../../../../components/TokenProvider/TokenProvider"
import { getPetTypes } from "./utils/getPetTypes"
import { useSearchParams } from "react-router-dom"
import { getBreeds } from "./utils/getBreeds"
import { useQuery } from '@tanstack/react-query'
export const TypesContext = createContext<PetType[] | null>(null)
export const BreedsContext = createContext<string[] | null>(null)
export const SelectedContext = createContext<PetType | undefined>(undefined)
const PetsInfoProvider = ({ children }: { children: React.ReactNode }) => {
  const token = useContext(TokenContext)
  const [params] = useSearchParams()
  const [selected, setSelected] = useState<PetType | undefined>()
  const { data: types } = useQuery({
    queryKey: ['types'],
    queryFn: () => getPetTypes(token),
    enabled: token ? true : false
  })
  useEffect(() => {
    if (types && params.has('type') && (!selected || params.get('type') !== selected.name)) {
      const nextSelected = types?.find((type: PetType) =>
        type.name.toLowerCase() === params.get('type')?.toLowerCase())
      setSelected(nextSelected)
    }
  }, [params, types])
  const { data: breeds } = useQuery({
    queryKey: [selected?.name],
    queryFn: async () => {
      const breeds = await getBreeds(token, selected?._links.breeds.href)
      return breeds
    },
    enabled: (!selected || params.get('type') !== selected.name) ? false : true
  })
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