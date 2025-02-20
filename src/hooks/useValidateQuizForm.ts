import { QuizQuestionFormType } from "@/types/QuizType";
import { SelectOptionFormType } from "@/types/QuizType";
import { SetStateAction } from "jotai";

export const useValidateQuizForm = (
  questions: QuizQuestionFormType[],
  notValidCallBack: (errorTitle: string, questionId: number) => void,
  setInvalidQuestionFormId?: (
    value: SetStateAction<number | undefined>,
  ) => void,
  isTemporary: boolean = false,
) => {
  const hasDuplicate = (arr: SelectOptionFormType[]) => {
    const options: string[] = arr.map(({ option }) => option);
    return new Set(options).size !== options.length;
  };

  const isEmpty = (arr: SelectOptionFormType[]): boolean => {
    return arr.some(({ option }) => option.length === 0);
  };

  // 임시 저장용 검증
  const validateTemporaryQuestion = (
    question: QuizQuestionFormType,
  ): boolean => {
    // const selectOptions: SelectOptionFormType[] = question.selectOptions;
    // if (isEmpty(selectOptions)) {
    //   return false;
    // }
    // 중복 옵션 검증
    // if (hasDuplicate(selectOptions)) {
    //   return false;
    // }
    if (!question.answers?.length) {
      return false;
    }
    if (
      question.answerType === "MULTIPLE_CHOICE_MULTIPLE_ANSWER" &&
      question.answers.length <= 1
    ) {
      return false;
    }
    return true;
  };

  // 최종 저장용 전체 검증
  const validatePermanentQuestion = (
    question: QuizQuestionFormType,
  ): {
    isValid: boolean;
    errorMessage?: string;
  } => {
    // 질문 입력 검증
    if (question.content.length === 0) {
      return {
        isValid: false,
        errorMessage: "제목이 작성되었는지 확인하세요.",
      };
    }

    // 옵션 존재 여부 검증
    if (question.answerType !== "OX" && question.selectOptions.length === 0) {
      return {
        isValid: false,
        errorMessage: "선택지를 1개 이상 추가해 주세요.",
      };
    }

    const selectOptions: SelectOptionFormType[] = question.selectOptions;

    // 빈 옵션 검증
    if (isEmpty(selectOptions)) {
      return {
        isValid: false,
        errorMessage: "작성하지 않은 옵션이 있습니다.",
      };
    }

    // 중복 옵션 검증
    if (hasDuplicate(selectOptions)) {
      return {
        isValid: false,
        errorMessage: "중복된 옵션입니다. 다시 입력해 주세요.",
      };
    }

    // 답안 선택 여부 검증
    if (!question.answers || question.answers.length == 0) {
      return {
        isValid: false,
        errorMessage: "답안이 선택되었는지 확인하세요.",
      };
    }

    // 복수 정답 검증
    if (
      question.answerType === "MULTIPLE_CHOICE_MULTIPLE_ANSWER" &&
      question.answers.length <= 1
    ) {
      return {
        isValid: false,
        errorMessage: "복수정답은 답안을 2개 이상 선택해야 합니다.",
      };
    }

    return { isValid: true };
  };

  if (isTemporary) {
    for (const question of questions ?? []) {
      if (!validateTemporaryQuestion(question)) {
        return false;
      }
    }
  } else {
    for (const question of questions ?? []) {
      const validationResult = validatePermanentQuestion(question);
      if (!validationResult.isValid) {
        notValidCallBack(validationResult.errorMessage!, question.id);
        return false;
      }
    }
  }

  if (setInvalidQuestionFormId) {
    setInvalidQuestionFormId(undefined);
  }
  return true;
};
