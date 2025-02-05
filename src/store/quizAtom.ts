import { QUIZ_CREATION_STEP } from "@/data/constants";
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

{
  /* Atom 정의 */
}
export const quizCreationInfoAtom = atom<QuizCreationType>(
  initialQuizCreationInfo,
);

// 퀴즈 다음 버튼 활성화 여부 Atom
export const isQuizNextButtonEnabledAtom = atom<boolean>((get) => {
  const step = get(quizCreationStepAtom);
  const quizInfo = get(quizCreationInfoAtom);
  console.log(quizInfo);

  switch (step) {
    case QUIZ_CREATION_STEP.STUDY_GROUP_SELECT:
      return true;
    case QUIZ_CREATION_STEP.BOOK_SELECT:
      return quizInfo.book !== null;
    case QUIZ_CREATION_STEP.QUIZ_BASIC_INFO:
    case QUIZ_CREATION_STEP.QUIZ_BASIC_INFO_FORM:
      return (
        quizInfo.title !== null &&
        quizInfo.description !== null &&
        !!quizInfo.title?.length &&
        !!quizInfo?.description.length
      );
    case QUIZ_CREATION_STEP.QUIZ_WRITE_FORM:
      return quizInfo.questions !== null && quizInfo.questions.length > 0;
    case QUIZ_CREATION_STEP.SETTING:
      return quizInfo.viewScope !== null;
    default:
      return true;
  }
});

export const quizCreationStepAtom = atom<number>(0); // 퀴즈 작성 단계

export const errorModalTitleAtom = atom<string>(initialErrorModalTitle);
export const openErrorModalAtom = atom<() => void>();
export const selectedOptionsAtom = atom<string[]>(initialSelectedOptions);
export const createdQuizIdAtom = atom<number | undefined>(initialQuizId);

// 스터디 선택 단계 완료 여부 Atom (진행단계 체크UI)
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
