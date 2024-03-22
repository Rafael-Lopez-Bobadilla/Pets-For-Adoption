import { apiUrl } from "../../../../../../../apiUrl"
export const updateFavorites = async (id: number,) => {
  const res = await fetch(`${apiUrl}/api/v1/updateFavorites`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ favorite: id.toString() }),
    credentials: 'include'
  })
  const data = await res.json()
  return data.user
}