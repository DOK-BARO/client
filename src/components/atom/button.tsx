import React, { ReactNode } from "react";
import styles from "../../styles/components/_button.module.scss";

interface ButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
  size?: "large" | "medium" | "small";
  mode?: "default" | "error";
  disabled?: boolean;
  className?: string;
  value?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className: customClassName,
  disabled = false,
  size = "medium",
  value,
}) => {
  const className = `${styles.button} ${styles[`button--${size}`]} ${
    customClassName || ""
  }`;
  return (
    <button
      value={value}
      onClick={(e) => onClick(e)}
      className={className}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
