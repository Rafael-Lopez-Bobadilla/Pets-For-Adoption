import { Pets } from "./utils/IPets"
import { useState, useContext, useEffect } from "react"
import { TokenContext } from "../../../../App"
import { useSearchParams } from "react-router-dom"
import { paramsSchema } from "./utils/paramsSchema"
import { getPets } from "./utils/getPets"
import { CircularProgress } from "@mui/material"
import s from './PetList.module.css'
import { Location } from "../../utils/ILocation"
import { LocationContext } from "../../Search"
const PetList = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const token = useContext(TokenContext) as string
  const [pets, setPets] = useState<Pets>({ data: null, loading: false })
  const { location, setLocation } = useContext(LocationContext) as { location: Location | null, setLocation: React.Dispatch<React.SetStateAction<Location | null>> }
  useEffect(() => {
    const validParams = paramsSchema.safeParse(Object.fromEntries(searchParams))
    if (!validParams.success) {
      setSearchParams(new URLSearchParams({ type: 'Dog' }))
      return
    }
    if (validParams.success) {
      const params = new URLSearchParams(validParams.data)
      if (params.size !== searchParams.size) {
        setSearchParams(params)
        return
      }
      getPets(params, token, setSearchParams, setPets, location, setLocation)
    }
  }, [searchParams])
  return (
    <div className={s.petlist}>
      {(pets.data && !pets.loading) && pets.data.animals.map(pet => <div key={pet.id}>{pet.name}</div>)}
      {pets.loading && <div className={s.loading}><CircularProgress size={30} /></div>}
    </div>
  )
}

export default PetList