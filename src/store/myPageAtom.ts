import { atom } from "jotai";

export const studyGroupAtom = atom<{ id: number; name: string }>();
export const myPageTitleAtom = atom<string>("마이페이지");
export const isStudyGroupSettingPageAtom = atom<boolean>(false);
