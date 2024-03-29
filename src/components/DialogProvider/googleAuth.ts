export const googleAuth = async (credential: google.accounts.id.CredentialResponse) => {
  const res = await fetch(`${import.meta.env.VITE_API}/api/v1/googleAuth`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${credential.credential}`
    },
    credentials: 'include'
  })
  const data = await res.json()
  return data
}