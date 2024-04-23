import {createRoutesFromElements, Route,createBrowserRouter} from "react-router-dom";
import App from "../App.tsx";

const MainRoute = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={<App/>}
      >

      </Route>
    )
  )

  return {router}
}

export default MainRoute