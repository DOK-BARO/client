import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./styles/main.scss";
import Index from "./pages/Home/index.tsx";
import axios from "axios";
// import Layout from "./components/layout/layout";
import Layout from "./components/layout/layout";
import AuthRedirectedPage from "./pages/Redirect/authRedirectedPage.tsx";
import CreateQuiz from "./pages/CreateQuiz/index.tsx";
import ComponentTest from "./pages/ComponentTest/index.tsx";

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
          element: <Index />,
        },
        {
          path: "/create-quiz",
          element: <CreateQuiz />,
        },
        {
          // 공용 컴포넌트 미리보기를 위한 페이지
          path: "/component-test",
          element: <ComponentTest />,
        },
      ],
    },
    {
      path: "/oauth2/redirected/:provider",
      element: <AuthRedirectedPage />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
