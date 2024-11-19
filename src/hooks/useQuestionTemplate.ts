import useUpdateQuizCreationInfo from "./useUpdateQuizCreationInfo";
import { AnswerType, QuizQuestionType } from "@/types/QuizType";
import { CheckBoxOption } from "@/types/CheckBoxTypes";
import { RadioOption } from "@/types/RadioTypes";
import { useState } from "react";

export const useQuestionTemplate = (questionFormType: AnswerType, questionFormId: string) => {
    const { quizCreationInfo, updateQuizCreationInfo } = useUpdateQuizCreationInfo();

    const getQuestion = (): QuizQuestionType =>
        quizCreationInfo.questions?.find(
            (question) => question.id.toString() === questionFormId
        ) as QuizQuestionType ?? [];

    const setInitialOptions = (questionFormType: AnswerType): (CheckBoxOption | RadioOption)[] => {
        const question: QuizQuestionType = getQuestion();
        const initialOptions = question?.selectOptions.map(
            (option) =>
            ({
                id: option.id,
                value: option.value,
                label: option.option,
            })
        ) ?? [];

        return questionFormType === "CHECK_BOX" ? initialOptions as CheckBoxOption[] : initialOptions as RadioOption[];
    };

    const [options, setOptions] = useState<(RadioOption | CheckBoxOption)[]>(setInitialOptions(questionFormType));
    const [focusedOptionIndex, setFocusedOptionIndex] = useState<number | null>(null);

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
    const createNewOption = () => {
        const id: number = Date.now();
        const value: string = (options.length + 1).toString();

        return {
            id: id,
            value: value,
            label: "",
        }
    }

    const updateQuestions = (newOption: { id: number, value: string, label: string }) => {
        quizCreationInfo.questions!.map((question) => {
            if (question.id.toString() === questionFormId!) {
                return {
                    ...question,
                    selectOptions: [
                        ...question.selectOptions,
                        { id: newOption.id, option: "", value: newOption.value },
                    ],
                };
            }
            return question;
        });
    }

    const onClickAddQuizOptionItem = () => {
        const newOption = createNewOption();
        setOptions((prev) => [...prev, newOption]);

        const updatedQuestions = updateQuestions(newOption);
        updateQuizCreationInfo("questions", updatedQuestions);
    };

    return {
        options,
        setOptions,
        focusedOptionIndex,
        setFocusedOptionIndex,
        deleteOption,
        onClickAddQuizOptionItem,
        getQuestion,
    };

}