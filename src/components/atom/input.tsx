import React from "react";
import styles from "../../styles/components/_input.module.scss";

interface InputProps {
  id: string;
  value: string;
  className?: string;
  type?: "text" | "number" | "password";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  size?: "large" | "medium" | "small";
  message?: string | JSX.Element;
  isError?: boolean;
  isSuccess?: boolean;
  disabled?: boolean;
  label?: string;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
}

const Input: React.FC<InputProps> = ({
  id,
  value,
  onChange,
  className: customClassName,
  type = "text",
  placeholder,
  size = "medium",
  message = "",
  isError = false,
  isSuccess = false,
  disabled = false,
  label,
  leftIcon,
  rightIcon,
}) => {
  const className = `${styles.input} ${styles[`input--${size}`]} ${
    isError ? styles["input--error"] : ""
  } ${isSuccess ? styles["input--success"] : ""} ${
    leftIcon ? styles["input--left-icon"] : ""
  } ${rightIcon ? styles["input--right-icon"] : ""} ${customClassName || ""}`;

  return (
    <div className={styles["container"]}>
      {label && (
        <label className={styles["label"]} htmlFor={id}>
          {label}
        </label>
      )}
      <div className={styles["input-wrapper"]}>
        {leftIcon && <span className={styles["icon-left"]}>{leftIcon}</span>}
        <input
          type={type}
          id={id}
          disabled={disabled}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={className}
        />
        {rightIcon && <span className={styles["icon-right"]}>{rightIcon}</span>}
      </div>
      {message && (
        <div
          className={
            styles[
              `message${isError ? "--error" : isSuccess ? "--success" : ""}`
            ]
          }
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default Input;
