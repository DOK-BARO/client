import RadioButton from "@/components/atom/radioButton/radioButton.tsx";
import { QuestionFormMode } from "@/data/constants.ts";
import useRadioGroup from "@/hooks/useRadioGroup.ts";
import { RadioOption } from "@/types/RadioTypes.ts";
import { FC, useState, useEffect } from "react";
import styles from "./_ox_quiz_form.module.scss";
import { BookQuizQuestionType } from "@/types/BookQuizType";
import useUpdateQuizCreationInfo from "@/hooks/useUpdateQuizCreationInfo";

export const OXQuestionTemplate: FC<{ questionFormMode?: string, questionFormId?: string }> = ({ questionFormMode, questionFormId }) => { // TODO: props 만들기 (multipleChoiceQuizForm.tsx랑 겹침)

  const options: RadioOption[] = [{
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
  const getQuestion = () => (quizCreationInfo.questions?.find((question) => (question.id.toString() === questionFormId)) as BookQuizQuestionType);

  const setInitialAnswer = (): string => {
    const question = getQuestion();
    return question.answers[0];
  }
  
  const { selectedValue: selectedRadioGroupValue, handleChange: onRadioGroupChange } = useRadioGroup(setInitialAnswer());
  const disabled: boolean = questionFormMode === QuestionFormMode.QUESTION;
  const [focusedOptionIndex, setFocusedOptionIndex] = useState<number | null>(null);

  useEffect(() => {
    if (questionFormMode === QuestionFormMode.QUESTION) {
      onRadioGroupChange(null);
    } else {
      const question = getQuestion();
      onRadioGroupChange(question.answers[0]);
    }
  }, [questionFormMode]);

  const handleOptionFocus = (id: number) => {
    setFocusedOptionIndex(id);
  };

  const handleOptionBlur = () => {
    setFocusedOptionIndex(null);
  };

  const handleRadioGroupChange = (value: string) => {
    onRadioGroupChange(value);

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
            <RadioButton
              option={option}
              selectedValue={selectedRadioGroupValue}
              onChange={handleRadioGroupChange}
              isDisabled={disabled}
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