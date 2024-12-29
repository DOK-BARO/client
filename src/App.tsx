import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./styles/main.scss";
import ComponentTest from "./pages/ComponentTest/index.tsx";
import BookDetailSection from "./pages/BookDetail/";
import { QueryClientProvider } from "@tanstack/react-query";
import CreateQuiz from "./pages/CreateQuiz/index.tsx";
import Register from "./pages/Register/index.tsx";
import RegisterComplete from "./pages/Register/composite/RegisterComplete/RegisterComplete.tsx";
import BookList from "./pages/Home/components/composite/BookList/bookList.tsx";
import BookListLayout from "./pages/BookList/layout/BookListLayout/bookListLayout.tsx";
import MyPage from "./pages/MyPage/index.tsx";
import SolvingQuizPage from "./pages/SolveQuiz/index.tsx";
import QuizDetail from "./pages/QuizDetail/index.tsx";
import FindPassword from "./pages/FindPassword/index.tsx";
import NotFound from "./pages/NotFound/index.tsx";
import { queryClient } from "./services/server/queryClient.ts";
import CreateQuizComplete from "./pages/CreateQuiz/composite/CreateQuizComplete/createQuizComplete.tsx";
import QuizResult from "./pages/QuizResult/index.tsx";
import QuizReview from "./pages/QuizReview/index.tsx";
import MyMadeQuiz from "./pages/MyPage/composite/MyMadeQuiz/myMadeQuiz.tsx";
import SolvedQuiz from "./pages/MyPage/composite/SolvedQuiz/solvedQuiz.tsx";
import EditMyInfo from "./pages/MyPage/composite/accountSetting/editMyInfo.tsx";
import MyStudyGroups from "./pages/MyPage/composite/MyStudyGroups/myStudyGroups.tsx";
import StudyGroup from "./pages/MyPage/composite/StudyGroup/studyGroup.tsx";
import StudyGroupSetting from "./pages/MyPage/composite/StudyGroupSetting/studyGroupSetting.tsx";
import BaseLayout from "./components/layout/BaseLayout/BaseLayout.tsx";
import NoHeaderLayout from "./components/layout/NoHeaderLayout/NoHeaderLayout.tsx";
import ToastPortal from "./components/layout/ToastPortal/ToastPortal.tsx";

function App() {
  // TODO: 분리하기
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
          path: "/quiz/:id",
          element: <QuizDetail />,
        },
        {
          path: "/create-quiz",
          element: <CreateQuiz />,
        },

        {
          path: "/create-quiz/complete",
          element: <CreateQuizComplete />,
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
          children: [
            {
              path: "made-quiz",
              element: <MyMadeQuiz />,
            },
            {
              path: "solved-quiz",
              element: <SolvedQuiz />,
            },
            // TODO: study-group 으로 변경하기
            {
              path: "study-groups",
              element: <MyStudyGroups />,
            },
            {
              path: "study-groups/:studyGroupId",
              element: <StudyGroup />,
            },
            {
              path: "study-groups/:studyGroupId/setting",
              element: <StudyGroupSetting />,
            },
            {
              path: "settings",
              element: <EditMyInfo />,
              children: [
                {
                  index: true,
                  element: <Navigate to="edit-profile" replace />,
                },
                {
                  path: "edit-profile",
                  element: <EditMyInfo />,
                },
                {
                  path: "change-password",
                  element: <></>,
                },
                {
                  path: "delete-account",
                  element: <></>,
                },
              ],
            },
          ],
        },

        {
          // 공용 컴포넌트 미리보기를 위한 페이지
          path: "/component-test",
          element: <ComponentTest />,
        },
      ],
    },
    // {
    //   path: "/oauth2/redirected/:provider",
    //   element: <AuthRedirectedPage />,
    // },
    {
      path: "/quiz",
      element: <NoHeaderLayout />,
      children: [
        {
          path: "/quiz/play/:quizId/:solvingQuizId",
          element: <SolvingQuizPage />,
        },
        {
          path: "/quiz/result/:quizId/:solvingQuizId/:quizTitle",
          element: <QuizResult />,
        },
        {
          path: "/quiz/review/:quizId/:solvingQuizId/:quizTitle",
          element: <QuizReview />,
        },
      ],
    },
    {
      path: "*",
      element: <NoHeaderLayout />,
      children: [
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastPortal />
    </QueryClientProvider>
  );
}

export default App;
