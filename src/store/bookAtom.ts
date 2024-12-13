import { SortFilterType } from "@/types/BookType";
import { atom } from "jotai";

export const BookFilterAtom = atom<{ sort: SortFilterType }>({
  sort: "QUIZ_COUNT",
});
