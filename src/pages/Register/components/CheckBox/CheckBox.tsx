import styles from "./_checkbox.module.scss";
import React, { ReactNode } from "react";
import { gray0, gray40, primary } from "@/styles/abstracts/colors.ts";
import { Check } from "@/svg/Check";

interface CheckBoxProps {
  id: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isOutLined?: boolean;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  autoFocus?: boolean;
  LabelComponent: ReactNode;
}

export default function CheckBox({
  id,
  checked,
  onChange,
  isOutLined = true,
  required,
  disabled,
  autoFocus = false,
  LabelComponent,
}: CheckBoxProps) {
  const className = `${styles.label} ${
    styles[isOutLined ? "outlined" : "none"]
  }`;

  return (
    <div className={styles.container}>
      <input
        id={id}
        className={styles.checkbox}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        required={required}
        autoFocus={autoFocus}
      />
      <label className={className} htmlFor={id}>
        <div className={styles["checkbox-container"]}>
          <Check
            width={20}
            height={20}
            stroke={
              isOutLined
                ? checked
                  ? gray0
                  : gray40
                : checked
                  ? primary
                  : gray40
            }
          />
        </div>
        <div className={styles["radio-button-label"]}>{LabelComponent}</div>
      </label>
    </div>
  );
}
