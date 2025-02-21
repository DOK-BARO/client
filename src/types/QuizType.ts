import { ReactNode } from "react";
import { BookType } from "./BookType";
import { StudyGroupType } from "./StudyGroupType";
import { SolvingQuizStudyGroupUserType } from "./UserType";

interface CreatorType {
  id: number;
  nickname: string;
  profileImageUrl: string;
}
export interface QuizType {
  id: number;
  title: string;
  averageStarRating: number;
  averageDifficultyLevel: number;
  questionCount: number;
  creator: {
    // TODO: User타입이랑 연결시킬 수 있으면 연결하는게 좋을 것 같음
    id: number;
    nickname: string;
    profileUrl: string; // profileImageUrl (통일. 백엔드와도 고려해야함)
  };
}

export interface QuizExplanationType {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  creator: CreatorType;
  book: {
    id: number;
    title: string;
    imageUrl: string;
  };
}

// 퀴즈 풀기 시 사용되는 타입
export interface SolvingQuizFetchType {
  id: number;
  title: string;
  studyGroupId?: number;
  timeLimitSecond?: number;
  questions: SolvingQuizQuestionType[];
}

export interface SolvingQuizQuestionType {
  id: number;
  content: string;
  selectOptions: { content: string }[];
  type: AnswerType;
}

export interface MyQuizFetchType {
  endPageNumber: number;
  data: MyQuizDataType[];
}

export interface MyQuizDataType {
  id: number;
  bookImageUrl?: string;
  title: string;
  description: string;
  updatedAt: string;
  studyGroup?: MyQuizStudyGroupType;
}

export interface MySolvedQuizDataType {
  id: number;
  bookImageUrl?: string;
  title: string;
  solvedAt: string;
  studyGroup?: MyQuizStudyGroupType;
  quiz: SolvedQuizType;
}

interface MyQuizStudyGroupType {
  id: number;
  name: string;
  profileImageUrl?: string;
}

interface SolvedQuizType {
  id: number;
  title: string;
  creator: CreatorType;
}

export type ViewScopeType = "EVERYONE" | "STUDY_GROUP" | "CREATOR";
export type EditScopeType = "EVERYONE" | "STUDY_GROUP" | "CREATOR";
export const scopeTranslations: Record<string, ViewScopeType | EditScopeType> =
  {
    모두: "EVERYONE",
    스터디원만: "STUDY_GROUP",
    나만: "CREATOR",
  };
export const scopeReverseTranslations: Record<
  ViewScopeType | EditScopeType,
  string
> = {
  EVERYONE: "모두",
  STUDY_GROUP: "스터디원만",
  CREATOR: "나만",
};

export type AnswerType =
  | "OX"
  | "FILL_BLANK"
  | "MULTIPLE_CHOICE_SINGLE_ANSWER"
  | "MULTIPLE_CHOICE_MULTIPLE_ANSWER"
  | "SHORT";
export interface QuizFormType {
  // 퀴즈 폼 작성 중 사용되는 타입 : FormType
  title: string | null;
  description: string | null;
  book: BookType | null;
  viewScope: ViewScopeType | null;
  editScope: EditScopeType | null;
  studyGroup: StudyGroupType | null | undefined; // undefined -> 스터디그룹 선택 안함
  questions: QuizQuestionFormType[] | null;
}

export interface SelectOptionFormType {
  id: number;
  option: string;
  value: string;
  answerIndex: number;
}

export interface QuizQuestionFormType {
  // 퀴즈 질문 폼 유저 입력의 객체 구조 정의
  id: number;
  content: string;
  selectOptions: SelectOptionFormType[];
  answerExplanationContent: string;
  answerExplanationImages: JSX.Element[];
  answerType: AnswerType;
  answers: string[];
}

export interface QuizCreateType {
  // TODO: 생성요청, fetchQuizzesDetail(퀴즈 수정 시 사용되는 퀴즈 상세조회 (정답, 정답 설명을 포함한 조회))에서도 사용됨.
  // 임시저장이 fetchQuizzesDetail에서는 필요하지 않으므로 임시저장 기능 구현 시 temporary를 제외한 타입을 base로 만들면 좋을듯

  // 퀴즈 생성 요청 타입
  id?: string;
  title: string;
  description: string;
  bookId: number;
  timeLimitSecond?: number;
  viewScope: ViewScopeType;
  editScope: EditScopeType;
  studyGroupId?: number | null;
  questions: QuizQuestionCreateType[];
  temporary: boolean; // 임시 저장 여부
}

export type QuizQuestionCreateType = {
  id?: number; // 수정하기 api 요청 시 id가 없으면 create, 있으면 modify
  content: string;
  selectOptions: string[];
  answerExplanationContent: string;
  answerExplanationImages: string[];
  answerType: AnswerType;
  answers: string[];
};

export interface QuestionFormType {
  // 퀴즈 질문 폼의 객체 구조 정의
  id: number;
  answerType: AnswerType;
  component: ReactNode;
}

export interface QuestionCheckedResultType {
  solvingQuizId: number;
  playerId: number;
  quizId: number;
  questionId: number;
  correct: boolean;
  correctAnswer: string[];
  answerExplanationContent: string;
  answerExplanationImages: string[];
}

export interface QuizSettingOptionType {
  label: string;
  description: string;
}

export interface QuizSettingType {
  title: string;
  name: string;
  options: QuizSettingOptionType[];
  icon: string; // path
}

export interface SolvingQuizGradeResultType {
  solvingQuizId: number;
  quizId: number;
  playerId: number;
  questionCount: number;
  correctCount: number;
}

export interface SolvingQuizStudyGroupGradeResultType {
  quizId: number;
  studyGroupId: number;
  totalQuestionCount: number;
  solvedMember: SolvedMemberType[];
  unSolvedMember: SolvingQuizStudyGroupUserType[];
}

export interface SolvedMemberType {
  member: SolvingQuizStudyGroupUserType;
  solvingQuizId: number;
  correctCount: number;
}
