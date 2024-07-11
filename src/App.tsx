import "./App.css";
import { lazy, Suspense } from "react";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Search from "./pages/Search/Search";
const Favorites = lazy(() => import("./pages/Favorites/Favorites"));
const Pet = lazy(() => import("./pages/Pet/Pet"));
import { Navigate } from "react-router-dom";
import DialogWrapper from "./components/Dialogs/DialogWrapper/DialogWrapper";
import AppProvider from "./context/AppProvider";

function App() {
  return (
    <>
      <Router>
        <AppProvider>
          <Header />
          <Suspense>
            <Routes>
              <Route path="/search" element={<Search />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/pet/:id" element={<Pet />} />
              <Route path="*" element={<Navigate to={"/search"} />} />
            </Routes>
          </Suspense>
          <DialogWrapper />
        </AppProvider>
      </Router>
    </>
  );
}

export default App;
