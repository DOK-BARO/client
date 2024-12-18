import { BooksFilterType } from "@/types/BookType";
import { atom } from "jotai";

export const bookFilterAtom = atom<BooksFilterType>({
  sort: "QUIZ_COUNT",
  direction: "ASC",
});
