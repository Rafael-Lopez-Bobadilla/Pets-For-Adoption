import { createContext, useState, useEffect } from "react"
import { getToken } from "./utils/getToken"
export const TokenContext = createContext<string | null>(null)
export const TokenProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    getToken(setToken)
  }, [])
  return (
    <TokenContext.Provider value={token}>
      {children}
    </TokenContext.Provider>
  )
}