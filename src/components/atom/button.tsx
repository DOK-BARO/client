import React, { ReactNode } from "react";
import styles from "../../styles/components/_button.module.scss";

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
  size?: "large" | "medium" | "small";
  mode?: "default" | "error";
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  size = "medium",
}) => {
  const className = `${styles.button} ${styles[`button--${size}`]}`;
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
};

export default Button;
