export const getPetTypes = async (token: string | null) => {
  const res = await fetch('https://api.petfinder.com/v2/types', {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  const data = await res.json()
  return data.types
}