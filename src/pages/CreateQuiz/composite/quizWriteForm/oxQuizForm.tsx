import RadioButton from "@/components/atom/radioButton/radioButton.tsx";
import { QuizFormMode } from "@/data/constants.ts";
import useRadioGroup from "@/hooks/useRadioGroup.ts";
import { RadioOption } from "@/types/RadioTypes.ts";
import { FC, useState, useEffect } from "react";
import styles from "./_ox_quiz_form.module.scss";

export const OXQuizForm: FC<{ quizMode?: string, questionFormId?: string }> = ({ quizMode, questionFormId }) => { // TODO: props 만들기 (multipleChoiceQuizForm.tsx랑 겹침)

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
  const { selectedValue: selectedRadioGroupValue, handleChange: handleRadioGroupChange } = useRadioGroup(null);
  const disabled: boolean = quizMode === QuizFormMode.QUESTION;
  const [focusedOptionIndex, setFocusedOptionIndex] = useState<number | null>(null);

  useEffect(() => {
    handleRadioGroupChange(null);
  }, [quizMode]);

  const handleOptionFocus = (id: number) => {
    setFocusedOptionIndex(id);
  };

  const handleOptionBlur = () => {
    setFocusedOptionIndex(null);
  };

  return (
    <fieldset className={styles["question-options"]}>
      <legend>답안 선택지</legend>
      {
        options.map((option) =>
          <div
            key={option.id}
            className={`${styles["option-container"]} 
            ${focusedOptionIndex === option.id && ( quizMode === QuizFormMode.QUESTION ) ? styles["focused"] : ""} 
            ${selectedRadioGroupValue === option.label && ( quizMode === QuizFormMode.ANSWER ) ? styles["checked"] : styles["notchecked"]}`}
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