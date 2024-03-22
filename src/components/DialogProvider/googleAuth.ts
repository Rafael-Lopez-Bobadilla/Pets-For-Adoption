import { apiUrl } from "../../apiUrl"
export const googleAuth = async (credential: google.accounts.id.CredentialResponse) => {
  const res = await fetch(`${apiUrl}/api/v1/googleAuth`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${credential.credential}`
    },
    credentials: 'include'
  })
  const data = await res.json()
  return data
}