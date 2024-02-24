import './App.css'
import Header from './components/Header/Header'
import useToken from './utils/useToken'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Search from './pages/Search/Search';
import Favorites from './pages/Favorites/Favorites';
import { createContext } from 'react';
import { Navigate } from 'react-router-dom';
import TokenError from './components/TokenError/TokenError';
export const TokenContext = createContext<string | null>(null)
function App() {
  const { token, error, reloadToken } = useToken()
  return (
    <>
      {token &&
        <BrowserRouter>
          <Header />
          <TokenContext.Provider value={token}>
            <Routes>
              <Route path='/search' element={<Search />} />
              <Route path='/favorites' element={<Favorites />} />
              <Route path='*' element={<Navigate to={'/search?type=Dog'} />} />
            </Routes>
          </TokenContext.Provider>
        </BrowserRouter>}
      {error && <TokenError reloadToken={reloadToken} />}
    </>
  )
}

export default App
