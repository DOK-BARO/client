// 회원가입/로그인 용, 소셜 로그인 버튼과 다름
import React, { ReactNode } from "react";
import styles from "../../styles/components/_authButton.module.scss";

interface AuthButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
  mode?: "default" | "error";
  disabled?: boolean;
  className?: string;
  value?: string;
}

const AuthButton: React.FC<AuthButtonProps> = ({
  onClick,
  children,
  className: customClassName,
  disabled = false,
  value,
}) => {
  const className = `${styles["auth-button"]} ${customClassName || ""}`;
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

export default AuthButton;
