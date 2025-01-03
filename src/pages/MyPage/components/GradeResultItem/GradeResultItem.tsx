import { ScoreBadge } from "@/svg/ScoreBadge";
import styles from "./_grade_result_item.module.scss";
import { gray0, gray30 } from "@/styles/abstracts/colors";
import memberCircle from "/public/assets/svg/myPage/member-circle.svg";
interface Props {
  isActive: boolean; // isMe
  nickname: string;
  score: number;
  grade: number;
  isSubmitted?: boolean;
}
export default function GradeResultItem({
  isActive = false,
  nickname,
  score,
  grade = 1,
  isSubmitted = true,
}: Props) {
  return (
    <div className={`${styles.container} ${isActive ? styles.active : ""}`}>
      <span className={styles["nickname-container"]}>
        {isSubmitted ? (
          <div className={styles["grade-container"]}>
            <ScoreBadge
              width={16}
              height={16}
              fill={isActive ? gray0 : gray30}
              alt={`${score.toString()}등`}
            />
            <p className={styles.grade}>{grade}</p>
          </div>
        ) : (
          <img src={memberCircle} width={18} height={18} />
        )}
        <p className={styles.nickname}>{nickname}</p>
      </span>
      <span className={styles["score-container"]}>
        {isSubmitted ? (
          <>
            <p className={styles.score}>{score}</p>
            <p>/10</p>
          </>
        ) : (
          <p>-</p>
        )}
      </span>
    </div>
  );
}
