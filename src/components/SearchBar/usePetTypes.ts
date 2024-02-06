import { PetType } from "./IPetType"
import { useEffect, useContext, useState } from 'react'
import { TokenContext } from '../../App'

const usePetTypes = () => {
  const token = useContext(TokenContext)
  const [types, setTypes] = useState<string[] | null>(null)
  const getPetTypes = async () => {
    const res = await fetch('https://api.petfinder.com/v2/types', {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    const data = await res.json()
    const names = data.types.map((type: PetType) => type.name)
    setTypes(names)
  }
  useEffect(() => {
    if (token !== null) {
      getPetTypes()
    }
  }, [token])
  return types
}

export default usePetTypes