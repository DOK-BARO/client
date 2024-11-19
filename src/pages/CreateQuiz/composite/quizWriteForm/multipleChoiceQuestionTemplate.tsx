import styles from "@/pages/CreateQuiz/composite/quizWriteForm/_quiz_write_form_item.module.scss";
import SelectOptionMultipleChoice from "@/pages/CreateQuiz/composite/quizWriteForm/selectOptionMultipleChoice";
import { RadioOption } from "@/types/RadioTypes.ts";
import { FC, useEffect, useState } from "react";
import { QuestionFormMode } from "@/data/constants.ts";
import useRadioGroup from "@/hooks/useRadioGroup.ts";
import { BookQuizQuestionType } from "@/types/BookQuizType";
import useUpdateQuizCreationInfo from "@/hooks/useUpdateQuizCreationInfo";

export const MultipleChoiceQuestionTemplate: FC<{ questionFormMode?: string, questionFormId?: string }> = ({ questionFormMode, questionFormId }) => {
  const { quizCreationInfo, updateQuizCreationInfo } = useUpdateQuizCreationInfo();

  const getQuestion = () => (quizCreationInfo.questions?.find((question) => (question.id.toString() === questionFormId)) as BookQuizQuestionType);

  const setInitialOptions = (): RadioOption[] => {
    const question = getQuestion();
    const initialOptions: RadioOption[] = question?.selectOptions.map((option) => ({ id: option.id, value: option.value, label: option.option } as RadioOption)) ?? [];
    return initialOptions;
  }
  const [options, setOptions] = useState<RadioOption[]>(setInitialOptions());
  const [focusedOptionIndex, setFocusedOptionIndex] = useState<number | null>(null);

  const setInitialAnswer = (): string => {
    const question = getQuestion();
    return question.answers[0];
  }
  const { selectedValue: selectedRadioGroupValue, handleChange: onRadioGroupChange } = useRadioGroup(setInitialAnswer());

  const deleteOption = (optionId: number) => {
    setOptions(options.filter((option) => option.id !== optionId));

    // TODO: onClickAddQuizOptionItem와 겹치는 로직 리팩토링 필요
    const updatedQuestions:BookQuizQuestionType[] = quizCreationInfo.questions?.map((question) => {
      const filteredSelectOptions = question.selectOptions.filter((option) => option.id !== optionId);
      return {
          ...question,
          selectOptions: filteredSelectOptions,
      };
  }) ?? [];
    
    updateQuizCreationInfo("questions", updatedQuestions);
    
  };

  const handleOptionFocus = (id: number) => {
    setFocusedOptionIndex(id);
  };

  useEffect(() => {
    if (questionFormMode === QuestionFormMode.QUESTION) {
      onRadioGroupChange(null);
    } else {
      const question = getQuestion();
      onRadioGroupChange(question.answers[0]);
    }
  }, [questionFormMode]);

  const handleOptionBlur = () => {
    setFocusedOptionIndex(null);
  };

  const setText = (optionId: number, label: string) => {

    const updatedOptions = options.map((option) => {
      if (option.id === optionId) {
        return { ...option, label };
      }
      return option;
    });
    setOptions(updatedOptions);
  };

  const handleRadioGroupChange = (value: string) => {
    onRadioGroupChange(value);

    const updatedQuestions:BookQuizQuestionType[] = quizCreationInfo.questions!.map((question) => question.id.toString() === questionFormId ? { ...question, answers: [value] } : question);
    updateQuizCreationInfo("questions", updatedQuestions);
  }

  const onClickAddQuizOptionItem = () => {
    // TODO: 코드 길이 리팩토링 필요
    const id:number = Date.now();
    const value:string = (options.length + 1).toString() ;

    setOptions((prev) => [
      ...prev,
      {
        id: id,
        value: value,
        label: "",
      },
    ]);

    const updatedQuestions = quizCreationInfo.questions!.map((question) => {
      if (question.id.toString() === questionFormId!) {
        return {
          ...question,
          selectOptions: [
            ...question.selectOptions,
            { id: id, option: "", value: value},
          ],
        };
      }
      return question;
    });

  updateQuizCreationInfo("questions",updatedQuestions);
  };

  return (
    <fieldset className={styles["question-options"]}>
      <legend>답안 선택지</legend>
      {options.map((item) =>
        <SelectOptionMultipleChoice
          key={item.id}
          questionFormId={questionFormId!}
          option={item}
          deleteOption={deleteOption}
          focusedOptionIndex={focusedOptionIndex}
          handleOptionFocus={handleOptionFocus}
          handleOptionBlur={handleOptionBlur}
          quizMode={questionFormMode!}
          onChange={handleRadioGroupChange}
          setText={setText}
          selectedValue={selectedRadioGroupValue}
        />,
      )}
      {
        questionFormMode == QuestionFormMode.QUESTION &&
        <AddOptionButton onAdd={onClickAddQuizOptionItem} />
      }
    </fieldset>
  );
};


function AddOptionButton({ onAdd }: { onAdd: () => void }) {

  return (
    <div className={styles["option-add-button-container"]}>
      <button
        className={styles["option-add-button"]}
        onClick={onAdd}>
        <div className={styles["option-add-button-check-circle"]} />
        <span>옵션 추가하기</span>
      </button>
    </div>
  );
}
