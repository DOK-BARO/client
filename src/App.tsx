import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./styles/main.scss";
import Index from "./pages/Home/index.tsx";
import axios from "axios";
import Layout from "./components/layout/layout";
import AuthRedirectedPage from "./pages/Redirect/authRedirectedPage.tsx";
import ComponentTest from "./pages/ComponentTest/index.tsx";
import BookDetailSection from "./pages/BookDetail/";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CreateQuiz from "./pages/CreateQuiz/index.tsx";
import EmailVerification from "./pages/EmailVerification/index.tsx";
import Register from "./pages/Register/index.tsx";
import RegisterComplete from "./pages/Register/composite/RegisterComplete.tsx";

function App() {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = import.meta.env.VITE_API_URL;
  const queryClient = new QueryClient();

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
          path: "/book-detail/:id",
          element: <BookDetailSection />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/register/complete",
          element: <RegisterComplete />,
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
    {
      // 회원 가입 이메일
      path: "/email-verification",
      element: <EmailVerification />,
    },
  ]);
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
