import React, { ReactNode } from "react";
import styles from "../../styles/components/_button.module.scss";

interface ButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
  id?: string;
  size?: "xsmall" | "small" | "medium" | "large" | "xlarge";
  mode?: "default" | "error";
  disabled?: boolean;
  className?: string;
  value?: string;
  icon?: JSX.Element;
  iconPosition?: string; // left, right
  onIconClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  id,
  className: customClassName,
  disabled = false,
  size = "medium",
  value,
  icon,
  iconPosition = "right",
  onIconClick,
}) => {
  const className = `${styles.button} ${styles[`button--${size}`]} ${
    customClassName || ""
  }`;
  return (
    <button
      id={id}
      type="button"
      value={value}
      onClick={(e) => onClick(e)}
      className={className}
      disabled={disabled}
    >
      {icon && iconPosition === "left" && (
        <div
          className={styles["icon-container"]}
          onClick={(e) => {
            onIconClick ? onIconClick(e) : null;
          }}
        >
          {icon}
        </div>
      )}
      {children}
      {icon && iconPosition === "right" && (
        <div
          className={styles["icon-container"]}
          onClick={(e) => {
            onIconClick ? onIconClick(e) : null;
          }}
        >
          {icon}
        </div>
      )}
    </button>
  );
};

export default Button;
