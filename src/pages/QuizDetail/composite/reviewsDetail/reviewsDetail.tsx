import styles from "./_reviews_detail.module.scss";
import FiveStar from "../../../../components/composite/FiveStar/FiveStar";
import QuizDifficultyChart from "../../components/quizDifficultyChart/quizDifficultyChart";
import { ReviewsTotalScoreType } from "@/types/ReviewType";
import ReviewList from "../reviewList/reviewList";

interface Props {
  reviewsTotalScore: ReviewsTotalScoreType;
  reviewCount: number;
  roundedAverageRating: number;
}
export default function ReviewsDetail({
  reviewsTotalScore,
  reviewCount,
  roundedAverageRating,
}: Props) {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>퀴즈 후기</h2>
      {reviewsTotalScore ? (
        <div>
          <div className={styles["rating-difficulty-container"]}>
            <span className={styles["rating-container"]}>
              <FiveStar size="medium" rating={roundedAverageRating} />
              <span className={styles["rating-text-container"]}>
                <em>{roundedAverageRating}</em>/5
              </span>
              <p className={styles["review-count"]}>({reviewCount})</p>
            </span>
            <QuizDifficultyChart difficulty={reviewsTotalScore.difficulty} />
          </div>
          <ReviewList quizId={reviewsTotalScore.quizId} />
        </div>
      ) : null}
    </section>
  );
}
