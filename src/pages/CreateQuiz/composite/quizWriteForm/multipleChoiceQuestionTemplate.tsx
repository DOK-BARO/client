import styles from "@/pages/CreateQuiz/composite/quizWriteForm/_quiz_write_form_item.module.scss";
import SelectOptionMultipleChoice from "@/pages/CreateQuiz/composite/quizWriteForm/selectOptionMultipleChoice";
import { FC, useEffect } from "react";
import { QuestionFormMode } from "@/data/constants.ts";
import useRadioGroup from "@/hooks/useRadioGroup.ts";
import { QuizQuestionType } from "@/types/QuizType";
import useUpdateQuizCreationInfo from "@/hooks/useUpdateQuizCreationInfo";
import { useQuestionTemplate } from "@/hooks/useQuestionTemplate";

export const MultipleChoiceQuestionTemplate: FC<{ questionFormMode?: string, questionFormId?: string }> = ({ questionFormMode, questionFormId }) => {
  const { quizCreationInfo, updateQuizCreationInfo } = useUpdateQuizCreationInfo();

  const { 
    options,
    setOptions,
    focusedOptionIndex,
    setFocusedOptionIndex,
    deleteOption,
    onClickAddQuizOptionItem,
    getQuestion,
    } = useQuestionTemplate("MULTIPLE_CHOICE",questionFormId!);

  const setInitialAnswer = (): string => {
    const question = getQuestion();
    return question.answers[0];
  }
  const { selectedValue: selectedRadioGroupValue, handleChange: onRadioGroupChange } = useRadioGroup(setInitialAnswer());

  const handleOptionFocus = (id: number) => {
    setFocusedOptionIndex(id);
  };

  useEffect(() => {
    console.log("questionFormMode:",questionFormMode);
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

    const updatedQuestions: QuizQuestionType[] = quizCreationInfo.questions!.map((question) => question.id.toString() === questionFormId ? { ...question, answers: [value] } : question);
    updateQuizCreationInfo("questions", updatedQuestions);
  }

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
