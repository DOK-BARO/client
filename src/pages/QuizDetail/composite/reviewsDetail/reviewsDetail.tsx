import styles from "./_reviews_detail.module.scss";
import { useQuery } from "@tanstack/react-query";
import FiveStar from "../../../../components/composite/fiveStar/fiveStar";
import QuizDifficultyChart from "../../components/quizDifficultyChart/quizDifficultyChart";
import { reviewKeys } from "@/data/queryKeys";
import { reviewService } from "@/services/server/reviewService";
import { ReviewsTotalScoreType } from "@/types/ReviewType";
import ReviewList from "../reviewList/reviewList";

interface Props {
  quizId: number;
}
export default function ReviewsDetail({ quizId }: Props) {
  const { data, isLoading } = useQuery<ReviewsTotalScoreType | null>({
    queryKey: reviewKeys.totalScore(quizId),
    queryFn: () => reviewService.fetchReviewsTotalScore(quizId),
  });

  const reviewCount = Object.values(data?.difficulty || {}).reduce(
    (total, item) => total + item.selectCount,
    0
  );
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>퀴즈 후기</h2>
      {data && !isLoading ? (
        <div>
          <div className={styles["rating-difficulty-container"]}>
            <span className={styles["rating-container"]}>
              <FiveStar size={30} rating={data.averageStarRating} />
              <span className={styles["rating-text-container"]}>
                <em>{Math.floor(data.averageStarRating)}</em>/5
              </span>
              <p className={styles["review-count"]}>({reviewCount})</p>
            </span>
            <QuizDifficultyChart difficulty={data.difficulty} />
          </div>
          <ReviewList quizId={quizId} />
        </div>
      ) : null}
    </section>
  );
}
