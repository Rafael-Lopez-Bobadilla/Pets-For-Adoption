import { PetType } from "./IPetType"
import { useEffect, useContext, useState } from 'react'
import { TokenContext } from '../../App'

const usePetTypes = () => {
  const token = useContext(TokenContext)
  const [types, setTypes] = useState<PetType[] | null>(null)
  const [names, setNames] = useState<string[] | null>(null)
  const getPetTypes = async () => {
    const res = await fetch('https://api.petfinder.com/v2/types', {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    const data = await res.json()
    const petNames = data.types.map((type: PetType) => type.name)
    setNames(petNames)
    setTypes(data.types)
    console.log(data.types)
  }
  useEffect(() => {
    getPetTypes()
  }, [])
  return { types, names }
}

export default usePetTypes