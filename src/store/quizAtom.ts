import { QuizCreationType } from "@/types/QuizType";
import { atom } from "jotai";

{
  /* 초기값 정의 */
}

const initialQuizCreationInfo: QuizCreationType = {
  title: null,
  description: null,
  book: null,
  viewScope: null,
  editScope: null,
  studyGroup: undefined,
  questions: null,
};
const initialSelectedOptions: string[] = [];
const initialQuizId: number | undefined = undefined;
const initialErrorModalTitle = "";
const initialIsQuizNextButtonEnabled = true; // 퀴즈 생성 단계 다음 버튼의 enabled 여부를 저장

{
  /* Atom 정의 */
}
export const quizCreationInfoAtom = atom<QuizCreationType>(
  initialQuizCreationInfo,
);
export const isQuizNextButtonEnabledAtom = atom<boolean>(
  initialIsQuizNextButtonEnabled,
);
export const errorModalTitleAtom = atom<string>(initialErrorModalTitle);
export const openErrorModalAtom = atom<() => void>();
export const selectedOptionsAtom = atom<string[]>(initialSelectedOptions);
export const createdQuizIdAtom = atom<number | undefined>(initialQuizId);

// 스터디 선택 단계 완료 여부 Atom
export const isStudyGroupSelectedAtom = atom(
  (get) => get(quizCreationInfoAtom).studyGroup !== null,
);

// 도서 선택 단계 완료 여부 Atom
export const isBookSelectedAtom = atom(
  (get) => get(quizCreationInfoAtom).book !== null,
);

// 퀴즈 작성 단계 완료 여부 Atom
// 1. 퀴즈 기본 정보 작성, 2. 문제 작성
export const isQuestionsWrittenAtom = atom(
  (get) =>
    get(quizCreationInfoAtom).title !== null &&
    get(quizCreationInfoAtom).description !== null &&
    get(quizCreationInfoAtom).questions !== null &&
    get(quizCreationInfoAtom).questions!.length > 0,
);

// 공유 설정 단계 완료 여부 Atom
export const isSetAtom = atom(
  (get) => get(quizCreationInfoAtom).viewScope !== null,
  //&& get(quizCreationInfoAtom).editScope !== null,
  (get, set, update: boolean) => {
    const quizCreationInfo = get(quizCreationInfoAtom);
    set(quizCreationInfoAtom, {
      ...quizCreationInfo,
      viewScope: update ? quizCreationInfo.viewScope : null,
      editScope: update ? quizCreationInfo.editScope : null,
    });
  },
);

// 각 단계의 완료 상태를 확인
export const stepsCompletionStatusAtom = atom((get) => ({
  isStudyGroupSelected: get(isStudyGroupSelectedAtom),
  isBookSelected: get(isBookSelectedAtom),
  isQuestionsWritten: get(isQuestionsWrittenAtom),
  isSet: get(isSetAtom),
}));

// 초기화
export const resetQuizCreationStateAtom = atom(null, (get, set) => {
  const currentBook = get(quizCreationInfoAtom).book;
  const currentStudyGroup = get(quizCreationInfoAtom).studyGroup;

  // book, studyGroup 있으면 유지
  set(quizCreationInfoAtom, {
    ...initialQuizCreationInfo,
    ...(currentBook ? { book: currentBook } : {}),
    ...(currentStudyGroup ? { studyGroup: currentStudyGroup } : {}),
  });
  set(isQuizNextButtonEnabledAtom, initialIsQuizNextButtonEnabled);
  set(errorModalTitleAtom, initialErrorModalTitle);
  set(selectedOptionsAtom, initialSelectedOptions);
  set(createdQuizIdAtom, initialQuizId);
});

export const resetQuizCreationBookStateAtom = atom(null, (_, set) => {
  set(quizCreationInfoAtom, {
    ...initialQuizCreationInfo,
    book: null,
  });
});

export const quizzesLengthAtom = atom<number>(0);
export const invalidQuestionFormIdAtom = atom<number>();
export const preventLeaveModalAtom = atom<boolean>(true); // 퀴즈 작성시 페이지 이탈 방지 모달을 띄워도 되는지 확인하는 atom (퀴즈 작성완료, 로그아웃시에만 false)

// 퀴즈 문제 작성 페이지 첫 방문 여부 확인
export const isFirstVisitAtom = atom<boolean>(true);
// 1부터 시작
export const quizGuideStepAtom = atom<number>(1);
