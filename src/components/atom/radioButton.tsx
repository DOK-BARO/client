import { RadioButtonProps, RadioOptions } from "../../types/RadioTypes.ts";
import React from "react";
import styles from "../../styles/components/_radio_button.module.scss";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const RadioButton: React.FC<RadioButtonProps> = ({ options, selectedValue, onChange , correctOption, isDisabled }) => {
  return (
    <div className={styles["radio-button-container"]}>
      {options.map((option: RadioOptions) => {
        let radioButtonClassName = "radio-button-item";
        let itemIcon;
        if(selectedValue && correctOption && correctOption == option.value){
          radioButtonClassName = "radio-button-item-corrected";
          itemIcon = <CheckIcon style={{ color: "#1DCC00" }}/>;
        }

        if(correctOption && selectedValue == option.value && correctOption != option.value){
          radioButtonClassName = "radio-button-item-wrong";
          itemIcon = <CloseIcon style={{ color: "#eb003b" }}/>;
        }

        return (  
          <label key={option.value} className={styles[radioButtonClassName]}>
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
            <div className={styles["radio-button-item-icon"]}>
              { itemIcon }
            </div>
          </label>);
      })}
    </div>
  );
};

export default RadioButton;