import { Pets } from "./utils/IPets"
import { useState, useContext, useEffect } from "react"
import { TokenContext } from "../../../../../components/TokenProvider/TokenProvider"
import { useSearchParams } from "react-router-dom"
import { getPets } from "./utils/getPets"
import { CircularProgress } from "@mui/material"
import s from './PetList.module.css'
import { LocationContext } from "../../LocationProvider/LocationProvider"
import { validateParams } from "./utils/validateParams"
import PetCard from './components/PetCard/PetCard'
import { memo } from "react"
import NoResults from "./components/NoResults/NoResults"
const PetList = memo(({ setPageCount }: { setPageCount: React.Dispatch<React.SetStateAction<number>> }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const token = useContext(TokenContext)
  const [pets, setPets] = useState<Pets>({ data: null, loading: false })
  const { location, setLocation } = useContext(LocationContext)
  useEffect(() => {
    if (!token) return
    const validParams = validateParams(setSearchParams, searchParams)
    if (!validParams) return
    getPets(validParams, token, setSearchParams,
      setPets, location, setLocation, setPageCount)
  }, [searchParams, token])
  return (
    <>
      <div className={s.list}>
        {(pets.data && !pets.loading) && pets.data.animals.map(pet =>
          <div key={pet.id} className={s.card}>
            <PetCard pet={pet} />
          </div>
        )}
      </div>
      {pets.loading && <div className={s.loading}><CircularProgress size={30} /></div>}
      {(pets.data?.animals.length === 0 && !pets.loading) && <NoResults />}
    </>
  )
})

export default PetList