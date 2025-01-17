import { Star } from "@mui/icons-material";
import styles from "./_quiz_item.module.scss";
import { QuizLevelBarChart } from "@/svg/QuizLevelBarChart";
import Button from "@/components/atom/Button/Button";
import { BookQuizzesDataType } from "@/types/BookType";
import { useNavigate } from "react-router-dom";
import ROUTES from "@/data/routes";

interface Props {
  quiz: BookQuizzesDataType;
  onClick: () => void;
}

export default function QuizItem({ quiz, onClick }: Props) {
  const navigate = useNavigate();

  const goToPlayQuiz = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(ROUTES.SOLVING_QUIZ(quiz.id));
  };

  const renderQuizDifficultyLevel = (): string => {
    if (quiz.averageDifficultyLevel === 0) {
      return "쉬움";
    } else if (quiz.averageDifficultyLevel === 1) {
      return "보통";
    } else {
      return "어려움";
    }
  };

  return (
    <div className={styles["container"]} onClick={onClick}>
      <div className={styles["content"]}>
        <div className={styles["header"]}>
          <div className={styles["review"]}>
            <Star className={styles["review-icon"]} />
            <span>{quiz.averageStarRating}</span>
            <span>{`/5 (${quiz.reviewCount}개의 후기)`}</span>
          </div>

          <div className={styles["quiz-level"]}>
            <QuizLevelBarChart
              level={Math.round(quiz.averageDifficultyLevel)}
              width={24}
              height={24}
            />
            <span>{renderQuizDifficultyLevel()}</span>
          </div>
        </div>

        <div className={styles["quiz-title"]}>{quiz.title}</div>
        <Button className={styles["quiz-tag"]} size="xsmall" color="secondary">
          {quiz.questionCount} 문제
        </Button>
      </div>
      <div className={styles["footer"]}>
        <div className={styles["study-group-info"]}>
          <img
            className={styles["study-group-img"]}
            src={quiz.creator.profileUrl}
            alt={"스터디 그룹 이미지"}
          />
          <span>{quiz.creator.nickname}</span>
        </div>
        <Button
          size="small"
          color="primary"
          className={styles["take-quiz-button"]}
          onClick={goToPlayQuiz}
        >
          풀기
        </Button>
      </div>
    </div>
  );
}
