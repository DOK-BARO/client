import useInput from "@/hooks/useInput.ts";
import React from "react";
import styles from "./_quiz_write_form_option_item.module.scss";
import { Close } from "@/svg/close.tsx";
import { gray90 } from "@/styles/abstracts/colors.ts";
import CheckBox from "../../atom/checkBox/checkBox";
import { CheckBoxOption } from "@/types/CheckBoxTypes.ts";
import useUpdateQuizCreationInfo from "@/hooks/useUpdateQuizCreationInfo";
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
  questionFormId: string;
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
  questionFormId,
  checked,
}: QuizCheckBoxOptionItemProps) {
  const { onChange: onOptionChange, value: optionText } = useInput(option.label); // input임
  const { quizCreationInfo, updateQuizCreationInfo } = useUpdateQuizCreationInfo();

  const onTextAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onOptionChange(e);
    setText(option.id, e.target.value);

    const updatedQuestions = quizCreationInfo.questions?.map((question) => {
      if (question.id.toString() === questionFormId!) {
        return {
          ...question,
          selectOptions: 
          question.selectOptions.map((selectOption) => {
              if(selectOption.id === option.id) {
                return {...selectOption, option: e.target.value};
              }
              return selectOption;
          })
        };
      }
      return question;
    }) ?? [];

    updateQuizCreationInfo("questions",updatedQuestions);
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
        value={option.value}
        LabelComponent={
          disabled ?
          //TODO: for속성 사용 고려 (chekbox와 일치시킬 수 있음)
            <input
              disabled={!disabled}
              id={`${option.id}`}
              name={"checkbox-group"}
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