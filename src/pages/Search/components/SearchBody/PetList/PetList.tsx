import { useContext, useEffect } from "react"
import { TokenContext } from "../../../../../components/TokenProvider/TokenProvider"
import { useSearchParams } from "react-router-dom"
import { getPets } from "./utils/getPets"
import { CircularProgress } from "@mui/material"
import s from './PetList.module.css'
import { LocationContext } from "../../LocationProvider/LocationProvider"
import PetCard from './components/PetCard/PetCard'
import { memo } from "react"
import NoResults from "./components/NoResults/NoResults"
import { useQuery } from "@tanstack/react-query"
import { syncLocation, isLocationSync } from "./utils/syncLocation"
const PetList = memo(({ setPageCount }: { setPageCount: React.Dispatch<React.SetStateAction<number>> }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const token = useContext(TokenContext)
  const { location, setLocation } = useContext(LocationContext)
  const { data, isPending } = useQuery({
    queryKey: [`${searchParams.toString()}`],
    queryFn: () => getPets(token, setSearchParams, searchParams,
      location, setPageCount),
    enabled: isLocationSync(searchParams, location)
  })
  useEffect(() => {
    syncLocation(searchParams, setSearchParams, location, setLocation)
  }, [searchParams])
  return (
    <>
      <div className={s.list}>
        {(data && !isPending) && data.map(pet =>
          <div key={pet.id} className={s.card}>
            <PetCard pet={pet} />
          </div>
        )}
      </div>
      {isPending && <div className={s.loading}><CircularProgress size={30} /></div>}
      {(data?.length === 0 && !isPending) && <NoResults />}
    </>
  )
})

export default PetList