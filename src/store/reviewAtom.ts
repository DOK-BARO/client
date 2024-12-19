import { ReviewsFilterType } from "@/types/ReviewType";
import { atom } from "jotai";

export const reviewFilterAtom = atom<ReviewsFilterType>({
  sort: "STAR_RATING",
  direction: "ASC",
});
