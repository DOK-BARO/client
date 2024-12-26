// TODO: bookAtom 으로 옮길지 고려
import { StudyGroupsFilterType } from "@/types/FilterType";
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

export const paginationAtom = atom<PaginationType>(initialPaginationState);

// 마이페이지 > 내 스터디 퀴즈 > 풀어야 할 퀴즈
export const myPageUnsolvedQuizPaginationAtom = atom<PaginationType>({
  currentPage: 1,
  pagePosition: "START",
  totalPagesLength: undefined,
  middlePages: [],
  middlePagesLength: 6,
  isMiddlePagesUpdated: false,
});

export const myPageUnsolvedQuizFilterAtom = atom<StudyGroupsFilterType>({
  sort: "CREATED_AT",
  direction: "ASC",
});

// 마이페이지 > 내 스터디 그룹
export const myPageStudyGroupPaginationAtom = atom<PaginationType>({
  currentPage: 1,
  pagePosition: "START",
  totalPagesLength: undefined,
  middlePages: [],
  middlePagesLength: 6,
  isMiddlePagesUpdated: false,
});

export const myPageStudyGroupFilterAtom = atom<StudyGroupsFilterType>({
  sort: "CREATED_AT",
  direction: "ASC",
});
