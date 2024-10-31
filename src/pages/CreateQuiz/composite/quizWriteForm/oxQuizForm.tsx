import styles from "./_ox_quiz_form.module.scss";
import { RadioOption } from "@/types/RadioTypes.ts";
import { FC, useState } from "react";
import { QuizFormMode } from "@/data/constants.ts";
import RadioButton from "@/components/atom/radioButton/radioButton.tsx";
import useRadioGroup from "@/hooks/useRadioGroup.ts";

export const OXQuizForm : FC<{quizMode?: string}> = ({ quizMode }) => {

  const options:RadioOption[] = [  {
    id: 1,
    value: "O",
    label: "O",
  },
  {
    id: 2,
    value: "X",
    label: "X",
  }];
  const { selectedValue: selectedRadioGroupValue, handleChange: handleRadioGroupChange } = useRadioGroup("");
  const disabled : boolean = quizMode === QuizFormMode.QUESTION;
  const [focusedOptionIndex, setFocusedOptionIndex] = useState<number | null>(null);

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
      className={`${styles["option-container"]} ${focusedOptionIndex === option.id ? styles["focused"] : ""}`}
      onFocus={() => handleOptionFocus(option.id)}
      onBlur={handleOptionBlur}
      >
        <RadioButton
          option={option}
          selectedValue={selectedRadioGroupValue}
          onChange={handleRadioGroupChange}
          isDisabled={disabled}
          autoFocus={true}
          LabelComponent={
            <div className={`${styles["new-option-label"]}`}>{option.value}</div>
          }
        />
        </div>
      )}
    </fieldset>
  );
};