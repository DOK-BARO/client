import { ReviewPostType, ReviewType } from "@/types/ReviewType";
import styles from "./_review_item.module.scss";
import FiveStar from "@/components/composite/FiveStar/FiveStar";
import { formatDate } from "@/utils/formatDate";
import edit from "/assets/svg/quizDetail/edit.svg";
import trash from "/assets/svg/quizDetail/delete.svg";
import Button from "@/components/atom/Button/Button";
import Textarea from "@/components/atom/Textarea/Textarea";
import { useState } from "react";
import { DifficultyType } from "@/types/Difficultytype";
import Modal from "@/components/atom/Modal/Modal";
import useModal from "@/hooks/useModal";
import useTextarea from "@/hooks/useTextarea";
import { useMutation } from "@tanstack/react-query";
import { reviewService } from "@/services/server/reviewService";
import toast from "react-hot-toast";
import { ErrorType } from "@/types/ErrorType";
import { queryClient } from "@/services/server/queryClient";
import { reviewKeys } from "@/data/queryKeys";

interface Props {
  review: ReviewType;
  isMyReview: boolean;
  quizTitle: string;
}
type LevelType = "1" | "2" | "3";
const levelMapping: Record<LevelType, string> = {
  "1": "쉬워요",
  "2": "보통이에요",
  "3": "어려워요",
};
type RatingType = "1" | "2" | "3" | "4" | "5";
const ratingMapping: Record<RatingType, string> = {
  "1": "추천하지 않아요 😵",
  "2": "개선이 필요해요 ☹️",
  "3": "그저 그래요 🙂",
  "4": "추천해요 😄",
  "5": "매우 추천해요 😍",
};
export default function ReviewItem({ review, isMyReview, quizTitle }: Props) {
  const roundedRating: number = Math.floor(review.starRating);
  const [starRating, setStarRating] = useState<number>(roundedRating);

  const {
    isModalOpen: isEditModalOpen,
    openModal: openEditModal,
    closeModal: closeEditModal,
  } = useModal();
  const {
    isModalOpen: isDeleteModalOpen,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal();
  const {
    isModalOpen: isReportModalOpen,
    openModal: openReportModal,
    closeModal: closeReportModal,
  } = useModal();
  const { value: comment, onChange: onCommentChange } = useTextarea(
    review.comment ?? ""
  );
  const { value: reportContent, onChange: onReportContentChange } =
    useTextarea("");

  const { mutate: updateReview } = useMutation<
    void,
    ErrorType,
    { id: number; review: ReviewPostType }
  >({
    mutationFn: ({ id, review }) =>
      reviewService.updateQuizReview({
        id,
        review,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: reviewKeys.list({ quizId: review.quizId }),
      });
      queryClient.invalidateQueries({
        queryKey: reviewKeys.totalScore(review.quizId),
      });

      toast.success("리뷰가 수정되었습니다.");
      closeEditModal();
    },
  });

  const { mutate: deleteReview } = useMutation<void, ErrorType, number>({
    mutationFn: (id) => reviewService.deleteQuizReview(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: reviewKeys.list({ quizId: review.quizId }),
      });
      queryClient.invalidateQueries({
        queryKey: reviewKeys.totalScore(review.quizId),
      });

      toast.success("리뷰가 삭제되었습니다.");
      closeDeleteModal();
    },
  });

  const { mutate: reportReview } = useMutation<
    { id: number } | null,
    ErrorType,
    { quizReviewId: number; content: string }
  >({
    mutationFn: ({ quizReviewId, content }) =>
      reviewService.reportQuizReview({ quizReviewId, content }),
    onSuccess: (data) => {
      if (!data) {
        toast.error("리뷰 신고에 실패했습니다.");
        return;
      }

      queryClient.invalidateQueries({
        queryKey: reviewKeys.list({ quizId: review.quizId }),
      });
      queryClient.invalidateQueries({
        queryKey: reviewKeys.totalScore(review.quizId),
      });

      toast.success("리뷰가 신고되었습니다.");
      closeReportModal();
    },
  });

  const handleUpdateReview = () => {
    const reviewToUpdate: ReviewPostType = {
      starRating: starRating,
      difficultyLevel: difficultyLevel,
      comment: comment,
      quizId: review.quizId,
    };
    updateReview({ id: review.id, review: reviewToUpdate });
  };

  const handleDeleteReview = () => {
    deleteReview(review.id);
  };

  const handleReportReview = () => {
    reportReview({ quizReviewId: review.id, content: reportContent });
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

  const [difficultyLevel, setDifficultyLevel] = useState<number>(
    review.difficultyLevel
  );

  const handleDifficultyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { id } = e.currentTarget;
    setDifficultyLevel(Number(id));
  };

  return (
    <li className={styles.container}>
      {isEditModalOpen ? (
        // 리뷰 수정하기 모달
        <Modal
          closeModal={closeEditModal}
          title="리뷰 수정하기"
          contents={[
            {
              title:
                "평점을 남겨주세요 - 다른 사용자들에게 퀴즈를 추천하고 싶은가요?",
              content: (
                <FiveStar
                  size="large"
                  rating={starRating}
                  strokeWidth={1.5}
                  setStarRating={setStarRating}
                  type="review"
                  isButton
                  gap={30}
                />
              ),
            },
            {
              title: "난이도는 어때요?",
              content: (
                <div className={styles["difficulty-button-container"]}>
                  {difficulties.map((difficulty: DifficultyType) => {
                    const id = difficulty.difficultyValue;
                    const isClicked: boolean = difficultyLevel === id;

                    return (
                      <Button
                        id={difficulty.difficultyValue.toString()}
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
              ),
            },
            {
              title: "더 작성하고 싶은 후기를 자유롭게 작성해 주세요.",
              content: (
                <Textarea
                  id="review-textarea"
                  value={comment}
                  onChange={onCommentChange}
                  maxLengthShow
                  maxLength={200}
                  rows={5}
                  size="small"
                />
              ),
            },
          ]}
          bottomButtons={[
            { text: "완료", color: "primary", onClick: handleUpdateReview },
          ]}
        />
      ) : null}

      {isDeleteModalOpen ? (
        <Modal
          closeModal={closeDeleteModal}
          contents={[
            {
              title: `${quizTitle}에 남긴 후기를 삭제하시겠어요?`,
              content: <p>삭제된 후기는 복구되지 않습니다.</p>,
            },
          ]}
          bottomButtons={[
            { text: "삭제하기", color: "primary", onClick: handleDeleteReview },
          ]}
        />
      ) : null}

      {isReportModalOpen ? (
        <Modal
          closeModal={closeReportModal}
          contents={[
            {
              title: `${quizTitle}에 남긴 후기를 신고하시겠어요?`,
              content: (
                <div>
                  <p className={styles["report-text"]}>
                    신고된 후기는 검토 후 삭제됩니다.
                  </p>
                  <Textarea
                    maxLengthShow
                    maxLength={200}
                    onChange={onReportContentChange}
                    value={reportContent}
                    id="report-content"
                    rows={5}
                    size="small"
                  />
                </div>
              ),
            },
          ]}
          bottomButtons={[
            { text: "신고하기", color: "primary", onClick: handleReportReview },
          ]}
        />
      ) : null}
      <div className={styles["review-info"]}>
        <FiveStar rating={review.starRating} size="small" />
        <p className={styles.writer}>{review.writerNickname}</p>
        <p className={styles.createdAt}>{formatDate(review.createdAt)}</p>
      </div>
      <div className={styles["review-short-container"]}>
        <span className={styles["review-short"]}>
          <p>{ratingMapping[roundedRating.toString() as RatingType]}</p>
          <span className={styles.divider} />
          <p>{levelMapping[review.difficultyLevel.toString() as LevelType]}</p>
        </span>
        {isMyReview ? (
          <span className={styles["edit-container"]}>
            <Button
              icon={<img src={edit} alt="수정하기" width={16} height={16} />}
              iconOnly
              onClick={openEditModal}
            />
            <Button
              icon={<img src={trash} alt="삭제하기" width={16} height={16} />}
              iconOnly
              onClick={openDeleteModal}
            />
          </span>
        ) : null}
      </div>
      <p className={styles.comment}>{review.comment}</p>
      <div className={styles["report-container"]}>
        {isMyReview ? null : (
          <Button
            color="transparent"
            size="xsmall"
            className={styles.report}
            onClick={openReportModal}
          >
            신고하기
          </Button>
        )}
      </div>
    </li>
  );
}
