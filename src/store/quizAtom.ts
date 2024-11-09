import { BookQuizType } from "@/types/BookQuizType";
import { atom } from "jotai";

// 퀴즈 생성 단계 다음 버튼의 enabled 여부를 저장
export const IsQuizNextButtonEnabledAtom = atom<boolean>(false);

// 퀴즈 만들기 상태관리를 위한 전역변수
export const QuizCreationInfoAtom = atom<BookQuizType>({
  title: "",
  description: "",
  bookId: 0,
  timeLimitSecond: 0,
  viewScope: "EVERYONE",
  editScope: "EVERYONE",
  studyGroupIds: 0,
  questions: [],
});
