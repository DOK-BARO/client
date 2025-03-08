import styles from "./_password_validation_message.module.scss";
import { gray40, systemSuccess } from "@/styles/abstracts/colors";
import { Check } from "@/svg/Check";
// TODO: passwordset 공통코드 제거

interface Props {
  passwordValidations: {
    [key: string]: boolean;
  };
}

export default function PasswordValidationMessage({
  passwordValidations,
}: Props) {
  return (
    <div className={styles["password-message-container"]}>
      {Object.entries(passwordValidations).map(([key, isValid]) => (
        <span key={key} className={styles["icon-container"]}>
          <p style={{ color: isValid ? systemSuccess : gray40 }}>{key}</p>
          <Check
            alt=""
            width={20}
            height={20}
            stroke={isValid ? systemSuccess : gray40}
          />
        </span>
      ))}
    </div>
  );
}
