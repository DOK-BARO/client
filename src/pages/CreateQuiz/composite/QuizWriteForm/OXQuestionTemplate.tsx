import RadioOption from "@/components/atom/RadioOption/RadioOption";
import useRadioGroup from "@/hooks/useRadioGroup.ts";
import { RadioOptionType } from "@/types/RadioTypes.ts";
import { FC } from "react";
import styles from "./_question_form.module.scss";
import useUpdateQuizCreationInfo from "@/hooks/useUpdateQuizCreationInfo";
import { useQuestionTemplate } from "@/hooks/useQuestionTemplate";

export const OXQuestionTemplate: FC<{
  questionFormId?: string;
}> = ({ questionFormId }) => {
  const options: RadioOptionType[] = [
    {
      id: 1,
      value: "O",
      label: "O",
    },
    {
      id: 2,
      value: "X",
      label: "X",
    },
  ];

  const { quizCreationInfo, updateQuizCreationInfo } =
    useUpdateQuizCreationInfo();
  const { getQuestion } = useQuestionTemplate("OX", questionFormId!);

  const setInitialAnswer = (): string => {
    const question = getQuestion();
    return question.answers[0];
  };

  const {
    selectedValue: selectedRadioGroupValue,
    handleChange: onRadioGroupChange,
  } = useRadioGroup(setInitialAnswer());

  const handleRadioGroupChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    onRadioGroupChange(event);

    const updatedQuestions =
      quizCreationInfo.questions?.map((question) =>
        question.id.toString() === questionFormId
          ? { ...question, answers: [value] }
          : question,
      ) ?? [];
    updateQuizCreationInfo("questions", updatedQuestions);
  };

  return (
    <fieldset className={styles["question-options"]}>
      <legend className={styles["sr-only"]}>답안 선택지</legend>
      {options.map((option) => {
        const isChecked = selectedRadioGroupValue === option.label;
        return (
          <div key={option.id} className={styles["option-container"]}>
            <RadioOption
              radioGroupName={questionFormId!.toString()}
              option={option}
              checked={isChecked}
              onChange={handleRadioGroupChange}
              disabled={false}
              labelValue={option.value}
              type={isChecked ? "option-correct" : "option-written"}
              customClassName={"ox-option"}
              textareaDisabled
              showDeleteBtn={false}
            />
          </div>
        );
      })}
    </fieldset>
  );
};
