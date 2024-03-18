export const googleAuth = async (credential: google.accounts.id.CredentialResponse) => {
  const res = await fetch('http://localhost:5002/api/v1/googleAuth', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${credential.credential}`
    },
    credentials: 'include'
  })
  const data = await res.json()
  console.log(data)
}