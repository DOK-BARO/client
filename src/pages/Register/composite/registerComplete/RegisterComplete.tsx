import styles from "./_register_complete.module.scss";
import src from "/assets/image/register-complete.png";
import Input from "@/components/atom/input/input";
import Button from "@/components/atom/button/button";
import useInput from "@/hooks/useInput";

export default function RegisterComplete() {
  const name = "독바로";
  const { value: inviteCode, onChange: onInviteCodeChange } = useInput("");
  const onInviteCodeSubmit = () => {
    console.log(inviteCode);
  };
  return (
    <section className={styles["register-complete"]}>
      <h3>회원가입 완료</h3>
      <div className={styles["container"]}>
        <img src={src} alt="" height={500} />
        <div className={styles["welcome-text"]}>
          <p className={styles.greeting}>
            반갑습니다 <em>{name}</em> 님!
          </p>
          <p className={styles.description}>
            DOKBARO와 함께 퀴즈를 풀어보세요.
          </p>
          <section className={styles["invite-code"]}>
            <h4>초대 코드 입력</h4>
            <p>초대 받은 스터디가 있나요?</p>
            <div className={styles["invite-code-input-container"]}>
              <Input
                // fullWidth
                placeholder="초대코드 입력"
                id="invite-code"
                className={styles["invite-code"]}
                onChange={onInviteCodeChange}
                value={inviteCode}
                size="large"
                color="default"
              />
              <Button color="primary" size="large" onClick={onInviteCodeSubmit}>
                입력
              </Button>
            </div>
          </section>
          <section className={styles["new-quiz"]}>
            <h4>이번주 신규 퀴즈</h4>
            <p>이번주 신규 퀴즈들이에요, 구경해보세요!</p>
            <div className={styles["new-quiz-container"]}>신규 퀴즈 리스트</div>
          </section>
        </div>
      </div>
    </section>
  );
}
