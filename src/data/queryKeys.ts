import {
  FetchBooksParams,
  FetchMyQuizzesParams,
  FetchQuizzesParams,
  FetchReviewsParams,
  FetchStudyGroupsParams,
  SearchBooksParams,
} from "@/types/ParamsType";

export const bookKeys = {
  detail: (id: string | undefined) => ["bookDetailContent", id] as const,
  categories: () => ["bookCategories"] as const,
  list: (param?: FetchBooksParams) => ["bookList", param] as const,
  search: (params?: SearchBooksParams) => ["bookSearch", params] as const,
  quizList: (params: FetchQuizzesParams) => ["bookQuizList", params] as const,
};

export const studyGroupKeys = {
  detail: (id: number | undefined) => ["studyGroupDetail", id] as const,
  list: (params?: FetchStudyGroupsParams) =>
    ["studyGroupList", params] as const,
  myUnsolvedQuizList: (
    id: number | undefined,
    params: FetchStudyGroupsParams,
  ) => ["studyGroupMyUnsolvedQuizList", id, params] as const,
  mySolvedQuizList: (id: number | undefined, params: FetchStudyGroupsParams) =>
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
  myQuiz: (params: FetchMyQuizzesParams) => ["myQuiz", params] as const,
  solvedQuiz: (params: FetchMyQuizzesParams) => ["solvedQuiz", params] as const,
  detail: (id: string | undefined) => ["quizDetail", id] as const,
  prevDetail: (id: string | undefined) => ["prevDetail", id] as const,
  explanation: (id: string | undefined) => ["quizExplanation", id] as const,
  result: (solvingQuizId: string) => ["quizResult", solvingQuizId],
  studyResult: (studyGroupId: string, quizId: string) => [
    "studyResult",
    studyGroupId,
    quizId,
  ],
};

export const reviewKeys = {
  totalScore: (id: number | undefined) => ["reviewTotalScore", id] as const,
  list: (param?: FetchReviewsParams) => ["reviewList", param] as const,
};
