// TODO: bookAtom 으로 옮길지 고려
import { PaginationType } from "@/types/PaginationType";
import { atom } from "jotai";

const getPageFromURL = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const page = queryParams.get("page");
  return page ? Number(page) : 1;
};

const initialPaginationState: PaginationType = {
  parentComponentType: "BOOKS",
  currentPage: getPageFromURL(),
  pagePosition: "START",
  totalPagesLength: undefined,
  middlePages: [],
  middlePagesLength: 6,
  isMiddlePagesUpdated: false,
};

export const PaginationAtom = atom<PaginationType>(initialPaginationState);
