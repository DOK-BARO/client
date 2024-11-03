import { RadioOption } from "@/types/RadioTypes.ts";
import useInput from "@/hooks/useInput.ts";
import React from "react";
import styles from "./_quiz_write_form_option_item.module.scss";
import RadioButton from "@/components/atom/radioButton/radioButton.tsx";
import { Close } from "@/svg/close.tsx";
import { gray90 } from "@/styles/abstracts/colors.ts";

interface QuizOptionItemProps {
  option: RadioOption;
  focusedOptionIndex: number | null;
  handleOptionFocus: (id: number) => void;
  handleOptionBlur: () => void;
  deleteOption: (id: number) => void;
  disabled: boolean;
  selectedValue: string | null;
  onChange: (value: string) => void;
  setText: (optionId: number, value: string) => void;
  questionFormId: string;
}

export default function QuizWriteFormOptionItem({
  option,
  focusedOptionIndex,
  deleteOption,
  handleOptionFocus,
  handleOptionBlur,
  disabled,
  selectedValue,
  onChange,
  setText,
  questionFormId,
}: QuizOptionItemProps) {
  const { onChange: onOptionChange, value: optionText } = useInput(option.value); // input임

  const onTextAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onOptionChange(e);
    setText(option.id, e.target.value);
  };

  return (
    <div key={option.id}
      className={`${styles["option-container"]} ${focusedOptionIndex === option.id ? styles["focused"] : ""}`}
      onFocus={() => handleOptionFocus(option.id)}
      onBlur={handleOptionBlur}
    >
      <RadioButton
        radioGroupName={questionFormId}
        option={option}
        selectedValue={selectedValue}
        onChange={() => onChange(optionText)}
        isDisabled={disabled}
        className={`${styles["new-option"]} ${focusedOptionIndex === option.id ? styles["focused"] : ""}`}
        autoFocus={true}
        LabelComponent={
          disabled ?
            <input
              disabled={!disabled}
              id={`${option.id}`}
              name={"radio-group"}
              value={optionText}
              onChange={onTextAreaChange}
              className={`${styles["new-option-text-input"]} ${focusedOptionIndex === option.id ? styles["focused"] : ""}`}
              autoFocus
            /> :
            <div className={`${styles["new-option-label"]}`}>{optionText}</div>
        }
      />
      <button
        className={styles["delete-option-button"]}
        onClick={() => {
          deleteOption(option.id);
        }}
      >
        <Close width={20} height={20} stroke={gray90} strokeWidth={2}/>
      </button>
    </div>
  );
}