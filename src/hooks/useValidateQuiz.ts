import { QuizFormType, QuizQuestionFormType } from "@/types/QuizType";
import { SelectOptionFormType } from "@/types/QuizType";
import { SetStateAction } from "jotai";

const useValidateQuiz = () => {
  // 퀴즈 업로드 전 유효성 검사
  const validateQuestionForm = (
    questions: QuizQuestionFormType[],
    notValidCallBack: (errorTitle: string, questionId: number) => void,
    setInvalidQuestionFormId?: (
      value: SetStateAction<number | undefined>,
    ) => void,
    isTemporary: boolean = false,
    isAutoSave: boolean = false,
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
    ): {
      isValid: boolean;
      errorMessage?: string;
    } => {
      // const selectOptions: SelectOptionFormType[] = question.selectOptions;
      // if (isEmpty(selectOptions)) {
      //   return false;
      // }
      // 중복 옵션 검증
      // if (hasDuplicate(selectOptions)) {
      //   return false;
      // }
      if (!question.answers || question.answers.length === 0) {
        if (!isAutoSave) {
          return {
            isValid: false,
            errorMessage: "답안이 선택되었는지 확인하세요.",
          };
        } else {
          return { isValid: false };
        }
      }
      if (
        question.answerType === "MULTIPLE_CHOICE_MULTIPLE_ANSWER" &&
        question.answers.length <= 1
      ) {
        if (!isAutoSave) {
          return {
            isValid: false,
            errorMessage: "복수정답은 답안을 2개 이상 선택해야 합니다.",
          };
        } else {
          return { isValid: false };
        }
      }
      return { isValid: true };
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
      const selectOptions: SelectOptionFormType[] = question.selectOptions;

      // 옵션 존재 여부 검증
      if (question.answerType !== "OX" && selectOptions.length === 0) {
        return {
          isValid: false,
          errorMessage: "선택지를 1개 이상 추가해 주세요.",
        };
      }

      // - 옵션이 2개 이하일 때: 선택지를 2개 이상 추가해 주세요.
      if (question.answerType !== "OX" && selectOptions.length < 2) {
        return {
          isValid: false,
          errorMessage: "선택지를 2개 이상 추가해 주세요.",
        };
      }

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

    const validateQuestion = isTemporary
      ? validateTemporaryQuestion
      : validatePermanentQuestion;

    for (const question of questions ?? []) {
      const validationResult = validateQuestion(question);

      if (!validationResult.isValid) {
        if (!isAutoSave || !isTemporary) {
          notValidCallBack(validationResult.errorMessage!, question.id);
        }
        return false;
      }
    }

    if (setInvalidQuestionFormId) {
      setInvalidQuestionFormId(undefined);
    }
    return true;
  };

  // 퀴즈 상태에 빈 값이 있는지 확인
  const checkNullFieldsInQuiz = ({
    isTemporary,
    quizCreationInfo,
  }: {
    isTemporary: boolean;
    quizCreationInfo: QuizFormType;
  }) => {
    const requiredFields = ["title", "description", "book"];
    const allRequiredFields = [...requiredFields, "viewScope"];

    const hasNullFields = (
      isTemporary ? requiredFields : allRequiredFields
    ).some(
      (field) =>
        quizCreationInfo[field as keyof typeof quizCreationInfo] === null,
    );
    return !hasNullFields;
  };

  return { validateQuestionForm, checkNullFieldsInQuiz };
};
export default useValidateQuiz;
