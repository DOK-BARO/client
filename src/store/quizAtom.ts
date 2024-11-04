import { atom } from "jotai";

// 퀴즈 생성 단계 다음 버튼의 enabled 여부를 저장
export const isQuizNextButtonEnabledAtom = atom<boolean>(false);
