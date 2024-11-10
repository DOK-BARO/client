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
  selectOptions: {id: number, option:string}[] | string[];
  answerExplanation: string;
  answerExplanationImages: (string | File )[],
  answerType: "OX" | "FILL_BLANK" | "MULTIPLE_CHOICE" | "SHORT";
  answers: string[];
}