import styles from "./_register_complete.module.scss";
import src from "/assets/image/register-complete.png";
import Input from "@/components/atom/input/input";
import Button from "@/components/atom/button/button";
import useInput from "@/hooks/useInput";
import { RegisterInfoAtom } from "@/store/userAtom";
import { RegisterInfoType } from "@/types/UserType";
import { useAtom } from "jotai";
import { APP_NAME } from "@/data/constants";
import { studyService } from "@/services/server/studyService";
import { useEffect } from "react";

export default function RegisterComplete() {
  const [user] = useAtom<RegisterInfoType>(RegisterInfoAtom);

  const { value: inviteCode, onChange: handleInviteCodeChange } = useInput("");

  // 초대코드로 스터디 참여
  const handleInviteCodeSubmit = async () => {
    console.log(inviteCode);
    await studyService.joinStudyGroup(inviteCode);
  };

  useEffect(() => {
    localStorage.removeItem("registerStep");
  }, []);

  return (
    <section className={styles["register-complete"]}>
      <h3>회원가입 완료</h3>
      <div className={styles["container"]}>
        <img src={src} alt="회원가입 환영 이미지" height={500} />
        <div className={styles["welcome-text"]}>
          <p className={styles.greeting}>
            반갑습니다 <em>{user.nickname}</em> 님!
          </p>
          <p className={styles.description}>
            {APP_NAME}와 함께 퀴즈를 풀어보세요.
          </p>
          <section className={styles["invite-code"]}>
            <h4>초대 코드 입력</h4>
            <p>초대받은 스터디가 있나요?</p>
            <div className={styles["invite-code-input-container"]}>
              <Input
                fullWidth
                placeholder="초대코드 입력"
                id="invite-code"
                className={styles["invite-code"]}
                onChange={handleInviteCodeChange}
                value={inviteCode}
                size="medium"
                color="default"
              />
              <Button
                color="primary"
                size="medium"
                onClick={handleInviteCodeSubmit}
              >
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
