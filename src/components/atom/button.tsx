import React, { ReactNode } from "react";
import styles from "../../styles/components/_button.module.scss";

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
  size?: "large" | "medium" | "small";
  mode?: "default" | "error";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className: customClassName,
  size = "medium",
}) => {
  const className = `${styles.button} ${styles[`button--${size}`]} ${
    customClassName || ""
  }`;
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
};

export default Button;
