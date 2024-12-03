import { QuestionFormMode } from "@/data/constants.ts";
import RadioOption from "@/components/atom/radioOption/radioOption";
import useRadioGroup from "@/hooks/useRadioGroup.ts";
import { RadioOptionType } from "@/types/RadioTypes.ts";
import { FC, useEffect } from "react";
import styles from "./_question_form.module.scss";
import useUpdateQuizCreationInfo from "@/hooks/useUpdateQuizCreationInfo";
import { useQuestionTemplate } from "@/hooks/useQuestionTemplate";
import { ChangeEvent } from "react";

export const OXQuestionTemplate: FC<{ questionFormMode?: string, questionFormId?: string }> = ({ questionFormMode, questionFormId }) => {

  const options: RadioOptionType[] = [{
    id: 1,
    value: "O",
    label: "O",
  },
  {
    id: 2,
    value: "X",
    label: "X",
  }];

  const { quizCreationInfo, updateQuizCreationInfo } = useUpdateQuizCreationInfo();

  const { 
    focusedOptionIndex,
    setFocusedOptionIndex,
    getQuestion,
    } = useQuestionTemplate("OX",questionFormId!);

  const setInitialAnswer = (): string => {
    const question = getQuestion();
    return question.answers[0];
  }
  
  const { selectedValue: selectedRadioGroupValue, handleChange: onRadioGroupChange } = useRadioGroup(setInitialAnswer());
  const disabled: boolean = questionFormMode === QuestionFormMode.QUESTION;

  useEffect(() => {
    const question = getQuestion();
     // ChangeEvent 객체 생성
    const event: ChangeEvent<HTMLInputElement> = {
      target: {
          value: questionFormMode === QuestionFormMode.QUESTION ? "" : question.answers[0],
      },
  } as ChangeEvent<HTMLInputElement>;
  onRadioGroupChange(event);

  }, [questionFormMode]);

  const handleOptionFocus = (id: number) => {
    setFocusedOptionIndex(id);
  };

  const handleOptionBlur = () => {
    setFocusedOptionIndex(null);
  };

  const handleRadioGroupChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onRadioGroupChange(event);

    const updatedQuestions= quizCreationInfo.questions?.map((question) => question.id.toString() === questionFormId ? { ...question, answers: [value] } : question) ?? [];
    updateQuizCreationInfo("questions",updatedQuestions)
  }

  return (
    <fieldset className={styles["question-options"]}>
      <legend>답안 선택지</legend>
      {
        options.map((option) =>
          <div
            key={option.id}
            className={`${styles["option-container"]} 
            ${focusedOptionIndex === option.id && ( questionFormMode === QuestionFormMode.QUESTION ) ? styles["focused"] : ""} 
            ${selectedRadioGroupValue === option.label && ( questionFormMode === QuestionFormMode.ANSWER ) ? styles["checked"] : styles["notchecked"]}`}
            onFocus={() => handleOptionFocus(option.id)}
            onBlur={handleOptionBlur}
          >
            <RadioOption
              option={option}
              selectedValue={selectedRadioGroupValue}
              onChange={handleRadioGroupChange}
              disabled={disabled}
              autoFocus={true}
              radioGroupName={questionFormId?.toString()!}
              LabelComponent={
                <div className={`${styles["new-option-label"]}`}>{option.value}</div>
              }
            />
          </div>
        )}
    </fieldset>
  );
};