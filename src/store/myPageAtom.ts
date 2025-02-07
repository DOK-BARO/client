import { atom } from "jotai";

export const studyGroupAtom = atom<
  { id: number; name: string; leaderId?: number } | undefined
>(undefined);
export const myPageTitleAtom = atom<string>("마이페이지");
export const isStudyGroupMainPageAtom = atom(
  (get) => get(myPageTitleAtom) === "마이페이지",
);
// export const isStudyGroupLeaderIsMeAtom = atom<boolean>(false);
