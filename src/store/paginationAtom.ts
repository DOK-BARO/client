import { PaginationType } from "@/types/PaginationType";
import { atom } from "jotai";

const getPageFromURL = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const page = queryParams.get("page");
  return page ? Number(page) : 1;
};

const initialPaginationState: PaginationType = {
  currentPage: getPageFromURL(),
  pagePosition: "start",
  totalPagesLength: undefined,
  middlePages: [],
  middlePagesLength: 6,
};

export const PaginationAtom = atom<PaginationType>(initialPaginationState);
