import { createBrowserRouter, Navigate } from "react-router-dom";
import ROUTES from "@/data/routes";
import { lazy } from "react";

const BaseLayout = lazy(
  () => import("@/components/layout/BaseLayout/BaseLayout.tsx"),
);
const BookListLayout = lazy(
  () => import("@/pages/BookList/layout/BookListLayout/BookListLayout"),
);
const BookList = lazy(
  () => import("@/pages/Home/components/composite/BookList/BookList"),
);
const QuizDetail = lazy(() => import("@/pages/QuizDetail"));
const CreateQuiz = lazy(() => import("@/pages/CreateQuiz"));
const CreateQuizComplete = lazy(
  () =>
    import(
      "@/pages/CreateQuiz/composite/CreateQuizComplete/CreateQuizComplete"
    ),
);
const BookDetailSection = lazy(() => import("@/pages/BookDetail"));
const FindPassword = lazy(() => import("@/pages/FindPassword"));
const Register = lazy(() => import("@/pages/Register"));
const RegisterComplete = lazy(
  () => import("@/pages/Register/composite/RegisterComplete/RegisterComplete"),
);
const MyPage = lazy(() => import("@/pages/MyPage"));
const MyMadeQuiz = lazy(
  () => import("@/pages/MyPage/composite/MyMadeQuiz/MyMadeQuiz"),
);
const SolvedQuiz = lazy(
  () => import("@/pages/MyPage/composite/SolvedQuiz/SolvedQuiz"),
);
const MyStudyGroups = lazy(
  () => import("@/pages/MyPage/composite/MyStudyGroups/MyStudyGroups"),
);
const StudyGroup = lazy(
  () => import("@/pages/MyPage/composite/StudyGroup/StudyGroup"),
);
const StudyGroupSetting = lazy(
  () => import("@/pages/MyPage/composite/StudyGroupSetting/StudyGroupSetting"),
);
const EditMyInfo = lazy(
  () => import("@/pages/MyPage/composite/accountSetting/EditMyInfo/EditMyInfo"),
);
const ChangePassword = lazy(
  () =>
    import(
      "@/pages/MyPage/composite/accountSetting/ChangePassword/ChangePassword"
    ),
);
const ComponentTest = lazy(() => import("@/pages/ComponentTest"));
const SolvingQuiz = lazy(() => import("@/pages/SolveQuiz"));
const QuizResult = lazy(() => import("@/pages/QuizResult"));
const QuizReview = lazy(() => import("@/pages/QuizReview"));
const DeleteAccount = lazy(
  () =>
    import(
      "@/pages/MyPage/composite/accountSetting/DeleteAccount/DeleteAccount.tsx"
    ),
);
const NotFound = lazy(() => import("@/pages/NotFound"));
const MyStudyGroupsCreate = lazy(
  () =>
    import("@/pages/MyPage/composite/MyStudyGroupsCreate/MyStudyGroupsCreate"),
);
const MyStudyGroupsJoin = lazy(
  () => import("@/pages/MyPage/composite/MyStudyGroupsJoin/MyStudyGroupsJoin"),
);
const Landing = lazy(() => import("@/pages/Landing"));
const AuthenticatedRoute = lazy(
  () => import("@/components/layout/AuthenticatedRoute/AuthenticatedRoute"),
);

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
