import { QUIZ_CREATION_STEP } from "@/data/constants";
import { QuizCreationType } from "@/types/QuizType";
export const useIsQuizStepEnabled = (
  order: number,
  quizInfo: QuizCreationType,
) => {
  switch (order) {
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
};
