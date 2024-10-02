import styles from "./_checkbox.module.scss";
import React from "react";
import { Check } from "public/assets/svg/check.tsx";
import { gray0, gray40, primary } from "@/styles/abstracts/colors.ts";

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
  const className = `label-${isOutLined ? "outlined" : "none"}`;

  return (
    <div>
      <input
        id={id}
        className={styles["checkbox"]}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        required={required}
      />
      <label className={styles[className]} htmlFor={id}>
        <Check
          width={16}
          height={16}
          className={styles["check"]}
          stroke={
            isOutLined ? (checked ? gray0 : gray40) : checked ? primary : gray40
          }
        />
        {label}
      </label>
    </div>
  );
}
