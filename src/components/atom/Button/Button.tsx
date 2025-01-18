import React, { ReactNode } from "react";
import styles from "./_button.module.scss";
export type ButtonColorProps =
  | "primary"
  | "secondary"
  | "primary-border"
  | "black"
  | "white"
  | "transparent"
  | "red";
interface ButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
  id?: string;
  type?: "button" | "submit" | "reset";
  size?: "xsmall" | "small" | "medium" | "large" | "xlarge";
  mode?: "default" | "error";
  color?: ButtonColorProps;
  disabled?: boolean;
  className?: string;
  value?: string;
  icon?: JSX.Element;
  iconPosition?: string; // left, right
  onIconClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  fullWidth?: boolean;
  iconOnly?: boolean;
  ableAnimation?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      onClick = () => {},
      children,
      id,
      type = "button",
      className: customClassName,
      disabled = false,
      size = "medium",
      value,
      icon,
      iconPosition = "right",
      onIconClick,
      color,
      fullWidth = false,
      iconOnly = false,
      ableAnimation = false,
    },
    ref,
  ) => {
    const className = `${styles.button} ${styles[`button--${size}`]} ${
      styles[`button--${color}`]
    } ${fullWidth ? styles.full : ""} ${iconOnly ? styles.iconOnly : ""}
     ${customClassName || ""}
     ${styles[ableAnimation && !disabled ? "button--abled-animation" : ""]}
 `;
    return (
      <button
        id={id}
        type={type}
        value={value}
        // aria-label={}
        onClick={(e) => onClick(e)}
        className={className}
        disabled={disabled}
        ref={ref}
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
  },
);

export default Button;
