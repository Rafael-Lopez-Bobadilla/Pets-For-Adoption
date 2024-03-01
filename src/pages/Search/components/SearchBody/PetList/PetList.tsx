import { Pets } from "./utils/IPets"
import { useState, useContext, useEffect } from "react"
import { TokenContext } from "../../../../../App"
import { useSearchParams } from "react-router-dom"
import { getPets } from "./utils/getPets"
import { CircularProgress } from "@mui/material"
import s from './PetList.module.css'
import { Location } from "../../../utils/ILocation"
import { LocationContext } from "../../../Search"
import { validateParams } from "./utils/validateParams"
const PetList = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const token = useContext(TokenContext) as string
  const [pets, setPets] = useState<Pets>({ data: null, loading: false })
  const { location, setLocation } = useContext(LocationContext) as { location: Location | null, setLocation: React.Dispatch<React.SetStateAction<Location | null>> }
  useEffect(() => {
    const validParams = validateParams(setSearchParams, searchParams)
    if (!validParams) return
    getPets(validParams, token, setSearchParams, setPets, location, setLocation)
  }, [searchParams])
  return (
    <div className={s.petlist}>
      {(pets.data && !pets.loading) && pets.data.animals.map(pet => <div key={pet.id}>{pet.name}</div>)}
      {pets.loading && <div className={s.loading}><CircularProgress size={30} /></div>}
    </div>
  )
}

export default PetList