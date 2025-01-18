// TODO: bookAtom 으로 옮길지 고려
import { PaginationType } from "@/types/PaginationType";
import { atom } from "jotai";

// query에서 page를 가져옴. 기본값은 1페이지.
const getPageFromURL = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const page = queryParams.get("page");
  return page ? Number(page) : 1; // 기본값 1 페이지
};
// 초기 페이지네이션 상태
const initialPaginationState: PaginationType = {
  parentPage: "books",
  currentPage: getPageFromURL(),
  pagePosition: "START",
  totalPagesLength: undefined,
  middlePages: [],
  middlePagesLength: 6,
  isMiddlePagesUpdated: false,
};
// 현재 쿼리스트링 페이지네이션 부분에서는 모두 같은 paginationAtom을 사용하고 있습니다.
export const paginationAtom = atom<PaginationType>(initialPaginationState);

// 이전 (책 목록) 페이지네이션 상태 저장
export const prevPaginationStateAtom = atom<PaginationType | undefined>(
  undefined,
);

// 마이페이지 > 만든 퀴즈
export const myMadeQuizPaginationAtom = atom<PaginationType>({
  currentPage: 1,
  pagePosition: "START",
  totalPagesLength: undefined,
  middlePages: [],
  middlePagesLength: 6,
  isMiddlePagesUpdated: false,
});

// 마이페이지 전체 푼 퀴즈
export const mySolvedQuizPaginationAtom = atom<PaginationType>({
  currentPage: 1,
  pagePosition: "START",
  totalPagesLength: undefined,
  middlePages: [],
  middlePagesLength: 6,
  isMiddlePagesUpdated: false,
});

// 마이페이지 > 내 스터디 그룹
export const myStudyGroupPaginationAtom = atom<PaginationType>({
  currentPage: 1,
  pagePosition: "START",
  totalPagesLength: undefined,
  middlePages: [],
  middlePagesLength: 6,
  isMiddlePagesUpdated: false,
});

// 마이페이지 > 내 스터디 퀴즈 > 풀어야 할 퀴즈
export const myStudyUnsolvedQuizPaginationAtom = atom<PaginationType>({
  currentPage: 1,
  pagePosition: "START",
  totalPagesLength: undefined,
  middlePages: [],
  middlePagesLength: 6,
  isMiddlePagesUpdated: false,
});

// 마이페이지 > 내 스터디 퀴즈 > 제출한 퀴즈
export const myStudySolvedQuizPaginationAtom = atom<PaginationType>({
  currentPage: 1,
  pagePosition: "START",
  totalPagesLength: undefined,
  middlePages: [],
  middlePagesLength: 6,
  isMiddlePagesUpdated: false,
});
