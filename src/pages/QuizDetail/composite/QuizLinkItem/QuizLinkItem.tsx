import Button from "@/components/atom/Button/Button";
import styles from "./_quiz_link_item.module.scss";
import { QuizExplanationType } from "@/types/QuizType";
import { formatDate } from "@/utils/formatDate";
import { useNavigate } from "react-router-dom";
import ROUTES from "@/data/routes";

interface Props {
  quizExplanation: QuizExplanationType;
}

export default function QuizLinkItem({ quizExplanation }: Props) {
  const navigate = useNavigate();
  const handlePlayQuiz = () => {
    navigate(ROUTES.SOLVING_QUIZ(quizExplanation.id));
  };
  return (
    <article className={styles.container}>
      <img
        className={styles["book-image"]}
        src={quizExplanation.book.imageUrl}
        alt={quizExplanation.book.title}
        width={230}
        height={304}
      />
      <div className={styles["last-modified-at-container"]}>
        {/* TODO: 생성일 / 수정일 */}
        <p className={styles.label}>최종 수정일</p>
        <p className={styles.date}>{formatDate(quizExplanation.createdAt)}</p>
      </div>

      <div className={styles["creator-info-container"]}>
        <img
          className={styles["profile-image"]}
          src={quizExplanation.creator.profileImageUrl}
          width={21}
          height={21}
        />
        <p className={styles.nickname}>{quizExplanation.creator.nickname}</p>
      </div>
      <Button color="primary" size="medium" fullWidth onClick={handlePlayQuiz}>
        퀴즈 풀기
      </Button>
    </article>
  );
}
