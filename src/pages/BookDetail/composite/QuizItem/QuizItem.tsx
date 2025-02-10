import styles from "./_quiz_item.module.scss";
import Button from "@/components/atom/Button/Button";
import { BookQuizzesDataType } from "@/types/BookType";
import { useLocation, useNavigate } from "react-router-dom";
import ROUTES from "@/data/routes";
import { StarFilled } from "@/svg/StarFilled";
import { systemWarning } from "@/styles/abstracts/colors";
import { BarChart } from "@/svg/BarChart";
import {
  levelMapping,
  LevelType,
} from "@/pages/QuizDetail/components/DifficultyLevelItem/DifficultyLevelItem";
import IconTextLabel from "@/components/composite/IconTextLabel/IconTextLabel";
import useLoginAction from "@/hooks/useLoginAction";

interface Props {
  quiz: BookQuizzesDataType;
  onClick: () => void;
}

export default function QuizItem({ quiz, onClick }: Props) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { handleAuthenticatedAction } = useLoginAction(pathname);

  const goToPlayQuiz = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleAuthenticatedAction(() => {
      navigate(ROUTES.SOLVING_QUIZ(quiz.id), {
        state: { fromInternal: true },
      });
    });
  };

  const averageDifficultyLabel =
    levelMapping[quiz.averageDifficultyLevel.toString() as LevelType];

  const roundedAverageRating = quiz.averageStarRating
    ? parseFloat(quiz.averageStarRating.toFixed(1))
    : 0;

  console.log(quiz);

  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.content}>
        <div className={styles.header}>
          <IconTextLabel
            icon={<StarFilled width={20} height={20} fill={systemWarning} />}
            labelText={
              <p className={styles.review}>
                <b>{roundedAverageRating}</b>
                /5 ({quiz.reviewCount}개의 후기)
              </p>
            }
          />
          <IconTextLabel
            icon={
              <BarChart alt="어려움 레벨" level={quiz.averageDifficultyLevel} />
            }
            labelText={
              <p className={styles["difficulty-level"]}>
                {averageDifficultyLabel}
              </p>
            }
          />
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
          className={styles["play-quiz-button"]}
          onClick={goToPlayQuiz}
        >
          풀기
        </Button>
      </div>
    </div>
  );
}
