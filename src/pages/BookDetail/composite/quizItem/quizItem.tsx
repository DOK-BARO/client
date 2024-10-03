import { Star } from "@mui/icons-material";
import styles from "./_quiz_item.module.scss";
import { DokPick } from "@/svg/dokPick";
import { QuizLevelBarChart } from "@/svg/quizLevelBarChart";
import Button from "@/components/atom/button/button";

// 임시 Props 정의
interface Props {
  quizLevel: string;
  isDokPick: boolean;
}

export default function QuizItem({ quizLevel, isDokPick }: Props) {
  const containerClassName = isDokPick ? "dokpick" : "basic";

  return (
    <div className={styles["container"]}>
      {isDokPick && (
        <div className={styles["dokpick-tag"]}>
          <DokPick width={24} height={24} />
          <span>DOK Pick</span>
        </div>
      )}

      <div className={styles[containerClassName]}>
        <div className={styles["header"]}>
          <div className={styles["review"]}>
            <Star className={styles["review-icon"]} />
            <span>4.9</span>
            <span>/5 (5개의 후기)</span>
          </div>

          <div className={styles["quiz-level"]}>
            {/*TODO : 레벨에 따라 아이콘 변경*/}
            <QuizLevelBarChart width={32} height={24} />
            <span>{quizLevel}</span>
          </div>
        </div>

        <div className={styles["body"]}>
          <div className={styles["quiz-title"]}>퀴즈 01</div>
          <div className={styles["quiz-tag"]}>10 문제</div>
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
          <Button className={styles["take-quiz-button"]} onClick={() => {}}>
            풀기
          </Button>
        </div>
      </div>
    </div>
  );
}
