import {
  BooksFetchType,
  QuizzesFetchType,
  ReviewsFetchType,
  StudyGroupsFetchType,
  BooksSearchType,
  MySolvedQuizzesFetchType,
  MyMadeQuizzesFetchType,
} from "@/types/ParamsType";

export const bookKeys = {
  detail: (id: number | undefined) => ["bookDetailContent", id] as const,
  categories: () => ["bookCategories"] as const,
  list: (param?: BooksFetchType) => ["bookList", param] as const,
  search: (params?: BooksSearchType) => ["bookSearch", params] as const,
  quizList: (params: QuizzesFetchType) => ["bookQuizList", params] as const,
};

export const studyGroupKeys = {
  detail: (id: number | undefined) => ["studyGroupDetail", id] as const,
  list: (params?: StudyGroupsFetchType) => ["studyGroupList", params] as const,
  myUnsolvedQuizList: (id: number | undefined, params: StudyGroupsFetchType) =>
    ["studyGroupMyUnsolvedQuizList", id, params] as const,
  mySolvedQuizList: (id: number | undefined, params: StudyGroupsFetchType) =>
    ["studyGroupMySolvedQuizList", id, params] as const,
  quizGradeResult: (studyGroupId: number, quizId: number) =>
    ["studyGroupQuizGradeResult", studyGroupId, quizId] as const,
  detailByInviteCode: (inviteCode: string | undefined) =>
    ["studyGroupDetailByInviteCode", inviteCode] as const,
};

export const authKeys = {
  terms: () => ["terms"] as const,
  termDetail: (id: number | null) => ["termDetail", id] as const,
};

export const userKeys = {
  user: () => ["user"] as const,
};

export const quizKeys = {
  myQuiz: (params: MyMadeQuizzesFetchType) => ["myQuiz", params] as const,
  solvedQuiz: (params: MySolvedQuizzesFetchType) =>
    ["solvedQuiz", params] as const,
  detail: (id: number | undefined) => ["quizDetail", id] as const,
  prevDetail: (id: number | undefined) => ["prevDetail", id] as const,
  explanation: (id: number | undefined) => ["quizExplanation", id] as const,
  result: (solvingQuizId: number) => ["quizResult", solvingQuizId],
  studyResult: (studyGroupId: number, quizId: number) => [
    "studyResult",
    studyGroupId,
    quizId,
  ],
};

export const reviewKeys = {
  totalScore: (id: number | undefined) => ["reviewTotalScore", id] as const,
  list: (param?: ReviewsFetchType) => ["reviewList", param] as const,
  myReview: (id: number | undefined) => ["myReview", id] as const,
};
