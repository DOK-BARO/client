import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import "./App.css";
import "./styles/main.scss";
import Home from "./pages/home";
import axios from "axios";
import CreateQuiz from "./pages/createQuiz";
import Layout from "./components/layout/layout";

function App() {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = import.meta.env.VITE_API_URL;
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/oauth2/redirected/kakao",
          element: <Home />,
        },
        {
          path: "/create-quiz",
          element: <CreateQuiz />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
