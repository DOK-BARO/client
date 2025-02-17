import { createBrowserRouter, Navigate } from "react-router-dom";
import ROUTES from "@/data/routes";
import BaseLayout from "@/components/layout/BaseLayout/BaseLayout.tsx";
import BookListLayout from "@/pages/BookList/layout/BookListLayout/BookListLayout";
import BookList from "@/pages/Home/components/composite/BookList/BookList";
import QuizDetail from "@/pages/QuizDetail";
import CreateQuiz from "@/pages/CreateQuiz";
import CreateQuizComplete from "@/pages/CreateQuiz/composite/CreateQuizComplete/CreateQuizComplete";
import BookDetailSection from "@/pages/BookDetail";
import FindPassword from "@/pages/FindPassword";
import Register from "@/pages/Register";
import RegisterComplete from "@/pages/Register/composite/RegisterComplete/RegisterComplete";
import MyPage from "@/pages/MyPage";
import MyMadeQuiz from "@/pages/MyPage/composite/MyMadeQuiz/MyMadeQuiz";
import SolvedQuiz from "@/pages/MyPage/composite/SolvedQuiz/SolvedQuiz";
import MyStudyGroups from "@/pages/MyPage/composite/MyStudyGroups/MyStudyGroups";
import StudyGroup from "@/pages/MyPage/composite/StudyGroup/StudyGroup";
import StudyGroupSetting from "@/pages/MyPage/composite/StudyGroupSetting/StudyGroupSetting";
import EditMyInfo from "@/pages/MyPage/composite/accountSetting/EditMyInfo/EditMyInfo";
import ChangePassword from "@/pages/MyPage/composite/accountSetting/ChangePassword/ChangePassword";
import ComponentTest from "@/pages/ComponentTest";
import SolvingQuiz from "@/pages/SolveQuiz";
import QuizResult from "@/pages/QuizResult";
import QuizReview from "@/pages/QuizReview";
import DeleteAccount from "@/pages/MyPage/composite/accountSetting/DeleteAccount/DeleteAccount.tsx";
import NotFound from "@/pages/NotFound";
import MyStudyGroupsCreate from "@/pages/MyPage/composite/MyStudyGroupsCreate/MyStudyGroupsCreate";
import MyStudyGroupsJoin from "@/pages/MyPage/composite/MyStudyGroupsJoin/MyStudyGroupsJoin";
import Landing from "@/pages/Landing";
import AuthenticatedRoute from "@/components/layout/AuthenticatedRoute/AuthenticatedRoute";

const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: <BaseLayout />,
    children: [
      {
        path: ROUTES.ROOT,
        element: <Landing />,
      },

      {
        path: ROUTES.BOOK_LIST,
        element: <BookListLayout />,
        children: [
          {
            path: ROUTES.BOOK_LIST,
            element: <BookList />,
          },
        ],
      },
      {
        path: ROUTES.BOOK_DETAIL_SECTION(),
        element: <BookDetailSection />,
      },
      {
        element: <AuthenticatedRoute />,
        children: [
          {
            path: ROUTES.QUIZ_DETAIL(),
            element: <QuizDetail />,
          },
        ],
      },
      {
        path: ROUTES.QUIZ_DETAIL(),
        element: <QuizDetail />,
      },
      {
        path: ROUTES.CREATE_QUIZ(),
        element: <CreateQuiz />,
      },

      {
        path: ROUTES.CREATE_QUIZ_COMPLETE,
        element: <CreateQuizComplete />,
      },

      {
        path: ROUTES.FIND_PASSWORD,
        element: <FindPassword />,
      },

      {
        path: ROUTES.REGISTER(),
        element: <Register />,
      },

      {
        path: ROUTES.REGISTER_COMPLETE,
        element: <RegisterComplete />,
      },
      {
        element: <AuthenticatedRoute />,
        children: [
          {
            path: ROUTES.MY_PAGE,
            element: <MyPage />,
            children: [
              {
                path: ROUTES.MY_PAGE,
                element: <Navigate to={ROUTES.MY_MADE_QUIZ} replace />,
              },
              {
                path: ROUTES.MY_MADE_QUIZ,
                element: <MyMadeQuiz />,
              },
              {
                path: ROUTES.SOLVED_QUIZ,
                element: <SolvedQuiz />,
              },
              {
                path: ROUTES.MY_STUDY_GROUPS,
                element: <MyStudyGroups />,
              },
              {
                path: ROUTES.MY_STUDY_GROUPS_CREATE,
                element: <MyStudyGroupsCreate />,
              },
              {
                path: ROUTES.MY_STUDY_GROUPS_JOIN,
                element: <MyStudyGroupsJoin />,
              },
              {
                path: ROUTES.STUDY_GROUP(),
                element: <StudyGroup />,
              },
              {
                path: ROUTES.STUDY_GROUP_SETTING(),
                element: <StudyGroupSetting />,
              },
              {
                path: ROUTES.SETTINGS,
                children: [
                  {
                    index: true,
                    element: <Navigate to={ROUTES.EDIT_PROFILE} replace />,
                  },
                  {
                    path: ROUTES.EDIT_PROFILE,
                    element: <EditMyInfo />,
                  },
                  {
                    path: ROUTES.CHANGE_PASSWORD,
                    element: <ChangePassword />,
                  },
                  {
                    path: ROUTES.DELETE_ACCOUNT,
                    element: <DeleteAccount />,
                  },
                ],
              },
            ],
          },
        ],
      },

      {
        // 공용 컴포넌트 미리보기를 위한 페이지
        path: ROUTES.COMPONENT_TEST,
        element: <ComponentTest />,
      },
    ],
  },
  {
    path: ROUTES.QUIZ,
    element: <BaseLayout showHeader={false} />,
    children: [
      {
        path: ROUTES.SOLVING_QUIZ(),
        element: <SolvingQuiz />,
      },
      {
        path: ROUTES.QUIZ_RESULT(),
        element: <QuizResult />,
      },
      {
        path: ROUTES.QUIZ_REVIEW(),
        element: <QuizReview />,
      },
    ],
  },
  {
    path: ROUTES.NOT_FOUND,
    element: <BaseLayout showHeader={false} />,
    children: [
      {
        path: ROUTES.NOT_FOUND,
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
