import './App.css'
import Header from './components/Header/Header'
import useToken from './useToken'
import { createContext } from 'react'
import { Outlet } from 'react-router-dom'
export const TokenContext = createContext<string | null>(null)
function App() {
  const token = useToken()
  return (
    <>
      <Header />
      <TokenContext.Provider value={token}>
        <Outlet />
      </TokenContext.Provider>
    </>
  )
}

export default App
