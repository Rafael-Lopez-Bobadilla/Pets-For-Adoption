import './App.css'
import Header from './components/Header/Header'
import useToken from './useToken'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Search from './pages/Search/Search';
import Favorites from './pages/Favorites/Favorites';
import { createContext } from 'react';
export const TokenContext = createContext<string | null>(null)
function App() {
  const token = useToken()
  return (
    <BrowserRouter>
      <Header />
      <TokenContext.Provider value={token}>
        <Routes>
          <Route path='/' element={<Search />} />
          <Route path='/favorites' element={<Favorites />} />
        </Routes>
      </TokenContext.Provider>
    </BrowserRouter>
  )
}

export default App
