import { QuizQuestionType } from "@/types/QuizType";
import { SelectOptionType } from "@/types/QuizType";
import { SetStateAction } from "jotai";
export const useValidateQuizForm = (
  questions: QuizQuestionType[],
  notValidCallBack: (errorTitle: string, questionId: number) => void,
  setInvalidQuestionFormId?: (
    value: SetStateAction<number | undefined>,
  ) => void,
) => {
  const hasDuplicate = (arr: SelectOptionType[]) => {
    const options: string[] = arr.map(({ option }) => option);
    return new Set(options).size !== options.length;
  };
  const isEmpty = (arr: SelectOptionType[]): boolean => {
    return arr.some(({ option }) => option.length === 0);
  };
  for (const question of questions ?? []) {
    // - 질문 입력 안 했을 때: 질문을 입력해 주세요.
    if (question.content.length === 0) {
      notValidCallBack("제목이 작성되었는지 확인하세요", question.id);
      return false;
    }

    // - 옵션 하나도 없을 때: 선택지를 1개 이상 추가해 주세요.
    if (question.answerType !== "OX" && question.selectOptions.length === 0) {
      notValidCallBack("선택지를 1개 이상 추가해 주세요", question.id);
      return false;
    }

    const selectOptions: SelectOptionType[] = question.selectOptions;
    // 작성하지 않은 옵션이 있습니다.
    if (isEmpty(selectOptions)) {
      notValidCallBack("작성하지 않은 옵션이 있습니다.", question.id);
      return false;
    }
    // -  중복된 옵션이 있을 때: 중복된 옵션입니다. 다시 입력해 주세요.
    const duplicated: boolean = hasDuplicate(selectOptions);
    if (duplicated) {
      notValidCallBack("중복된 옵션입니다. 다시 입력해 주세요.", question.id);
      return false;
    }

    if (!question.answers?.length) {
      notValidCallBack("답안이 선택되었는지 확인하세요.", question.id);
      return false;
    }
    if (question.answerType === "MULTIPLE_CHOICE_MULTIPLE_ANSWER") {
      if (question.answers.length <= 1) {
        notValidCallBack(
          "복수정답은 답안을 2개이상 선택해야 합니다",
          question.id,
        );
        return false;
      }
    }

    if (setInvalidQuestionFormId) {
      setInvalidQuestionFormId(undefined);
    }
  }
  return true;
};
