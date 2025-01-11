import { atom } from "jotai";
import {
  StudyGroupsFilterType,
  BooksFilterType,
  ReviewsFilterType,
  QuizzesFilterType,
  MyMadeQuizzesFilterType,
} from "@/types/FilterType";

// 기본값 정의
// 마이페이지 > 내 스터디 그룹
const DEFAULT_MY_PAGE_STUDY_GROUP_FILTER: StudyGroupsFilterType = {
  sort: "CREATED_AT",
  direction: "DESC",
};

// 마이페이지 > 내 스터디 퀴즈 > 풀어야 할 퀴즈
const DEFAULT_MY_PAGE_UNSOLVED_QUIZ_FILTER: StudyGroupsFilterType = {
  sort: "CREATED_AT",
  direction: "DESC",
};

// 마이페이지 > 내 스터디 퀴즈 > 제출한 퀴즈
const DEFAULT_MY_PAGE_SOLVED_QUIZ_FILTER: StudyGroupsFilterType = {
  sort: "CREATED_AT",
  direction: "DESC",
};

// 메인페이지 > 책 목록
const DEFAULT_BOOK_FILTER: BooksFilterType = {
  sort: "TITLE",
  direction: "ASC",
};

// 책 상세 페이지 > 퀴즈 목록
const DEFAULT_QUIZZES_FILTER: QuizzesFilterType = {
  sort: "STAR_RATING",
  direction: "ASC",
};

// 마이 페이지 > 내가 만든 퀴즈
const DEFAULT_MY_MADE_QUIZZES_FILTER: MyMadeQuizzesFilterType = {
  sort: "CREATED_AT",
  direction: "DESC",
};

// 퀴즈 상세 페이지 > 리뷰
const DEFAULT_REVIEW_FILTER: ReviewsFilterType = {
  sort: "STAR_RATING",
  direction: "ASC",
};

// Atom 정의
export const myPageStudyGroupFilterAtom = atom<StudyGroupsFilterType>(
  DEFAULT_MY_PAGE_STUDY_GROUP_FILTER
);

export const myPageUnsolvedQuizFilterAtom = atom<StudyGroupsFilterType>(
  DEFAULT_MY_PAGE_UNSOLVED_QUIZ_FILTER
);

export const myPageSolvedQuizFilterAtom = atom<StudyGroupsFilterType>(
  DEFAULT_MY_PAGE_SOLVED_QUIZ_FILTER
);

export const bookFilterAtom = atom<BooksFilterType>(DEFAULT_BOOK_FILTER);

export const quizzesFilterAtom = atom<QuizzesFilterType>(
  DEFAULT_QUIZZES_FILTER
);

export const myMadeQuizzesFilterAtom = atom<MyMadeQuizzesFilterType>(
  DEFAULT_MY_MADE_QUIZZES_FILTER
);

export const reviewFilterAtom = atom<ReviewsFilterType>(DEFAULT_REVIEW_FILTER);

// 리셋 함수
/**
 * 공통 리셋 함수
 * @param setAtom - 업데이트 함수
 * @param defaultValue - 기본값
 */
export const resetFilter = <T>(
  setAtom: (value: T) => void,
  defaultValue: T
) => {
  setAtom(defaultValue);
};

// Atom별 리셋 함수
/**
 * 마이페이지 > 내 스터디 그룹 필터 리셋
 */
export const resetMyPageStudyGroupFilter = (
  setAtom: (value: StudyGroupsFilterType) => void
) => resetFilter(setAtom, DEFAULT_MY_PAGE_STUDY_GROUP_FILTER);

/**
 * 마이페이지 > 내 스터디 퀴즈 > 풀어야 할 퀴즈 필터 리셋
 */
export const resetMyPageUnsolvedQuizFilter = (
  setAtom: (value: StudyGroupsFilterType) => void
) => resetFilter(setAtom, DEFAULT_MY_PAGE_UNSOLVED_QUIZ_FILTER);

/**
 * 마이페이지 > 내 스터디 퀴즈 > 제출한 퀴즈 필터 리셋
 */
export const resetMyPageSolvedQuizFilter = (
  setAtom: (value: StudyGroupsFilterType) => void
) => resetFilter(setAtom, DEFAULT_MY_PAGE_SOLVED_QUIZ_FILTER);

/**
 * 메인페이지 > 책 목록 필터 리셋
 */
export const resetBooksFilter = (setAtom: (value: BooksFilterType) => void) =>
  resetFilter(setAtom, DEFAULT_BOOK_FILTER);

/**
 * 책 상세 페이지 > 퀴즈 목록 필터 리셋
 */
export const resetBookQuizzesFilter = (
  setAtom: (value: QuizzesFilterType) => void
) => resetFilter(setAtom, DEFAULT_QUIZZES_FILTER);

/**
 * 마이 페이지 > 내가 만든 퀴즈 목록 필터 리셋
 */
export const resetQuizzesFilter = (
  setAtom: (value: MyMadeQuizzesFilterType) => void
) => resetFilter(setAtom, DEFAULT_MY_MADE_QUIZZES_FILTER);

/**
 * 퀴즈 상세 페이지 > 리뷰 필터 리셋
 */
export const resetReviewFilter = (
  setAtom: (value: ReviewsFilterType) => void
) => resetFilter(setAtom, DEFAULT_REVIEW_FILTER);
