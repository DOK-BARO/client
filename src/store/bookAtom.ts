import { SortFilterType } from "@/types/BookType";
import { atom } from "jotai";

export const bookFilterAtom = atom<{ sort: SortFilterType }>({
  sort: "QUIZ_COUNT",
});
