import { BookQuizzesFilterType, BooksFilterType } from "@/types/BookType";
import { atom } from "jotai";

export const bookFilterAtom = atom<BooksFilterType>({
  sort: "TITLE",
  direction: "ASC",
});

export const bookQuizzesFilterAtom = atom<BookQuizzesFilterType>({
  sort: "STAR_RATING",
  direction: "ASC",
});
