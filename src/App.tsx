import './App.css'
import Header from './components/Header/Header'
import useToken from './useToken'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Search from './pages/Search/Search';
import Favorites from './pages/Favorites/Favorites';
import { createContext } from 'react';
import { Navigate } from 'react-router-dom';
export const TokenContext = createContext<string | null>(null)
function App() {
  const token = useToken()
  return (
    <BrowserRouter>
      <Header />
      {token && <TokenContext.Provider value={token}>
        <Routes>
          <Route path='/search' element={<Search />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='*' element={<Navigate to={'/search?type=Dog'} />} />
        </Routes>
      </TokenContext.Provider>}
    </BrowserRouter>
  )
}

export default App
