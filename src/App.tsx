import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./styles/main.scss";
import Home from "./pages/Home";
import axios from "axios";
import AuthRedirectedPage from "./pages/Redirect/authRedirectedPage.tsx";

function App() {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = import.meta.env.VITE_API_URL;
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/oauth2/redirected/:provider",
      element: <AuthRedirectedPage />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
