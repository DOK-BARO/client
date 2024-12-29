import Button from "@/components/atom/button/button";
import styles from "./_quiz_item.module.scss";
import infoFilled from "/public/assets/svg/myPage/info-filled.svg";
import { StudyGroupMyUnSolvedQuizType } from "@/types/StudyGroupType";
import { formatDate } from "@/utils/formatDate";
import { Link, useNavigate } from "react-router-dom";

interface Prop {
  quizData: StudyGroupMyUnSolvedQuizType;
  isSolved: boolean;
}

export default function QuizItem({ quizData, isSolved }: Prop) {
  const navigate = useNavigate();
  const handleGoToSolveQuiz = () => {
    navigate(`/quiz/play/${quizData.quiz.id}`);
  };

  return (
    <li className={styles.container}>
      <div className={styles["left-container"]}>
        <Link to={`/book/${quizData.book.id}`}>
          <img
            src={quizData.book.imageUrl}
            alt={quizData.book.title}
            className={styles["quiz-image"]}
          />
        </Link>
        {/* TODO: 클래스 이름 변경 */}
        <span className={styles["date-container"]}>
          <p className={styles.date}>
            {formatDate(quizData.quiz.createdAt, true)}
          </p>
          <img src={infoFilled} alt="" height={14} width={14} />
        </span>
      </div>
      <div className={styles["right-container"]}>
        <div>
          <p className={styles.title}>{quizData.quiz.title}</p>
          <span className={styles.profile}>
            {quizData.quiz.contributors.length > 0 ? (
              <div className={styles["profile-images-container"]}>
                {[quizData.quiz.creator, ...quizData.quiz.contributors].map(
                  (contributor, index) => (
                    <img
                      src={contributor.profileImageUrl}
                      alt={contributor.nickname}
                      width={16}
                      height={16}
                      className={`${styles["profile-image"]} ${
                        styles[`z-index-${index + 1}`]
                      }`}
                    />
                  )
                )}
              </div>
            ) : (
              <img
                src={quizData.quiz.creator.profileImageUrl}
                alt={quizData.quiz.creator.nickname}
                width={16}
                height={16}
                className={styles["profile-image"]}
              />
            )}
            <p className={styles["profile-nickname"]}>
              {quizData.quiz.creator.nickname}
              {quizData.quiz.contributors.length > 0 ? " 외" : null}
            </p>
          </span>
          <p className={styles.description}>{quizData.quiz.description}</p>
        </div>
        <div className={styles["button-container"]}>
          {isSolved ? (
            <Button color="white" size="xsmall" fullWidth>
              점수 리포트
            </Button>
          ) : null}
          <Button
            color="primary"
            size="xsmall"
            fullWidth
            onClick={handleGoToSolveQuiz}
          >
            {isSolved ? "다시 풀기" : "퀴즈 풀기"}
          </Button>
        </div>
      </div>
    </li>
  );
}
