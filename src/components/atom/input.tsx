import React from "react";
import styles from "../../styles/components/_input.module.scss";

interface InputProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  size?: "large" | "medium" | "small";
  message?: string;
  isError?: boolean;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  value,
  onChange,
  placeholder,
  size = "medium",
  message = "",
  isError = false,
  disabled = false,
}) => {
  const className = `${styles.input} ${styles[`input--${size}`]} ${
    isError ? styles["input--error"] : ""
  }`;
  return (
    <div className={styles["container"]}>
      <label className={styles["label"]} htmlFor={id}>
        레이블
      </label>
      <input
        id={id}
        disabled={disabled}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={className}
      />
      <span className={styles[`message${isError ? "--error" : ""}`]}>
        {message}
      </span>
    </div>
  );
};

export default Input;
