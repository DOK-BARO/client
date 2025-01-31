import styles from "./_quiz_review.module.scss";
import FiveStar from "@/components/composite/FiveStar/FiveStar";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Button from "@/components/atom/Button/Button";
import { DifficultyType } from "@/types/Difficultytype";
import useAutoResizeTextarea from "@/hooks/useAutoResizeTextArea";
import Textarea from "@/components/atom/Textarea/Textarea";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ErrorType } from "@/types/ErrorType";
import { reviewService } from "@/services/server/reviewService";
import { useParams } from "react-router-dom";
import { ReviewPostType } from "@/types/ReviewType";
import ROUTES from "@/data/routes";
import { reviewKeys } from "@/data/queryKeys";

export default function Index() {
  const navigate = useNavigate();
  const { quizId, solvingQuizId, quizTitle } = useParams<{
    quizId: string;
    solvingQuizId: string;
    quizTitle: string;
  }>();

  const { data: myReview } = useQuery({
    queryKey: reviewKeys.myReview(Number(quizId)),
    queryFn: () => reviewService.fetchMyReview(Number(quizId)),
    enabled: !!quizId,
  });

  const { mutate: submitQuizReview } = useMutation<
    void,
    ErrorType,
    ReviewPostType
  >({
    mutationFn: async (newQuizReview) => {
      if (myReview) {
        // 이미 퀴즈에 대한 리뷰가 있다면 업데이트
        await reviewService.updateQuizReview({
          id: myReview.id,
          review: newQuizReview,
        });
      } else {
        await reviewService.createQuizReview(newQuizReview);
      }
    },
    onSuccess: () => {
      toast.success("후기 작성이 완료되었습니다");
      navigate(ROUTES.QUIZ_DETAIL(parseInt(quizId!)));
    },
  });

  const [rating, setStarRating] = useState<number>(0);
  const [difficultyLevel, setDifficultyLevel] = useState<DifficultyType>();
  const { value, onChange, textareaRef, resetTextarea } = useAutoResizeTextarea(
    "",
    48,
    3,
  );

  useEffect(() => {
    if (myReview) {
      setStarRating(myReview.starRating);
      setDifficultyLevel({
        label: "",
        difficultyValue: myReview?.difficultyLevel,
      });
      resetTextarea(myReview.comment);
    }
  }, [myReview]);

  const reviewMaxLength = 200;

  const showDifficultySection = rating !== 0;
  const showReviewTextArea = difficultyLevel;

  const handleSubmit = () => {
    if (!difficultyLevel?.difficultyValue || !quizId) {
      return;
    }
    const review: ReviewPostType = {
      starRating: rating,
      difficultyLevel: difficultyLevel?.difficultyValue,
      comment: value,
      quizId: parseInt(quizId),
    };
    submitQuizReview(review);
  };

  const handleSkip = () => {
    navigate(ROUTES.QUIZ_DETAIL(parseInt(quizId!)));
  };

  const difficulties: DifficultyType[] = [
    {
      label: "어려워요",
      difficultyValue: 3,
    },
    {
      label: "보통이에요",
      difficultyValue: 2,
    },
    {
      label: "쉬워요",
      difficultyValue: 1,
    },
  ];
  const handleDifficultyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { id } = e.currentTarget;
    const currentDifficulty = difficulties.find(
      ({ difficultyValue }) => difficultyValue.toString() === id,
    );
    setDifficultyLevel(currentDifficulty);
  };
  if (!quizId || !solvingQuizId || !quizTitle) {
    return;
  }

  return (
    <section className={styles["container"]}>
      <h2 className={styles["sr-only"]}>퀴즈 후기 남기기</h2>
      <p
        className={styles["title"]}
      >{`방금 푼 퀴즈(${quizTitle})에\n소중한 후기를 남겨주세요.`}</p>
      <div className={styles["review-star-container"]}>
        <div className={styles["request-text"]}>평점을 남겨주세요</div>
        <div className={styles["request-sub-text"]}>
          다른 사용자들에게 퀴즈를 추천하고 싶은가요?
        </div>
        <FiveStar
          size="large"
          rating={rating}
          strokeWidth={1.5}
          setStarRating={setStarRating}
          type="review"
          isButton
        />
      </div>
      {showDifficultySection && (
        <section className={styles["difficulty-container"]}>
          <div className={styles["request-text"]}>난이도는 어때요?</div>
          <div className={styles["button-area"]}>
            {difficulties.map((difficulty: DifficultyType) => {
              const id = difficulty.difficultyValue.toString();
              const isClicked: boolean =
                difficultyLevel?.difficultyValue.toString() === id;

              return (
                <Button
                  id={id}
                  key={difficulty.difficultyValue}
                  className={styles["difficulty-button"]}
                  size="small"
                  color={isClicked ? "primary" : "secondary"}
                  onClick={handleDifficultyClick}
                >
                  {difficulty.label}
                </Button>
              );
            })}
          </div>
        </section>
      )}
      {showReviewTextArea && (
        <section className={styles["review-text-container"]}>
          <div className={styles["request-text"]}>
            더 공유하고 싶은 후기를 자유롭게 작성해 주세요.
          </div>
          <Textarea
            id="review-text"
            value={value}
            onChange={onChange}
            placeholder={"후기를 작성해주세요"} // TODO: 후기문구 확정되면 변경
            maxLength={reviewMaxLength}
            textAreaRef={textareaRef}
            className={styles["review-textarea"]}
            size="medium"
            maxLengthShow
          />
          <div className={styles["button-container"]}>
            <Button size="medium" color="primary-border" onClick={handleSkip}>
              건너뛰기
            </Button>
            <Button
              size="medium"
              className={styles.done}
              color="primary"
              onClick={handleSubmit}
            >
              완료
            </Button>
          </div>
        </section>
      )}
    </section>
  );
}
