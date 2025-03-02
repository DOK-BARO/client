import styles from "./_register_complete.module.scss";
import registerCompleteImage from "/assets/image/register-complete.png";
import Input from "@/components/atom/Input/Input";
import Button from "@/components/atom/Button/Button";
import useInput from "@/hooks/useInput";
import { registerInfoAtom } from "@/store/userAtom";
import { RegisterInfoType } from "@/types/UserType";
import { useAtom } from "jotai";
import { APP_NAME } from "@/data/constants";
import { studyGroupService } from "@/services/server/studyGroupService";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { ErrorType } from "@/types/ErrorType";
import PopularQuizBookList from "./composite/PopularQuizBookList/PopularQuizBookList";

export default function RegisterComplete() {
  const [userInfo] = useAtom<RegisterInfoType>(registerInfoAtom);

  const { value: inviteCode, onChange: handleInviteCodeChange } = useInput("");

  // 초대코드로 스터디 참여
  const handleInviteCodeSubmit = async () => {
    joinStudyGroup(inviteCode);
  };

  const { mutate: joinStudyGroup } = useMutation<void, ErrorType, string>({
    mutationFn: (inviteCode) => studyGroupService.joinStudyGroup(inviteCode),
  });

  // 초기화
  useEffect(() => {
    localStorage.removeItem("social");
    localStorage.removeItem("registerStep");
  }, []);

  return (
    <section className={styles["register-complete"]}>
      <h3 className={styles["sr-only"]}>회원가입 완료</h3>
      <div className={styles["container"]}>
        <img
          src={registerCompleteImage}
          alt="회원가입 환영 사진"
          height={500}
          className={styles["welcome-image"]}
        />
        <div className={styles["welcome-text"]}>
          <p className={styles.greeting}>
            반갑습니다 <strong>{userInfo.nickname}</strong> 님!
          </p>
          <p className={styles.description}>
            {APP_NAME}와 함께 퀴즈를 풀어보세요.
          </p>
          <section className={styles["invite-code"]}>
            <h4 className={styles["sr-only"]}>초대 코드 입력</h4>
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
                label="초대코드"
                hideLabel
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
          <article className={styles["popular-quiz"]}>
            <h4 className={styles["sr-only"]}>이번주 인기 책</h4>
            <p>이번 주 인기 책을 구경해 보세요!</p>
            <div className={styles["popular-quiz-container"]}>
              <PopularQuizBookList />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
