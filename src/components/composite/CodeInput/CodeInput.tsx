import React from "react";
import styles from "./_code_input.module.scss";
import Input from "@/components/atom/Input/Input";
import { XSmall } from "@/svg/XSmall";
import { systemDanger } from "@/styles/abstracts/colors";

interface Props {
  codeList: string[];
  isMatch: boolean;
  onCodeChange: (e: React.ChangeEvent<HTMLInputElement>, i: number) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, i: number) => void;
  borderColor: "default" | "black";
  errorMessage: string;
}
export default function CodeInput({
  codeList,
  isMatch,
  onCodeChange,
  onKeyDown,
  borderColor,
  errorMessage,
}: Props) {
  return (
    <div className={styles["code-input-message-container"]}>
      <div className={styles["code-input-container"]}>
        {codeList.map((digit, i) => (
          <Input
            fullWidth={false}
            size="medium"
            key={i}
            id={`code-input-${i}`}
            value={digit}
            onChange={(e) => onCodeChange(e, i)}
            onKeyDown={(e) => onKeyDown(e, i)}
            maxLength={1}
            color={borderColor}
            isError={!isMatch}
            className={styles["code-input"]}
          />
        ))}
      </div>
      {!isMatch ? (
        <span className={styles["message-container"]}>
          <XSmall stroke={systemDanger} width={20} height={20} />
          <p>{errorMessage}</p>
        </span>
      ) : (
        <></>
      )}
    </div>
  );
}
