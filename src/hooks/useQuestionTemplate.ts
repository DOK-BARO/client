import useUpdateQuizCreationInfo from "./useUpdateQuizCreationInfo";
import { AnswerType, QuizQuestionType } from "@/types/QuizType";
import { CheckBoxOption } from "@/types/CheckBoxTypes";
import { RadioOptionType } from "@/types/RadioTypes";
import { useState } from "react";
import { BOOK_QUIZ_OPTION_MAX_LENGTH } from "@/data/constants";

export const useQuestionTemplate = (
  questionFormType: AnswerType,
  questionFormId: string,
) => {
  const { quizCreationInfo, updateQuizCreationInfo } =
    useUpdateQuizCreationInfo();

  const getQuestion = (): QuizQuestionType =>
    quizCreationInfo.questions?.find(
      (question) => question.id!.toString() === questionFormId,
    ) as QuizQuestionType;

  const setInitialOptions = (
    questionFormType: AnswerType,
  ): (CheckBoxOption | RadioOptionType)[] => {
    const question: QuizQuestionType = getQuestion();
    console.log("in template: %o:", question.selectOptions);
    const initialOptions =
      question?.selectOptions.map((option) => ({
        id: option.id,
        value: option.value,
        label: option.option,
      })) ?? [];
    console.log("initi: %o", initialOptions);

    return questionFormType === "MULTIPLE_CHOICE_MULTIPLE_ANSWER"
      ? (initialOptions as CheckBoxOption[])
      : (initialOptions as RadioOptionType[]);
  };

  const [options, setOptions] = useState<(RadioOptionType | CheckBoxOption)[]>(
    setInitialOptions(questionFormType),
  );

  const deleteOption = (optionId: number) => {
    setOptions(options.filter((option) => option.id !== optionId));
    const updatedQuestions: QuizQuestionType[] =
      quizCreationInfo.questions?.map((question) => {
        const filteredSelectOptions = question.selectOptions.filter(
          (option) => option.id !== optionId,
        );
        return {
          ...question,
          selectOptions: filteredSelectOptions,
        };
      }) ?? [];

    updateQuizCreationInfo("questions", updatedQuestions);
  };

  const handleAddQuizOptionItemBtn = () => {
    if (options.length < BOOK_QUIZ_OPTION_MAX_LENGTH) {
      const id: number = Date.now();
      const value: string = (options.length + 1).toString();
      const answerIndex: number = options.length + 1;

      setOptions((prev) => [
        ...prev,
        {
          id: id,
          value: value,
          label: "",
          answerIndex: answerIndex,
        },
      ]);

      const updatedQuestions = quizCreationInfo.questions!.map((question) => {
        if (question.id!.toString() === questionFormId!) {
          return {
            ...question,
            selectOptions: [
              ...question.selectOptions,
              { id: id, option: "", value: value, answerIndex: answerIndex },
            ],
          };
        }
        return question;
      });

      updateQuizCreationInfo("questions", updatedQuestions);
    }
  };

  return {
    options,
    setOptions,
    deleteOption,
    handleAddQuizOptionItemBtn,
    getQuestion,
  };
};
