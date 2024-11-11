// TODO: 파일명 QuizType으로 변경

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
    profileUrl: string;
  };
}

// TODO: QuizCreationType으로 타입명 변경하기
export interface BookQuizType {
  title: string;
  description: string;
  bookId: number;
  timeLimitSecond?: number;
  viewScope: "EVERYONE" | "STUDY_GROUP" | "CREATOR";
  editScope: "EVERYONE" | "STUDY_GROUP" | "CREATOR";
  studyGroupIds: number;
  questions: BookQuizQuestionType[];
}

export interface BookQuizQuestionType {
  id: number;
  content: string;
  //selectOptions: string[];
  //TODO: api 요청 시 id제거 필요
  selectOptions: { id: number; option: string }[];
  answerExplanation: string;
  answerExplanationImages: string[];
  answerType: "OX" | "FILL_BLANK" | "MULTIPLE_CHOICE" | "SHORT";
  answers: string[];
}
