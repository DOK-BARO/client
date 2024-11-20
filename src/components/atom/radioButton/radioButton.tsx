import { RadioButtonProps } from "@/types/RadioTypes.ts";
import React from "react";
import styles from "./_radio_button.module.scss";

const RadioButton: React.FC<RadioButtonProps> = ({
  option,
  selectedValue,
  onChange,
  isDisabled,
  className,
  autoFocus= false,
  icon,
  radioGroupName,
  LabelComponent,
}) => {
  return (
    <div className={styles["radio-button-container"]}>
      <label key={option.value} className={`${styles["radio-button-item"]} ${styles[className ?? ""]}`}>
        <div className={styles["radio-button"]}>
          <input
            type="radio"
            name={radioGroupName}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={onChange}
            disabled={isDisabled}
            autoFocus={autoFocus}
          />
          <div className={styles["radio-button-label"]}>{ LabelComponent }</div>
        </div>
        {
          icon &&
          <div className={styles["radio-button-item-icon"]}>{icon}</div>
        }
      </label>
    </div>
  );
};

export default RadioButton;