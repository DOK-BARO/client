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
  content: string;
  selectOptions: string[];
  answerExplanation: string;
  // answerExplanationImages
  answerType: "OX" | "FILL_BLANK" | "MULTIPLE_CHOICE" | "SHORT";
  answers: string[];
}
