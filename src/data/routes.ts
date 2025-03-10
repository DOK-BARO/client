import { QuizResultRouteType, QuizReviewRouteType } from "@/types/ParamsType";

const ROUTES = {
  ROOT: "/",

  BOOK_LIST: "/books",
  BOOK_DETAIL_SECTION: (id?: number) => `/book/${id ?? ":id"}`,

  QUIZ_DETAIL: (id?: number) => `/quiz/${id ?? ":id"}`,
  CREATE_QUIZ: (id?: string | null) => `/create-quiz/${id ?? ":id"}`,
  CREATE_QUIZ_COMPLETE: "/create-quiz/complete",

  FIND_PASSWORD: "/find-password",
  REGISTER: (method?: string) => `/register/${method ?? ":method"}`,

  REGISTER_COMPLETE: "/register/complete",

  MY_PAGE: "/my",
  MY_MADE_QUIZ: "made-quiz",
  SOLVED_QUIZ: "solved-quiz",
  DRAFT_QUIZ: "draft-quiz",

  MY_STUDY_GROUPS: "study-groups",
  MY_STUDY_GROUPS_JOIN: "/my/study-groups/join",
  MY_STUDY_GROUPS_CREATE: "/my/study-groups/create",
  STUDY_GROUP: (studyGroupId?: number) =>
    `/my/study-groups/${studyGroupId ?? ":studyGroupId"}`,
  STUDY_GROUP_SETTING: (studyGroupId?: number) =>
    `/my/study-groups/${studyGroupId ?? ":studyGroupId"}/setting`,

  SETTINGS: "settings",
  EDIT_PROFILE: "edit-profile",
  CHANGE_PASSWORD: "change-password",
  DELETE_ACCOUNT: "delete-account",

  COMPONENT_TEST: "/component-test",

  QUIZ: "/quiz",
  SOLVING_QUIZ: (quizId?: number) => `/quiz/play/${quizId ?? ":quizId"}`,

  QUIZ_REVIEW: (param?: QuizReviewRouteType) =>
    `/quiz/review/${param?.quizId ?? ":quizId"}/${
      param?.solvingQuizId ?? ":solvingQuizId"
    }/${param?.quizTitle ?? ":quizTitle"}`,

  QUIZ_RESULT: (param?: QuizResultRouteType) =>
    `/quiz/result/${param?.quizId ?? ":quizId"}/${
      param?.solvingQuizId ?? ":solvingQuizId"
    }/${param?.quizTitle ?? ":quizTitle"}/${
      param?.studyGroupId ?? ":studyGroupId?"
    }`,

  NOT_FOUND: "*",
};

export default ROUTES;
