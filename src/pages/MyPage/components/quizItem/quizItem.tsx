import Button from "@/components/atom/button/button";
import styles from "./_quiz_item.module.scss";
import infoFilled from "/public/assets/svg/myPage/info-filled.svg";

export default function QuizItem() {
  return (
    <li className={styles.container}>
      <div className={styles["left-container"]}>
        <img src="" className={styles["quiz-image"]} />
        {/* TODO: 클래스 이름 변경 */}
        <span className={styles["date-container"]}>
          <p className={styles.date}>2024년 08월 23일</p>
          <img src={infoFilled} alt="" height={14} width={14} />
        </span>
      </div>
      <div className={styles["right-container"]}>
        <div>
          <p className={styles.title}>자바스크립트 퀴즈</p>
          <span className={styles.profile}>
            <img
              src=""
              alt=""
              width={16}
              height={16}
              className={styles["profile-image"]}
            />
            <p className={styles["profile-nickname"]}>user_idididid</p>
          </span>
          <p className={styles.description}>
            퀴즈 설명 없음퀴즈 설명 없음퀴즈 설명 없음퀴즈 설명 없음퀴즈 설명
            없음퀴즈 설명 없음퀴즈 설명 없음퀴즈 설명 없음퀴즈 설명 없음퀴즈
            설명 없음퀴즈 설명 없음퀴즈 설명 없음퀴즈 설
          </p>
        </div>
        <Button color="primary" size="xsmall" fullWidth>
          퀴즈 풀기
        </Button>
      </div>
    </li>
  );
}
