import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./styles/main.scss";

import AuthRedirectedPage from "./pages/Redirect/authRedirectedPage.tsx";
import ComponentTest from "./pages/ComponentTest/index.tsx";
import BookDetailSection from "./pages/BookDetail/";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CreateQuiz from "./pages/CreateQuiz/index.tsx";
import Register from "./pages/Register/index.tsx";

//import BaseLayout from "@/components/layout/baseLayout/baseLayout";
import BaseLayout from "./components/layout/baseLayout/baseLayout";
import RegisterComplete from "./pages/Register/composite/registerComplete/RegisterComplete.tsx";
import BookList from "./pages/Home/components/composite/bookList/bookList.tsx";
import BookListLayout from "./components/layout/bookListLayout/bookListLayout.tsx";
import MyPage from "./pages/MyPage/index.tsx";
// import FindPasswordLayout from "./pages/FindPassword/layout/findPasswordLayout.tsx";
import FindPassword from "./pages/FindPassword/index.tsx";

function App() {
  const queryClient = new QueryClient();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <BaseLayout />,
      children: [
        {
          path: "/",
          element: <BookListLayout />,
          children: [
            {
              path: "/",
              element: <Navigate to="/books" replace />, // "/"로 들어왔을 때 "/books"로 리다이렉트
            },
            {
              path: "/books",
              element: <BookList />,
            },
          ],
        },
        {
          path: "/create-quiz",
          element: <CreateQuiz />,
        },
        {
          path: "/book/:id",
          element: <BookDetailSection />,
        },
        {
          path: "/find-password",
          element: <FindPassword />,
        },

        {
          path: "/register/:method",
          element: <Register />,
        },

        {
          path: "/register/complete",
          element: <RegisterComplete />,
        },
        {
          path: "/my",
          element: <MyPage />,
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
