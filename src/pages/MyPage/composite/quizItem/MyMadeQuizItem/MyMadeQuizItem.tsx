import styles from "../_quiz_item.module.scss";
import Button from "@/components/atom/Button/Button";
import ROUTES from "@/data/routes";
import { MyQuizDataType } from "@/types/QuizType";
import { Link } from "react-router-dom";

// 만든 퀴즈 아이템
export default function MyMadeQuizItem({
  myQuiz,
  formattedDate,
  onModifyQuiz,
  onClickDelete,
}: {
  index: number;
  myQuiz: MyQuizDataType;
  formattedDate: string;
  onModifyQuiz: (
    e: React.MouseEvent<HTMLButtonElement>,
    quizId: string,
  ) => void;
  onClickDelete: (
    e: React.MouseEvent<HTMLButtonElement>,
    quizId: number,
  ) => void;
}) {
  return (
    <li className={styles.quiz}>
      <Link to={ROUTES.QUIZ_DETAIL(myQuiz.id)}>
        <div className={styles.info}>
          <div className={styles["img-container"]}>
            <img src={myQuiz.bookImageUrl} />
          </div>
          <div className={styles["sub-info"]}>
            <span className={styles.label}>최종 수정일</span>
            <span className={styles["quiz-updated-at"]}>{formattedDate}</span>
          </div>
          <span className={styles["quiz-name"]}>{myQuiz.title}</span>
        </div>
        <div className={styles.util}>
          <Button
            color="primary"
            size="small"
            onClick={(e) => onModifyQuiz(e, myQuiz.id.toString())}
          >
            수정하기
          </Button>
          <Button
            className={styles.delete}
            color="transparent"
            size="xsmall"
            onClick={(e) => onClickDelete(e, myQuiz.id)}
          >
            퀴즈 삭제하기
          </Button>
        </div>
      </Link>
    </li>
  );
}
