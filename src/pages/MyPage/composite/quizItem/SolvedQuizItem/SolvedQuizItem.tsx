import { quizKeys } from "@/data/queryKeys";
import styles from "../_quiz_item.module.scss";
import infoFilled from "/public/assets/svg/myPage/info-filled.svg";
import link from "/public/assets/svg/myPage/link.svg";
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
  onCopyQuizLink,
}: {
  myQuiz: MySolvedQuizDataType;
  formattedDate: string;
  onReSolveQuiz: (
    e: React.MouseEvent<HTMLButtonElement>,
    quizId: number,
  ) => void;
  onCopyQuizLink: (
    e: React.MouseEvent<HTMLButtonElement>,
    quizId: number,
  ) => void;
}) {
  const { data: quizExplanation } = useQuery({
    queryKey: quizKeys.explanation(myQuiz.quiz.id.toString()),
    queryFn: async () =>
      await quizService.fetchQuizExplanation(myQuiz.quiz.id.toString()),
    enabled: !!myQuiz.quiz.id,
  });
  return (
    <li>
      <Link
        to={ROUTES.QUIZ_DETAIL(myQuiz.quiz?.id)}
        className={styles.container}
      >
        <div className={styles["left-container"]}>
          <div className={styles["img-container"]}>
            <img
              src={myQuiz.bookImageUrl}
              alt={quizExplanation?.book.title}
              className={styles.img}
            />
          </div>
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
        <div className={styles["right-container"]}>
          <div>
            <div className={styles["right-container-header"]}>
              <span className={styles["date-container"]}>
                <p className={styles.date}>{formattedDate}</p>
                <img src={infoFilled} alt="" height={14} width={14} />
              </span>

              <Button
                className={styles["copy-link"]}
                onClick={(e) => onCopyQuizLink(e, myQuiz.quiz.id)}
                iconOnly
                icon={
                  <img
                    src={link}
                    width={20}
                    height={20}
                    alt="퀴즈 공유 링크 복사"
                  />
                }
              />
            </div>
            <p className={styles.title}>{myQuiz.quiz.title}</p>
            <p className={styles.description}>{quizExplanation?.book.title}</p>
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
        </div>
      </Link>
    </li>
  );
}
