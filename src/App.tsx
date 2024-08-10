import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./styles/main.scss";
import Index from "./pages/Home/index.tsx";
import axios from "axios";
import AuthRedirectedPage from "./pages/Redirect/authRedirectedPage.tsx";

function App() {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = import.meta.env.VITE_API_URL;
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Index />,
    },
    {
      path: "/oauth2/redirected/:provider",
      element: <AuthRedirectedPage />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
