import { ReviewsFilterType } from "@/types/FilterType";
import { atom } from "jotai";

export const reviewFilterAtom = atom<ReviewsFilterType>({
  sort: "STAR_RATING",
  direction: "ASC",
});
