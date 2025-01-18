import { XSmall } from "@/svg/XSmall";
import { Check } from "@/svg/Check";
import { systemSuccess } from "@/styles/abstracts/colors";
import { systemDanger } from "@/styles/abstracts/colors";
import styles from "./_password_match_check_message.module.scss";

export default function PasswordMatchCheckMessage({
  isPasswordMatched,
}: {
  isPasswordMatched: boolean;
}) {
  return (
    <span className={styles["password-check-message-container"]}>
      <p>{isPasswordMatched ? "비밀번호 일치" : "비밀번호 불일치"}</p>
      {isPasswordMatched ? (
        <Check stroke={systemSuccess} width={20} height={20} />
      ) : (
        <XSmall stroke={systemDanger} width={20} height={20} />
      )}
    </span>
  );
}
