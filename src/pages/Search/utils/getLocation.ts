
export const getLocation = async (id: string) => {
  const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?place_id=${id}&key=AIzaSyBeMIrIdcecTGx6XPecpuBi-2jnNj-86mM`)
  if (res.status !== 200) return null
  const data = await res.json()
  return data
}