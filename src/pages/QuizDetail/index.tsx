import { useParams } from "react-router-dom";
import styles from "./_quiz_detail.module.scss";
import { quizKeys, reviewKeys } from "@/data/queryKeys";
import { quizService } from "@/services/server/quizService";
import { useQuery } from "@tanstack/react-query";
import Breadcrumb from "@/components/composite/breadcrumb/breadcrumb";
import QuizShortInfo from "./composite/quizShortInfo/quizShortInfo";
import ReviewsDetail from "./composite/reviewsDetail/reviewsDetail";
import { ReviewsTotalScoreType } from "@/types/ReviewType";
import { reviewService } from "@/services/server/reviewService";
import QuizLinkItem from "./composite/quizLinkItem/quizLinkItem";

export default function Index() {
  const { id } = useParams();
	if(!id){
		return;
	}
  const { data: explanation, isLoading } = useQuery({
    queryKey: quizKeys.explanation(id),
    queryFn: async () => await (quizService.fetchQuizExplanation(id)),
  });
  const { data: reviewsTotalScore } = useQuery<ReviewsTotalScoreType | null>({
    queryKey: reviewKeys.totalScore(Number(id)),
    queryFn: () => reviewService.fetchReviewsTotalScore(Number(id)),
  });

  if (isLoading) {
    return <div>loading</div>;
  }

  if (!explanation || !reviewsTotalScore) {
    return <div>quiz explanation page error!!</div>;
  }
  if (!id) {
    return <div>404</div>;
  }
  // TODO:
  const list = [
    { id: 1, name: "OS" },
    { id: 2, name: "Windows" },
    { id: 3, name: "Windows 일반" },
  ];
  const reviewCount = Object.values(reviewsTotalScore?.difficulty || {}).reduce(
    (total, item) => total + item.selectCount,
    0
  );
  const roundedAverageRating = parseFloat(
    reviewsTotalScore.averageStarRating.toFixed(1)
  );
  const averageDifficulty = Math.max(
    ...Object.entries(reviewsTotalScore.difficulty).map(
      ([, data]) => data.selectCount
    )
  );

  return (
    <section className={styles.container}>
      <Breadcrumb parentComponent="QUIZ" list={list} />
      <div className={styles["row-container"]}>
        <QuizLinkItem quizExplanation={explanation} />
        <div className={styles["quiz-detail-container"]}>
          <QuizShortInfo
            quizExplanation={explanation}
            reviewCount={reviewCount}
            roundedAverageRating={roundedAverageRating}
            averageDifficulty={averageDifficulty}
          />
          <ReviewsDetail
            reviewsTotalScore={reviewsTotalScore}
            reviewCount={reviewCount}
            roundedAverageRating={roundedAverageRating}
          />
        </div>
      </div>
    </section>
  );
}
