import Button from "@/components/atom/button/button";
import styles from "./_quiz_item.module.scss";
import infoFilled from "/public/assets/svg/myPage/info-filled.svg";
import { StudyGroupMyUnSolvedQuizType } from "@/types/StudyGroupType";
import { formatDate } from "@/utils/formatDate";

interface Prop {
  quizData: StudyGroupMyUnSolvedQuizType;
}
export default function QuizItem({ quizData }: Prop) {
  return (
    <li className={styles.container}>
      <div className={styles["left-container"]}>
        <img
          src={quizData.book.imageUrl}
          alt={quizData.book.title}
          className={styles["quiz-image"]}
        />
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
            <img
              src={quizData.quiz.creator.profileImageUrl}
              alt={quizData.quiz.creator.nickname}
              width={16}
              height={16}
              className={styles["profile-image"]}
            />
            <p className={styles["profile-nickname"]}>
              {quizData.quiz.creator.nickname}
            </p>
          </span>
          <p className={styles.description}>{quizData.quiz.description}</p>
        </div>
        <Button color="primary" size="xsmall" fullWidth>
          퀴즈 풀기
        </Button>
      </div>
    </li>
  );
}
