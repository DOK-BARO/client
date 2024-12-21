import { BooksFilterType } from "@/types/FilterType";
import { atom } from "jotai";

export const bookFilterAtom = atom<BooksFilterType>({
  sort: "QUIZ_COUNT",
  direction: "ASC",
});
