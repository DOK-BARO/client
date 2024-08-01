import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./styles/main.scss";
import Home from "./pages/Home";
import axios from "axios";
import RedirectedPage from "./pages/Redirect/redirectedPage.tsx";

function App() {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = import.meta.env.VITE_API_URL;
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/oauth2/redirected/kakao/",
      element: <RedirectedPage />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
