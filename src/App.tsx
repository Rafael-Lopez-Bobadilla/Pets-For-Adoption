import './App.css'
import Header from './components/Header/Header';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Search from './pages/Search/Search';
import Favorites from './pages/Favorites/Favorites';
import { TokenProvider } from './components/TokenProvider/TokenProvider';
import { Navigate } from 'react-router-dom';
import AuthDialog from './components/AuthDialog/AuthDialog';
import DialogProvider from './components/DialogProvider/DialogProvider';
function App() {
  return (
    <>
      <BrowserRouter>
        <DialogProvider>
          <Header />
          <AuthDialog />
          <TokenProvider>
            <Routes>
              <Route path='/search' element={<Search />} />
              <Route path='/favorites' element={<Favorites />} />
              <Route path='*' element={<Navigate to={'/search'} />} />
            </Routes>
          </TokenProvider>
        </DialogProvider>
      </BrowserRouter>
    </>
  )
}

export default App
