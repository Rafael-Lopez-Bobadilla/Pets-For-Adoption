import './App.css'
import Header from './components/Header/Header'
import SearchBar from './components/SearchBar/SearchBar'
import useToken from './useToken'
import { createContext } from 'react'
export const TokenContext = createContext<string | null>(null)
function App() {
  const token = useToken()
  return (
    <>
      <Header />
      <TokenContext.Provider value={token}>
        <SearchBar />
      </TokenContext.Provider>
    </>
  )
}

export default App
