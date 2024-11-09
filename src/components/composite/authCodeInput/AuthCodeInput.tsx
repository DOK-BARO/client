import React from "react";
import styles from "./_auth_code_input.module.scss";
import Input from "@/components/atom/input/input";
import { XSmall } from "@/svg/xSmall";
import { systemDanger } from "@/styles/abstracts/colors";

interface AuthCodeInputProps {
  code: string[];
  isMatch: boolean;
  handleCodeChange: (e: React.ChangeEvent<HTMLInputElement>, i: number) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, i: number) => void;
  borderColor: "default" | "black";
}
export default function AuthCodeInput({
  code,
  isMatch,
  handleCodeChange,
  handleKeyDown,
  borderColor,
}: AuthCodeInputProps) {
  return (
    <div className={styles["code-input-message-container"]}>
      <div className={styles["code-input-container"]}>
        {code.map((digit, i) => (
          <Input
            size="large"
            key={i}
            id={`code-input-${i}`}
            value={digit}
            onChange={(e) => handleCodeChange(e, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            maxLength={1}
            color={borderColor}
            isError={isMatch === false}
            className={styles["code-input"]}
          />
        ))}
      </div>
      {isMatch === false ? (
        <span className={styles["message-container"]}>
          <p>인증 코드가 일치하지 않습니다.</p>
          <XSmall stroke={systemDanger} width={20} height={20} />
        </span>
      ) : (
        <></>
      )}
    </div>
  );
}
