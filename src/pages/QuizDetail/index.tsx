import { useParams } from "react-router-dom";
import styles from "./_quiz_detail.module.scss";
import { bookKeys, quizKeys, reviewKeys } from "@/data/queryKeys";
import { quizService } from "@/services/server/quizService";
import { useQuery } from "@tanstack/react-query";
import Breadcrumb from "@/components/composite/Breadcrumb/Breadcrumb";
import QuizShortInfo from "./composite/QuizShortInfo/QuizShortInfo";
import ReviewsDetail from "./composite/ReviewsDetail/ReviewsDetail";
import { ReviewsTotalScoreType } from "@/types/ReviewType";
import { reviewService } from "@/services/server/reviewService";
import QuizLinkItem from "./composite/QuizLinkItem/QuizLinkItem";
import { bookService } from "@/services/server/bookService";
import { extractCategoryList } from "@/utils/extractCategoryList";
import LoadingSpinner from "@/components/atom/LoadingSpinner/LoadingSpinner";

export default function Index() {
  const { id } = useParams();

  const { data: explanation, isLoading } = useQuery({
    queryKey: quizKeys.explanation(id),
    queryFn: () => (id ? quizService.fetchQuizExplanation(id) : null),
    enabled: !!id,
  });
  const { data: reviewsTotalScore } = useQuery<ReviewsTotalScoreType | null>({
    queryKey: reviewKeys.totalScore(Number(id)),
    queryFn: () =>
      id ? reviewService.fetchReviewsTotalScore(Number(id)) : null,
    enabled: !!id,
  });

  const { data: bookDetail } = useQuery({
    queryKey: bookKeys.detail(explanation?.book.id.toString()),
    queryFn: () =>
      explanation
        ? bookService.fetchBook(explanation.book.id.toString())
        : null,
    enabled: !!explanation?.book.id,
  });

  // TODO:
  if (isLoading) {
    return <LoadingSpinner pageCenter width={40} />;
  }

  if (!explanation || !reviewsTotalScore) {
    return <div />;
  }

  const categoryList = bookDetail
    ? extractCategoryList(
        bookDetail?.categories[bookDetail?.categories.length - 1],
      )
    : [];

  const reviewCount = Object.values(reviewsTotalScore?.difficulty || {}).reduce(
    (total, item) => total + item.selectCount,
    0,
  );
  const roundedAverageRating = reviewsTotalScore.averageStarRating
    ? parseFloat(reviewsTotalScore.averageStarRating.toFixed(1))
    : 0;
  const averageDifficulty = reviewsTotalScore.difficulty
    ? Math.round(
        Object.entries(reviewsTotalScore.difficulty).reduce(
          (acc, [difficulty, data]) => {
            return acc + Number(difficulty) * data.selectRate;
          },
          0,
        ),
      )
    : 0;

  return (
    <section className={styles.container}>
      <Breadcrumb parentPage="quiz" list={categoryList} />
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
            quizTitle={explanation.title}
          />
        </div>
      </div>
    </section>
  );
}
