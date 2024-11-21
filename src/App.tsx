import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./styles/main.scss";
import Index from "./pages/Home/index.tsx";
import axios from "axios";

import AuthRedirectedPage from "./pages/Redirect/authRedirectedPage.tsx";
import ComponentTest from "./pages/ComponentTest/index.tsx";
import BookDetailSection from "./pages/BookDetail/";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CreateQuiz from "./pages/CreateQuiz/index.tsx";
import Register from "./pages/Register/index.tsx";

import RegisterStep from "./pages/Register/registerStep.tsx";
//import BaseLayout from "@/components/layout/baseLayout/baseLayout";
import BaseLayout from "./components/layout/baseLayout/baseLayout";
import RegisterComplete from "./pages/Register/composite/registerComplete/RegisterComplete.tsx";
import BookList from "./pages/Home/components/composite/bookList/bookList.tsx";
import BookListLayout from "./components/layout/bookListLayout/bookListLayout.tsx";

function App() {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = import.meta.env.VITE_API_URL;
  const queryClient = new QueryClient();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <BaseLayout />,
      children: [
        {
          path: "/",
          element: <BookListLayout />, // 책 목록,
          children: [
            {
              path: "/",
              element: <Index />,
            },
            {
              path: "/book-list/:categoryId",
              element: <BookList />,
            },
            {
              path: "/book-list/:categoryId/:subCategoryId",
              element: <BookList />,
            },
          ],
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
          path: "/register/:method",
          element: <Register />,
          children: [
            {
              path: ":step",
              element: <RegisterStep />,
            }, // {
            //   index: true,
            //   element: <Navigate to="1" />,
            // },
          ],
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
  ]);
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
