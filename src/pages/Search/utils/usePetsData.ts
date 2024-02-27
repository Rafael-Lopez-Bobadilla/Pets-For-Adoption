import { PetType } from "./IPetType"
import { useEffect, useContext, useState } from 'react'
import { TokenContext } from '../../../App'
import { getPetTypes } from "./getPetTypes"
import { useSearchParams } from "react-router-dom"
import { paramsSchema } from "./paramsSchema"
import { getPets } from "./getPets"
import { getBreeds } from "./getBreeds"
import { PetsData } from "./IPets"
const usePetsData = () => {
  const token = useContext(TokenContext) as string //routes are not rendered if token is null
  const [searchParams, setSearchParams] = useSearchParams()
  const [types, setTypes] = useState<PetType[] | null>(null)
  const [breeds, setBreeds] = useState<string[] | null>(null)
  const [pets, setPets] = useState<PetsData | null>(null)
  /*const onTypeChange = () => { //to use in select component

  }
  const onParamsChange = () => { //to use in select and places input components

  }*/
  const getData = async (params: URLSearchParams) => {
    const [types, petsRes] = await Promise.all([
      getPetTypes(token, setTypes),
      getPets(token, params)
    ])
    if (petsRes.status !== 400) {
      const pets = await petsRes.json()
      setPets(pets)
    }
    if (petsRes.status === 400) params = new URLSearchParams({ type: 'Dog' })
    const selected = types.find((type: PetType) =>
      type.name.toLowerCase() === params.get('type')!.toLocaleLowerCase())
    getBreeds(token, selected._links.breeds.href, setBreeds)
    if (petsRes.status === 400) {
      setSearchParams(params)
      const petsRes = await getPets(token, params)
      const pets = await petsRes.json()
      setPets(pets)
    }
  }

  useEffect(() => {
    let params = new URLSearchParams(searchParams)
    const validParams = paramsSchema.safeParse(Object.fromEntries(params))
    if (validParams.success) params = new URLSearchParams(validParams.data)
    if (!validParams.success) params = new URLSearchParams({ type: 'Dog' })
    if (searchParams.size !== params.size) setSearchParams(params)
    getData(params)
  }, [])
  return { types, breeds, pets }
}

export default usePetsData