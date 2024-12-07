import { QuizCreationType } from "@/types/QuizType";
import { atom } from "jotai";

// 퀴즈 생성 단계 다음 버튼의 enabled 여부를 저장
export const IsQuizNextButtonEnabledAtom = atom<boolean>(false);

// 퀴즈 만들기 상태관리를 위한 전역변수
export const QuizCreationInfoAtom = atom<QuizCreationType>({
  title: null,
  description: null,
  book: null,
  timeLimitSecond: null,
  viewScope: null,
  editScope: null,
  studyGroup: null,
  questions: null,
});

// 스터디 선택 단계 완료 여부 Atom
export const isStudyGroupSelectedAtom = atom(
  (get) => get(QuizCreationInfoAtom).studyGroup !== null
);

// 도서 선택 단계 완료 여부 Atom
export const isBookSelectedAtom = atom(
  (get) => get(QuizCreationInfoAtom).book !== null
);

// 퀴즈 작성 단계 완료 여부 Atom
// 1. 퀴즈 기본 정보 작성, 2. 문제 작성
export const isQuestionsWrittenAtom = atom(
  (get) =>
    get(QuizCreationInfoAtom).title !== null &&
    get(QuizCreationInfoAtom).description !== null &&
    get(QuizCreationInfoAtom).questions !== null && 
    get(QuizCreationInfoAtom).questions!.length > 0
);

// 공유 설정 단계 완료 여부 Atom
export const isSetAtom = atom(
  (get) =>
    get(QuizCreationInfoAtom).timeLimitSecond !== null &&
    get(QuizCreationInfoAtom).viewScope !== null &&
    get(QuizCreationInfoAtom).editScope !== null
);

// 각 단계의 완료 상태를 확인
export const stepsCompletionStatusAtom = atom((get) => ({
  isStudyGroupSelected: get(isStudyGroupSelectedAtom),
  isBookSelected: get(isBookSelectedAtom),
  isQuestionsWritten: get(isQuestionsWrittenAtom),
  isSet: get(isSetAtom),
}));

export const errorModalTitleAtom = atom<string>("");
export const openErrorModalAtom = atom<() => void>();

export const selectedOptions = atom<string[]>([]);
export const solvingQuizIdAtom = atom<number>(0);
