import React from "react";
import styles from "./_radio_option.module.scss";
import { RadioOptionType } from "@/types/RadioTypes";
import { Close } from "@/svg/Close";
import { gray90 } from "@/styles/abstracts/colors";
import Textarea from "@/components/atom/Textarea/Textarea";
import "highlight.js/styles/xcode.css";

export type OptionStatusType =
  | "option-writing" // '퀴즈 작성'화면에서 텍스트를 작성 중인 경우
  | "option-written" // '퀴즈 작성'화면에서 텍스트를 작성하지 않는 경우
  | "option-correct" // '퀴즈 작성'화면에서 정답으로 선택된 경우
  | "option-selected" // '문제풀기'화면에서 선택된 경우
  | "solving-correct" // '문제풀기'화면에서 채점시 정답
  | "solving-incorrect"; // '문제풀기'화면에서 채점시 오답
interface RadioOptionProps {
  option: RadioOptionType;
  type?: OptionStatusType;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  radioGroupName: string;
  disabled: boolean;
  textareaDisabled?: boolean;
  labelValue: string;
  onLabelValueChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  deleteOption?: (id: number) => void;
  textAreaRef?: React.RefObject<HTMLTextAreaElement>;
  onFocus?: () => void;
  onBlur?: () => void;
  customClassName?: string;
  fullWidth?: boolean;
}

const RadioOption: React.FC<RadioOptionProps> = ({
  option,
  type = "option-writing",
  checked,
  onChange,
  radioGroupName,
  disabled,
  labelValue,
  textareaDisabled = false,
  customClassName = "",
  onLabelValueChange = () => { },
  deleteOption = () => { },
  onFocus = () => { },
  onBlur = () => { },
  textAreaRef,
  fullWidth = false,
}) => {
  const optionMaxLength = 500;
  const containerClassName = `
			${styles["option-container"]}
			${fullWidth ? styles["full"] : ""}
      ${styles[type]}
      ${checked ? styles["checked-focused-color"] : styles["focused-color"]}
			`;
  return (
    <div
      key={option.id}
      className={containerClassName}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <input
        id={option.id.toString()}
        type="radio"
        name={radioGroupName}
        value={option.value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <label className={styles["option-label"]}>
        <Textarea
          id={`${option.id}`}
          value={labelValue}
          onChange={onLabelValueChange}
          className={`${styles["option-label-textarea"]} ${styles[customClassName]}`}
          maxLength={optionMaxLength}
          disabled={textareaDisabled}
          textAreaRef={textAreaRef}
          type="option-label"
          autoFocus
          fullWidth
        />
        {type === "option-writing" && (
          <button
            className={styles["delete-option-button"]}
            onClick={() => {
              deleteOption(option.id);
            }}
          >
            <Close width={20} height={20} stroke={gray90} strokeWidth={2} />
          </button>
        )}
        {type === "option-written" && (
          <div className={styles["empty-icon"]}></div>
        )}
      </label>
    </div>
  );
};

export default RadioOption;
