import { ScoreBadge } from "@/svg/ScoreBadge";
import styles from "./_grade_result_item.module.scss";
import { gray00, gray30 } from "@/styles/abstracts/colors";
import memberCircle from "/public/assets/svg/myPage/memberCircle.svg";
import { StudyGroupMemberType } from "@/types/StudyGroupType";
interface Props {
  isActive: boolean; // isMe
  member: StudyGroupMemberType;
  totalQuestionCount: number;
  isSolved: boolean;

  // 푼 사람
  correctCount?: number;
  grade?: number;
}
export default function GradeResultItem({
  isActive = false,
  member,
  correctCount,
  grade,
  isSolved,
  totalQuestionCount,
}: Props) {
  return (
    <div className={`${styles.container} ${isActive ? styles.active : ""}`}>
      <span className={styles["nickname-container"]}>
        {isSolved && grade ? (
          <div className={styles["grade-container"]}>
            <ScoreBadge
              width={16}
              height={16}
              fill={isActive ? gray00 : gray30}
              alt={`${grade.toString()}등`}
            />
            <p className={styles.grade}>{grade}</p>
          </div>
        ) : (
          <img
            src={member.profileImageUrl ?? memberCircle}
            width={18}
            height={18}
            className={styles["profile-image"]}
            alt=""
          />
        )}
        <p className={styles.nickname}>{member.nickname}</p>
      </span>
      <span className={styles["score-container"]}>
        {isSolved ? (
          <>
            <p className={styles.score}>{correctCount}</p>
            <p>/{totalQuestionCount}</p>
          </>
        ) : (
          <p>-</p>
        )}
      </span>
    </div>
  );
}
