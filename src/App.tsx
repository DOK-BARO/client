import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import "./App.css";
import "./styles/main.scss";
import Home from "./pages/Home";
import axios from "axios";

function App() {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = import.meta.env.VITE_API_URL;
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
