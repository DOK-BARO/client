import { ScoreBadge } from "@/svg/ScoreBadge";
import styles from "./_grade_result_item.module.scss";
import { gray00, gray30 } from "@/styles/abstracts/colors";
import memberCircle from "/public/assets/svg/myPage/member-circle.svg";
import { StudyGroupMemberType } from "@/types/StudyGroupType";
interface Props {
  isActive: boolean; // isMe
  member: StudyGroupMemberType;
  score: number;
  grade: number;
  isSubmitted?: boolean;
}
export default function GradeResultItem({
  isActive = false,
  member,
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
              fill={isActive ? gray00 : gray30}
              alt={`${score.toString()}등`}
            />
            <p className={styles.grade}>{grade}</p>
          </div>
        ) : (
          <img
            src={member.profileImageUrl ?? memberCircle}
            width={18}
            height={18}
            className={styles["profile-image"]}
          />
        )}
        <p className={styles.nickname}>{member.nickname}</p>
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
