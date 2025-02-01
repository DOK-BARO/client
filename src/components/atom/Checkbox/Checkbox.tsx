import React from "react";
import styles from "./_checkbox.module.scss";
import { Close } from "@/svg/Close";
import { gray90 } from "@/styles/abstracts/colors";
import Textarea from "../Textarea/Textarea";
import Button from "../Button/Button";

export type CheckboxStatusType =
  | "checkbox-writing" // '퀴즈 작성'화면에서 텍스트를 작성 중인 경우
  | "checkbox-written" // '퀴즈 작성'화면에서 텍스트를 작성하지 않는 경우
  | "checkbox-default" // '문제풀기'화면에서 기본
  | "checkbox-correct" // '퀴즈 작성'화면에서 정답으로 선택된 경우
  | "checkbox-selected" // '문제풀기'화면에서 선택된 경우
  | "solving-correct" // '문제풀기'화면에서 채점시 정답
  | "solving-incorrect" // '문제풀기'화면에서 채점시 오답
  | "checkbox-black"; // 퀴즈 신고하기
interface CheckBoxProps {
  id: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: CheckboxStatusType;
  disabled?: boolean;
  className?: string;
  value: string;
  onLabelValueChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  deleteOption?: (id: number) => void;
  textAreaRef?: React.RefObject<HTMLTextAreaElement>;
  onFocus?: () => void;
  onBlur?: () => void;
  fullWidth?: boolean;
}

export default function CheckBox({
  id,
  checked,
  type = "checkbox-default",
  onChange,
  value,
  onLabelValueChange = () => {},
  deleteOption = () => {},
  fullWidth,
  textAreaRef,
  onFocus = () => {},
  onBlur = () => {},
  disabled,
}: CheckBoxProps) {
  const optionMaxLength = 500;

  const containerClassName = `
	${styles["option-container"]}
	${fullWidth ? styles["full"] : ""}
	${styles[type]}
  ${checked ? styles["checked-focused-color"] : styles["focused-color"]}
	`;

  return (
    <div
      key={id}
      className={containerClassName}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        value={value}
      />
      <label
        className={styles["option-label"]}
        htmlFor={
          type === "checkbox-default" || type === "checkbox-selected"
            ? id.toString()
            : undefined
        }
      >
        {(type === "checkbox-writing" ||
          type === "checkbox-written" ||
          type === "checkbox-correct") && (
          <Textarea
            id={id}
            value={value}
            onChange={onLabelValueChange}
            className={styles["option-label-textarea"]}
            maxLength={optionMaxLength}
            textAreaRef={textAreaRef}
            type={"option-label"}
            autoFocus
            fullWidth
            onKeyDown={(e) => {
              e.stopPropagation();
            }}
          />
        )}
        {(type === "checkbox-default" ||
          type === "checkbox-selected" ||
          type === "solving-correct" ||
          type === "solving-incorrect") && (
          <div className={styles["option-label-value"]}>{value}</div>
        )}
        <Button
          className={
            styles[type === "checkbox-writing" ? "visible" : "invisible"]
          }
          onClick={() => {
            deleteOption(parseInt(id));
          }}
          icon={
            <Close
              width={20}
              height={20}
              stroke={gray90}
              strokeWidth={2}
              alt="옵션 삭제하기"
            />
          }
          iconOnly
        />

        {type !== "checkbox-writing" && (
          <div className={styles["empty-icon"]}></div>
        )}
      </label>
    </div>
  );
}
