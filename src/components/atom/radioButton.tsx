import { RadioButtonProps, RadioOptions } from "../../types/RadioTypes.ts";
import React from "react";
import styles from "../../styles/components/_radio_button.module.scss";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { danger50, success50 } from "../../styles/abstracts/colors.ts";

const RadioButton: React.FC<RadioButtonProps> = ({
  options,
  selectedValue,
  onChange,
  correctOption,
  isDisabled,
}) => {
  const getClassNameAndIcon = (optionValue: string) => {
    const isCorrect = correctOption === optionValue; // 정답인 항목
    const isSelected = selectedValue === optionValue; // 선택된 항목

    // 선택된 항목의 경우 정답 or 오답에 따른 분기 스타일링
    if (isSelected) {
      return {
        className: isCorrect
          ? "radio-button-item-corrected"
          : "radio-button-item-wrong",
        icon: isCorrect ? (
          <CheckIcon style={{ color: success50 }} />
        ) : (
          <CloseIcon style={{ color: danger50 }} />
        ),
      };
    }
    // 선택되지 않은 항목이라면 따로 스타일링 x
    return { className: "radio-button-item", icon: null };
  };

  return (
    <div className={styles["radio-button-container"]}>
      {options.map((option: RadioOptions) => {
        const { className, icon } = getClassNameAndIcon(option.value);

        return (
          <label key={option.value} className={styles[className]}>
            <div className={styles["radio-button"]}>
              <input
                type="radio"
                name="radio-group"
                value={option.value}
                checked={selectedValue === option.value}
                onChange={() => onChange(option.value)}
                disabled={isDisabled}
              />
              {option.label}
            </div>
            <div className={styles["radio-button-item-icon"]}>{icon}</div>
          </label>
        );
      })}
    </div>
  );
};

export default RadioButton;
