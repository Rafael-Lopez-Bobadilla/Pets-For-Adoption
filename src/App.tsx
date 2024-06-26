import "./App.css";
import { lazy, Suspense } from "react";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Search from "./pages/Search/Search";
const Favorites = lazy(() => import("./pages/Favorites/Favorites"));
const Pet = lazy(() => import("./pages/Pet/Pet"));
import { TokenProvider } from "./context/TokenProvider/TokenProvider";
import { Navigate } from "react-router-dom";
import DialogProvider from "./context/DialogProvider/DialogProvider";
import UserProvider from "./context/UserProvider/UserProvider";
function App() {
  return (
    <>
      <Router>
        <UserProvider>
          <DialogProvider>
            <Header />
            <TokenProvider>
              <Suspense>
                <Routes>
                  <Route path="/search" element={<Search />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/pet/:id" element={<Pet />} />
                  <Route path="*" element={<Navigate to={"/search"} />} />
                </Routes>
              </Suspense>
            </TokenProvider>
          </DialogProvider>
        </UserProvider>
      </Router>
    </>
  );
}

export default App;
