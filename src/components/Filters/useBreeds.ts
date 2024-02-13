import { useContext } from "react"
import { TokenContext } from "../../App"
import { useEffect, useState } from "react"

type breedType = {
  name: string,
  _links: {
    type: {
      href: string
    }
  }
}
const useBreeds = (breedsLink: string, params: URLSearchParams) => {
  const token = useContext(TokenContext)
  const [breeds, setBreeds] = useState<string[]>()
  const [isLoading, setIsLoading] = useState(true)
  const getBreeds = async () => {
    const res = await fetch(`https://api.petfinder.com${breedsLink}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    const data = await res.json()
    const breeds = data.breeds.map((breed: breedType) => breed.name)
    setBreeds(breeds)
    setIsLoading(false)
  }
  useEffect(() => {
    setIsLoading(true)
    getBreeds()
  }, [params])
  return { breeds, isLoading }
}

export default useBreeds