import './App.css'
import Header from './components/Header/Header'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Search from './pages/Search/Search';
import Favorites from './pages/Favorites/Favorites';
import { createContext, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from './utils/getToken';
export const TokenContext = createContext<string | null>(null)
function App() {
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    getToken(setToken)
  }, [])
  return (
    <>
      <BrowserRouter>
        <Header />
        <TokenContext.Provider value={token}>
          <Routes>
            <Route path='/search' element={<Search />} />
            <Route path='/favorites' element={<Favorites />} />
            <Route path='*' element={<Navigate to={'/search'} />} />
          </Routes>
        </TokenContext.Provider>
      </BrowserRouter>
    </>
  )
}

export default App
