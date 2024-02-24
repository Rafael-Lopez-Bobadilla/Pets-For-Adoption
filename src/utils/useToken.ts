import { useState, useEffect } from "react"
import { getToken } from './getToken'
const useToken = () => {
  const [token, setToken] = useState({
    value: <string | null>null,
    error: false
  })

  useEffect(() => {
    getToken(setToken)
  }, [])

  const reloadToken = () => {
    getToken(setToken)
  }
  return { token: token.value, error: token.error, reloadToken }
}

export default useToken