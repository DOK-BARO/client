import styles from "../_quiz_item.module.scss";
import Button from "@/components/atom/Button/Button";
import ROUTES from "@/data/routes";
import { MySolvedQuizDataType } from "@/types/QuizType";
import { Link } from "react-router-dom";

// 푼 퀴즈 아이템
export default function SolvedQuizItem({
  index,
  myQuiz,
  formattedDate,
  onReSolveQuiz,
}: {
  index: number;
  myQuiz: MySolvedQuizDataType;
  formattedDate: string;
  onReSolveQuiz: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <li className={styles.quiz} key={index}>
      <Link to={ROUTES.QUIZ_DETAIL(myQuiz.quiz?.id)}>
        <div className={styles.info}>
          <div className={styles["img-container"]}>
            <img src={myQuiz.bookImageUrl} />
          </div>
          <div className={styles["sub-info"]}>
            <span className={styles.label}>최종 제출일</span>
            <span className={styles["quiz-updated-at"]}>{formattedDate}</span>
          </div>
          <span className={styles["quiz-name"]}>{myQuiz.quiz?.title}</span>
          <img
            src={myQuiz.studyGroup?.profileImageUrl}
            width={32}
            height={32}
            className={styles.profile}
          />
        </div>
        <Button
          fullWidth
          color="primary"
          size="small"
          onClick={onReSolveQuiz}
          className={styles.resolve}
        >
          다시 풀기
        </Button>
      </Link>
    </li>
  );
}
