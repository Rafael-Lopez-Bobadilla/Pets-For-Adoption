export const getPets = async (token: string, params: URLSearchParams) => {
  const res = await fetch(`https://api.petfinder.com/v2/animals?${params}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  return res
}