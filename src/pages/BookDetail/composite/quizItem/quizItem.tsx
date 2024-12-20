import { Star } from "@mui/icons-material";
import styles from "./_quiz_item.module.scss";
import { QuizLevelBarChart } from "@/svg/quizLevelBarChart";
import Button from "@/components/atom/button/button";
// import DifficultyLevelItem from "@/pages/QuizDetail/components/difficultyLevelItem/difficultyLevelItem";
interface Props {
  quizLevel: string;
}

export default function QuizItem({ quizLevel }: Props) {
  return (
    <div className={styles["container"]}>
			<div className={styles["content"]}>
        <div className={styles["header"]}>
          <div className={styles["review"]}>
            <Star className={styles["review-icon"]} />
            <span>4.9</span>
            <span>/5 (5개의 후기)</span>
          </div>

          <div className={styles["quiz-level"]}>
            <QuizLevelBarChart width={32} height={24} />
            <span>{quizLevel}</span>
          </div>
        </div>
          <div className={styles["quiz-title"]}>퀴즈 01</div>
					<Button 
					className={styles['quiz-tag']}
					size="xsmall" color="secondary">10 문제</Button>
				</div>
        <div className={styles["footer"]}>
          <div className={styles["study-group-info"]}>
            <img
              className={styles["study-group-img"]}
              src={"https://placehold.co/36"}
              alt={"스터디 그룹 이미지"}
            />
            <span>스터디원</span>
          </div>
          <Button 
					size="small"
					color="primary"
					className={styles["take-quiz-button"]} onClick={() => {}}>
            풀기
          </Button>
        </div>
    </div>
  );
}
