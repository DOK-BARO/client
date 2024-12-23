import { BooksFilterType } from "@/types/FilterType";
import { atom } from "jotai";

export const bookFilterAtom = atom<BooksFilterType>({
  sort: "TITLE",
  direction: "ASC",
});
