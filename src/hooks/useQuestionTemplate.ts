import useUpdateQuizCreationInfo from "./useUpdateQuizCreationInfo";
import { AnswerType, QuizQuestionType } from "@/types/QuizType";
import { CheckBoxOption } from "@/types/CheckBoxTypes";
import { RadioOptionType } from "@/types/RadioTypes";
import { useState } from "react";

export const useQuestionTemplate = (questionFormType: AnswerType, questionFormId: string) => {
    const { quizCreationInfo, updateQuizCreationInfo } = useUpdateQuizCreationInfo();

    const getQuestion = (): QuizQuestionType =>
        quizCreationInfo.questions?.find(
            (question) => question.id.toString() === questionFormId
        ) as QuizQuestionType ?? [];

    const setInitialOptions = (questionFormType: AnswerType): (CheckBoxOption | RadioOptionType)[] => {
        const question: QuizQuestionType = getQuestion();
        const initialOptions = question?.selectOptions.map(
            (option) =>
            ({
                id: option.id,
                value: option.value,
                label: option.option,
            })
        ) ?? [];

        return questionFormType === "CHECK_BOX" ? initialOptions as CheckBoxOption[] : initialOptions as RadioOptionType[];
    };

    const [options, setOptions] = useState<(RadioOptionType | CheckBoxOption)[]>(setInitialOptions(questionFormType));

    const deleteOption = (optionId: number) => {
        setOptions(options.filter((option) => option.id !== optionId));
        const updatedQuestions: QuizQuestionType[] = quizCreationInfo.questions?.map((question) => {
            const filteredSelectOptions = question.selectOptions.filter((option) => option.id !== optionId);
            return {
                ...question,
                selectOptions: filteredSelectOptions,
            };
        }) ?? [];

        updateQuizCreationInfo("questions", updatedQuestions);
    };


    const onClickAddQuizOptionItem = () => {
        const id: number = Date.now();
        const value: string = (options.length + 1).toString();

        setOptions((prev) => [...prev, {
            id: id,
            value: value,
            label: "",
        }]);

        const updatedQuestions = quizCreationInfo.questions!.map((question) => {
            if (question.id.toString() === questionFormId!) {
                return {
                    ...question,
                    selectOptions: [
                        ...question.selectOptions,
                        { id: id, option: "", value: value },
                    ],
                };
            }
            return question;
        });
        
        updateQuizCreationInfo("questions", updatedQuestions);

    };

    return {
        options,
        setOptions,
        deleteOption,
        onClickAddQuizOptionItem,
        getQuestion,
    };

}