import { QUIZ_CREATION_STEP } from "@/data/constants";
import MemoizedQuizBasicInfoForm from "@/pages/CreateQuiz/composite/QuizBasicInfoForm/QuizBasicInfoForm";
import QuizBookSelectionForm from "@/pages/CreateQuiz/composite/QuizBookSectionForm/QuizBookSelectionForm/QuizBookSelectionForm";
import QuizSettingsForm from "@/pages/CreateQuiz/composite/QuizSettingsForm/QuizSettingsForm";
import QuizSettingStudyGroupForm from "@/pages/CreateQuiz/composite/QuizSettingStudyGroupForm/QuizSettingStudyGroupForm";
import QuizWriteForm from "@/pages/CreateQuiz/composite/QuizWriteForm/QuizWriteForm";
import QuizWriteGuideForm from "@/pages/CreateQuiz/composite/QuizWriteForm/QuizWriteGuideForm";

interface Props {
  completionStatus: {
    isStudyGroupSelected: boolean;
    isBookSelected: boolean;
    isQuestionsWritten: boolean;
    isSet: boolean;
  };
  // isFirstVisit: boolean;
  // isEditMode: boolean;
}

export const GetCreationQuizSteps = ({
  completionStatus,
  // isFirstVisit,
  // isEditMode,
}: Props) => [
  {
    order: QUIZ_CREATION_STEP.STUDY_GROUP_SELECT,
    icon: "👥",
    title: "스터디 그룹 선택",
    description: "퀴즈를 풀 스터디 그룹을 만들거나 선택해주세요.",
    formComponent: () => <QuizSettingStudyGroupForm />,
    isDone: completionStatus.isStudyGroupSelected,
  },
  {
    order: QUIZ_CREATION_STEP.BOOK_SELECT,
    icon: "📚",
    title: "도서 선택",
    description: "퀴즈를 내고자 하는 도서를 선택해주세요.",
    formComponent: () => <QuizBookSelectionForm />,
    isDone: completionStatus.isBookSelected,
  },
  {
    order: QUIZ_CREATION_STEP.QUIZ_BASIC_INFO,
    icon: "🏆",
    title: "퀴즈 작성",
    subSteps: [
      {
        order: QUIZ_CREATION_STEP.QUIZ_BASIC_INFO_FORM,
        title: "퀴즈 기본 정보",
        description: "퀴즈 이름과 설명을 작성해주세요.",
        formComponent: () => <MemoizedQuizBasicInfoForm />,
      },
      {
        order: QUIZ_CREATION_STEP.QUIZ_WRITE_FORM,
        title: "문제 작성",
        description: "퀴즈의 질문을 작성한 후, 답안을 클릭하여 설정해주세요.",
        formComponent: () => <QuizWriteForm />,
      },
    ],
    isDone: completionStatus.isQuestionsWritten,
  },
  {
    order: QUIZ_CREATION_STEP.SETTING,
    icon: "🔗",
    title: "공유 설정",
    description: "퀴즈를 볼 수 있는 사람을 설정해 주세요.",
    formComponent: () => <QuizSettingsForm />,
    isDone: completionStatus.isSet,
  },
];
