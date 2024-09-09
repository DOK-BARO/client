import React from "react";
import styles from "../../styles/components/_input.module.scss";

interface InputProps {
  id: string;
  value: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  size?: "large" | "medium" | "small";
  message?: string;
  isError?: boolean;
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
  placeholder,
  size = "medium",
  message = "",
  isError = false,
  disabled = false,
  label,
  leftIcon,
  rightIcon,
}) => {
  const className = `${styles.input} ${styles[`input--${size}`]} ${
    isError ? styles["input--error"] : ""
  } ${leftIcon ? styles["input--left-icon"] : ""} ${
    rightIcon ? styles["input--right-icon"] : ""
  } ${customClassName || ""}`;

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
        <span className={styles[`message${isError ? "--error" : ""}`]}>
          {message}
        </span>
      )}
    </div>
  );
};

export default Input;
