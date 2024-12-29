import { StudyGroupsFilterType } from "@/types/FilterType";
import { atom } from "jotai";

// 마이페이지 > 내 스터디 그룹
export const myPageStudyGroupFilterAtom = atom<StudyGroupsFilterType>({
  sort: "CREATED_AT",
  direction: "ASC",
});

// 마이페이지 > 내 스터디 퀴즈 > 풀어야 할 퀴즈
export const myPageUnsolvedQuizFilterAtom = atom<StudyGroupsFilterType>({
  sort: "CREATED_AT",
  direction: "ASC",
});

// 마이페이지 > 내 스터디 퀴즈 > 제출한 퀴즈
export const myPageSolvedQuizFilterAtom = atom<StudyGroupsFilterType>({
  sort: "CREATED_AT",
  direction: "ASC",
});
