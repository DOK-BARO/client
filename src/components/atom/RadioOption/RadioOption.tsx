import React from "react";
import styles from "./_radio_option.module.scss";
import { RadioOptionType } from "@/types/RadioTypes";
import { Close } from "@/svg/Close";
import { gray90 } from "@/styles/abstracts/colors";
import Textarea from "@/components/atom/Textarea/Textarea";
import "highlight.js/styles/xcode.css";
import Button from "../Button/Button";
import { isFirstVisitAtom, quizGuideStepAtom } from "@/store/quizAtom";
import { useAtom } from "jotai";
import { useState } from "react";
export type OptionStatusType =
  | "option-writing" // '퀴즈 작성'화면에서 텍스트를 작성 중인 경우
  | "option-written" // '퀴즈 작성'화면에서 텍스트를 작성하지 않는 경우
  | "option-default" // '문제풀기'화면에서 기본
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
  showDeleteBtn?: boolean;
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
  onLabelValueChange = () => {},
  deleteOption = () => {},
  onFocus = () => {},
  onBlur = () => {},
  textAreaRef,
  fullWidth = false,
  showDeleteBtn = true,
}) => {
  const optionMaxLength = 500;
  const [isTextAreaFocus, setIsTextAreaFocus] = useState(false);
  const containerClassName = `
			${styles["option-container"]}
			${fullWidth ? styles["full"] : ""}
      ${styles[type]}
      ${checked ? styles["checked-focused-color"] : isTextAreaFocus ? styles["focused-color"] : ""}
			`;
  const [isFirstVisit] = useAtom(isFirstVisitAtom);
  const [currentQuizGuideStep] = useAtom(quizGuideStepAtom);

  const handleTextAreaFocus = () => {
    setIsTextAreaFocus(true);
  };
  const handleTextAreaBlur = () => {
    setIsTextAreaFocus(false);
  };
  const isEditMode =
    localStorage.getItem("isEditMode") == "true" ? true : false;
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
      <label
        className={styles["option-label"]}
        htmlFor={
          type === "option-default" || type === "option-selected"
            ? option.id.toString()
            : undefined
        }
      >
        {(type === "option-writing" ||
          type === "option-written" ||
          type === "option-correct") && (
          <Textarea
            id={`${option.id}`}
            value={labelValue}
            onChange={onLabelValueChange}
            className={`${styles["option-label-textarea"]} ${styles[customClassName]}`}
            maxLength={optionMaxLength}
            disabled={
              (isFirstVisit && !isEditMode && currentQuizGuideStep == 2) ||
              textareaDisabled
            }
            textAreaRef={textAreaRef}
            onFocus={handleTextAreaFocus}
            onBlur={handleTextAreaBlur}
            type="option-label"
            autoFocus
            fullWidth
            onKeyDown={(e) => {
              e.stopPropagation();
            }}
          />
        )}

        {(type === "option-default" ||
          type === "option-selected" ||
          type === "solving-correct" ||
          type === "solving-incorrect") && (
          <div className={styles["option-label-value"]}>{labelValue}</div>
        )}

        {(type === "option-writing" ||
          type === "option-correct" ||
          type === "option-written") &&
          showDeleteBtn && (
            <Button
              iconOnly
              icon={
                <Close
                  alt="옵션 삭제하기"
                  width={20}
                  height={20}
                  stroke={type === "option-writing" ? gray70 : gray40}
                  strokeWidth={2}
                />
              }
              onClick={() => {
                deleteOption(option.id);
              }}
              disabled={
                isFirstVisit && !isEditMode && currentQuizGuideStep == 2
              }
            />
          )}
      </label>
    </div>
  );
};

export default RadioOption;
