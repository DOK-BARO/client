import styles from "../../../styles/composite/_profile_set.module.scss";
import src from "../../../../public/assets/image/register-complete.png";
import Input from "../../../components/atom/input";
import useInput from "../../../hooks/useInput";

export default function RegisterComplete() {
  const name = "독바로";
  const { value: inviteCode, onChange: onInviteCodeChange } = useInput("");
  return (
    <>
      <div className={styles["register-done-set"]}>
        <img src={src} alt="" height={500} />
        <p>반갑습니다 {name}님!</p>
        <p className={styles.description}>DOKBARO와 함께 퀴즈를 풀어보세요.</p>
        <p>초대 받은 스터디가 있나요?</p>
        <Input
          placeholder="초대코드 입력"
          id="invite-code"
          onChange={onInviteCodeChange}
          value={inviteCode}
        />
        <p>이번주 신규 퀴즈들이에요, 구경해보세요!</p>
      </div>
    </>
  );
}
