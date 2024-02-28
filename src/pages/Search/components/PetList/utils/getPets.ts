import { Pets } from "./IPets"
export const getPets = async (params: URLSearchParams,
  token: string,
  setSearchParams: any,
  setPets: React.Dispatch<React.SetStateAction<Pets>>) => {
  setPets(pets => { return { ...pets, loading: true } })
  const res = await fetch(`https://api.petfinder.com/v2/animals?${params}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  if (res.status === 400) {
    setSearchParams(new URLSearchParams({ type: 'Dog' }))
    return
  }
  const data = await res.json()
  setPets({ data: data, loading: false })
}