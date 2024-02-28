import { Pets } from "./utils/IPets"
import { useState, useContext, useEffect } from "react"
import { TokenContext } from "../../../../App"
import { useSearchParams } from "react-router-dom"
import { paramsSchema } from "./utils/paramsSchema"
import { getPets } from "./utils/getPets"
const PetList = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const token = useContext(TokenContext) as string
  const [pets, setPets] = useState<Pets>({ data: null, loading: false })
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
      getPets(params, token, setSearchParams, setPets)
    }
  }, [searchParams])
  return (
    <div>
      {pets.data && pets.data.animals.map(pet => <div key={pet.id}>{pet.name}</div>)}
    </div>
  )
}

export default PetList