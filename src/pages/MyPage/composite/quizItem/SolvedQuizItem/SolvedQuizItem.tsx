import { quizKeys } from "@/data/queryKeys";
import styles from "../_quiz_item.module.scss";
import Button from "@/components/atom/Button/Button";
import ROUTES from "@/data/routes";
import { MySolvedQuizDataType } from "@/types/QuizType";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { quizService } from "@/services/server/quizService";

// 푼 퀴즈 아이템
export default function SolvedQuizItem({
  myQuiz,
  formattedDate,
  onReSolveQuiz,
}: {
  myQuiz: MySolvedQuizDataType;
  formattedDate: string;
  onReSolveQuiz: (e: React.MouseEvent<HTMLButtonElement>, id: number) => void;
}) {
  const { data: quizExplanation } = useQuery({
    queryKey: quizKeys.explanation(myQuiz.quiz.id.toString()),
    queryFn: async () =>
      await quizService.fetchQuizExplanation(myQuiz.quiz.id.toString()),
    enabled: !!myQuiz.quiz.id,
  });
  return (
    <li className={styles.quiz}>
      <Link to={ROUTES.QUIZ_DETAIL(myQuiz.quiz?.id)}>
        <div className={styles.info}>
          <div className={styles["img-container"]}>
            <img src={myQuiz.bookImageUrl} />
          </div>
          <div className={styles["sub-info"]}>
            <span className={styles.label}>최종 제출일</span>
            <span className={styles["quiz-updated-at"]}>{formattedDate}</span>
          </div>
          <span className={styles["quiz-name"]}>{myQuiz.quiz.title}</span>
          <div className={styles["creator-profile"]}>
            <img
              src={quizExplanation?.creator.profileImageUrl}
              alt={`${quizExplanation?.creator.nickname}님의 프로필 이미지`}
              width={32}
              height={32}
              className={styles.profile}
            />
            <p>{quizExplanation?.creator.nickname}</p>
          </div>
        </div>
        <Button
          fullWidth
          color="primary"
          size="small"
          onClick={(e) => onReSolveQuiz(e, myQuiz.quiz.id)}
          className={styles.resolve}
        >
          다시 풀기
        </Button>
      </Link>
    </li>
  );
}
