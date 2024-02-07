import { createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { Route } from "react-router-dom";
import App from "./App";
import Search from "./pages/Search/Search";
import Favorites from "./pages/Favorites/Favorites";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<Search />} />
      <Route path='/favorites' element={<Favorites />} />
    </Route>
  )
)

export default router