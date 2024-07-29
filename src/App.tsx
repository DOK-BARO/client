import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import "./App.css";
import "./styles/main.scss";
import Home from "./pages/Home";
import axios from "axios";
import RedirectedPage from "./pages/redirected.tsx";

function App() {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = import.meta.env.VITE_API_URL;
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      // children: [
      //   {
      //     path: "/oauth2/redirected/kakao/",
      //     element: <RedirectedPage />,
      //   },
      // ],
    },
    {
      path: "/oauth2/redirected/kakao/",
      element: <RedirectedPage />,
    },
    // {
    //   path: "/oauth2/redirected/kakao/",
    //   element: <Home />,
    // },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
