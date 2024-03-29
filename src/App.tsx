import './App.css'
import Header from './components/Header/Header';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Search from './pages/Search/Search';
import Favorites from './pages/Favorites/Favorites';
import Pet from './pages/Pet/Pet';
import { TokenProvider } from './components/TokenProvider/TokenProvider';
import { Navigate } from 'react-router-dom';
import AuthDialog from './components/AuthDialog/AuthDialog';
import DialogProvider from './components/DialogProvider/DialogProvider';
import UserProvider from './components/UserProvider/UserProvider';
function App() {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <DialogProvider>
            <Header />
            <AuthDialog />
            <TokenProvider>
              <Routes>
                <Route path='/search' element={<Search />} />
                <Route path='/favorites' element={<Favorites />} />
                <Route path='/pet/:id' element={<Pet />} />
                <Route path='*' element={<Navigate to={'/search'} />} />
              </Routes>
            </TokenProvider>
          </DialogProvider>
        </UserProvider>
      </BrowserRouter>
    </>
  )
}

export default App
