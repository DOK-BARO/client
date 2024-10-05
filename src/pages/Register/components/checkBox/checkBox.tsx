import styles from "./_checkbox.module.scss";
import React from "react";
import { gray0, gray40, primary } from "@/styles/abstracts/colors.ts";
import { Check } from "@/svg/check";

interface CheckBoxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isOutLined: boolean;
  required?: boolean;
}

export default function CheckBox({
  id,
  label,
  checked,
  onChange,
  isOutLined,
  required,
}: CheckBoxProps) {
  const className = `${styles.label} ${
    styles[isOutLined ? "outlined" : "none"]
  }`;
  console.log(isOutLined, checked);

  return (
    <div className={styles.container}>
      <input
        id={id}
        className={styles.checkbox}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        required={required}
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
        {label}
      </label>
    </div>
  );
}
