import styles from "./_checkbox.module.scss";
import React, { ReactNode } from "react";
//TODO: 제거예정
interface CheckBoxProps {
  id: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  borderColor?: string;
  disabled?: boolean;
  className?: string;
  autoFocus?: boolean;
  value?:string;
  LabelComponent: ReactNode;
}

export default function CheckBox({
  id,
  checked,
  onChange,
  disabled,
  autoFocus = false,
  value,
  LabelComponent,
}: CheckBoxProps) {
  const className = `
  ${styles.label} ${styles["outlined"]}
  `
  return (
    <div className={styles.container}>
      <input
        id={id}
        className={styles.checkbox}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        autoFocus={autoFocus}
        value={value}
      />
      {/* TODO: for 또는 lable로 input을 감싸는 방식+ children으로 구현 변경 */}
      <label className={className} htmlFor={id}>
        <div className={styles["checkbox-container"]}>
          <div className={styles["square"]}/>
        </div>
        <div className={styles["radio-button-label"]}>{LabelComponent}</div>
      </label>
    </div>
  );
}
