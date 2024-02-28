import { PetType } from "./IPetType"
import { Breeds } from "./IBreeds"
import { useEffect, useContext, useState, useRef } from 'react'
import { TokenContext } from '../../../App'
import { getPetTypes } from "./getPetTypes"
import { useSearchParams } from "react-router-dom"
import { paramsSchema } from "./paramsSchema"
import { getPets } from "./getPets"
import { getBreeds } from "./getBreeds"
import { Pets } from "./IPets"
const usePetsData = () => {
  const token = useContext(TokenContext) as string //routes are not rendered if token is null
  const [searchParams, setSearchParams] = useSearchParams()
  const [types, setTypes] = useState<PetType[] | null>(null)
  const [breeds, setBreeds] = useState<Breeds>({ data: null, loading: false })
  const [pets, setPets] = useState<Pets>({ data: null, loading: false })
  const firstRender = useRef(true)
  const getData = async (params: URLSearchParams) => {
    setPets({ ...pets, loading: true })
    const [types, petsRes] = await Promise.all([
      getPetTypes(token, setTypes),
      getPets(token, params)
    ])
    if (petsRes.status !== 400) {
      const pets = await petsRes.json()
      setPets({ data: pets, loading: false })
      if (searchParams.size !== params.size) setSearchParams(params)
    }
    if (petsRes.status === 400) params = new URLSearchParams({ type: 'Dog' })
    const selected = types.find((type: PetType) =>
      type.name.toLowerCase() === params.get('type')!.toLocaleLowerCase())
    getBreeds(token, selected._links.breeds.href, setBreeds)
    if (petsRes.status === 400) {
      setSearchParams(params)
    }
  }

  const onParamsChange = async () => {
    setPets({ ...pets, loading: true })
    const petsRes = await getPets(token, searchParams)
    const newPets = await petsRes.json()
    setPets({ data: newPets, loading: false })
  }
  useEffect(() => {
    let params = new URLSearchParams(searchParams)
    if (firstRender.current) {
      const validParams = paramsSchema.safeParse(Object.fromEntries(params))
      if (validParams.success) params = new URLSearchParams(validParams.data)
      if (!validParams.success) params = new URLSearchParams({ type: 'Dog' })
      getData(params)
      firstRender.current = false
      return
    }
    onParamsChange()
  }, [searchParams])
  return { types, breeds, pets }
}

export default usePetsData