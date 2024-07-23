import React, { ReactNode } from "react";
import styles from "../../styles/components/_button.module.scss";

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
  size?: "large" | "medium" | "small";
  mode?: "default" | "error";
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className: customClassName,
  disabled = false,
  size = "medium",
}) => {
  const className = `${styles.button} ${styles[`button--${size}`]} ${
    customClassName || ""
  }`;
  return (
    <button onClick={onClick} className={className} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
