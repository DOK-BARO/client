import React from "react";
import styles from "../../styles/components/input.module.scss";

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  size?: "large" | "medium" | "small";
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  size = "medium",
}) => {
  const className = `${styles.input} ${styles[`input--${size}`]}`;
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
    />
  );
};

export default Input;
