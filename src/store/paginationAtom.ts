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
  parentComponentType: "BOOKS",
  currentPage: getPageFromURL(),
  pagePosition: "START",
  totalPagesLength: undefined,
  middlePages: [],
  middlePagesLength: 6,
  isMiddlePagesUpdated: false,
};

export const paginationAtom = atom<PaginationType>(initialPaginationState);
