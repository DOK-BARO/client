import { StudyGroupsFilterType } from "@/types/FilterType";
import { atom } from "jotai";

export const studyGroupFilterAtom = atom<StudyGroupsFilterType>({
  sort: "CREATED_AT",
  direction: "DESC",
});
