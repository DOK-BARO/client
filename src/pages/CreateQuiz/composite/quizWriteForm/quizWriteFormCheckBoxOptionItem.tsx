import useInput from "@/hooks/useInput.ts";
import React from "react";
import styles from "./_quiz_write_form_option_item.module.scss";
import { Close } from "@/svg/close.tsx";
import { gray90 } from "@/styles/abstracts/colors.ts";
import CheckBox from "../../atom/checkBox/checkBox";
import { CheckBoxOption } from "@/types/CheckBoxTypes.ts";
// TODO: multipleChoiceQuizForm과 겹치는 부분 리팩토링 필요

interface QuizCheckBoxOptionItemProps {
  option: CheckBoxOption;
  focusedOptionIndex: number | null;
  handleOptionFocus: (id: number) => void;
  handleOptionBlur: () => void;
  deleteOption: (id: number) => void;
  disabled: boolean;
  selectedValue: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setText: (optionId: number, value: string) => void;
  checked: boolean;
}

export default function QuizWriteFormCheckBoxOptionItem({
  option,
  focusedOptionIndex,
  deleteOption,
  handleOptionFocus,
  handleOptionBlur,
  disabled,
  onChange,
  setText,
  checked,
}: QuizCheckBoxOptionItemProps) {
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
      <CheckBox
        id={option.id.toString()}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
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