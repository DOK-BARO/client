import Button from "@/components/atom/Button/Button";
import styles from "./_quiz_link_item.module.scss";
import { QuizExplanationType } from "@/types/QuizType";
import { formatDate } from "@/utils/formatDate";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ROUTES from "@/data/routes";
import useLoginAction from "@/hooks/useLoginAction";

interface Props {
  quizExplanation: QuizExplanationType;
}

export default function QuizLinkItem({ quizExplanation }: Props) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { handleAuthenticatedAction } = useLoginAction(pathname);

  const handlePlayQuiz = () => {
    handleAuthenticatedAction(() => {
      navigate(ROUTES.SOLVING_QUIZ(quizExplanation.id), {
        state: { fromInternal: true },
      });
    });
  };
  return (
    <article className={styles.container}>
      <Link to={`${ROUTES.BOOK_DETAIL_SECTION(quizExplanation.book.id)}`}>
        <img
          className={styles["book-image"]}
          src={quizExplanation.book.imageUrl}
          alt={quizExplanation.book.title}
          width={230}
          height={304}
        />
      </Link>
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
          alt=""
        />
        <p className={styles.nickname}>{quizExplanation.creator.nickname}</p>
      </div>
      <Button color="primary" size="medium" fullWidth onClick={handlePlayQuiz}>
        퀴즈 풀기
      </Button>
    </article>
  );
}
