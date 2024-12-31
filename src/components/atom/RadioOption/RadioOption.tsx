import React from "react";
import styles from "./_radio_option.module.scss";
import { RadioOptionType } from "@/types/RadioTypes";
import { Close } from "@/svg/Close";
import { gray90 } from "@/styles/abstracts/colors";
import correctIcon from "/assets/svg/common/correct.svg";
import incorrectIcon from "/assets/svg/common/incorrect.svg";
import Textarea from "@/components/atom/Textarea/Textarea";

export type OptionStatusType =
  | "option-writing"
  | "option-written"
  | "option-default"
  | "option-correct"
  | "option-incorrect"
  | "option-selected"
  | "option-add"
  | "solving-correct"
  | "solving-incorrect";
interface RadioOptionProps {
  option: RadioOptionType;
  type?: OptionStatusType;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  radioGroupName: string;
  disabled: boolean;
  labelValue: string;
  onLabelValueChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  deleteOption?: (id: number) => void;
  textAreaRef?: React.RefObject<HTMLTextAreaElement>;
  fullWidth?: boolean;
}

const RadioOption: React.FC<RadioOptionProps> = ({
  option,
  type = "option-default",
  checked,
  onChange,
  radioGroupName,
  disabled,
  labelValue,
  onLabelValueChange = () => {},
  deleteOption = () => {},
  textAreaRef,
  fullWidth = false,
}) => {
  const optionMaxLength = 500;

  const containerClassName = `
			${styles["option-container"]}
			${fullWidth ? styles["full"] : ""}
			${styles[type]}
			`;

  const icon = () => {
    if (type) {
      if (type === "option-correct") {
        return <img src={correctIcon} alt="정답인 선지입니다" />;
      } else if (type === "option-incorrect") {
        return <img src={incorrectIcon} alt="오답인 선지입니다" />;
      } else {
        return null;
      }
    }
  };

  return (
    <div key={option.id} className={containerClassName}>
      <label className={styles["option-label"]}>
        <input
          id={option.id.toString()}
          type="radio"
          name={radioGroupName}
          value={option.value}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />
        {type === "option-writing" ? (
          <Textarea
            id={`${option.id}`}
            value={labelValue}
            onChange={onLabelValueChange}
            className={styles["option-label-textarea"]}
            maxLength={optionMaxLength}
            textAreaRef={textAreaRef}
            type="option-label"
            autoFocus
            fullWidth
          />
        ) : (
          <div className={`${styles["option-label-value"]}`}>{labelValue}</div>
        )}

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
        {icon() && <div>{icon()}</div>}
        {type === "option-written" && (
          <div className={styles["empty-icon"]}></div>
        )}
      </label>
    </div>
  );
};

export default RadioOption;
