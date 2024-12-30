import { ReviewType } from "@/types/ReviewType";
import styles from "./_review_item.module.scss";
import FiveStar from "@/components/composite/FiveStar/iveStar";
import { formatDate } from "@/utils/formatDate";
import edit from "/assets/svg/quizDetail/edit.svg";
import trash from "/assets/svg/quizDetail/delete.svg";
import Button from "@/components/atom/Button/Button";

interface Props {
  review: ReviewType;
  isMyReview: boolean;
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
export default function ReviewItem({ review, isMyReview }: Props) {
  const roundedRating: number = Math.floor(review.starRating);

  return (
    <li className={styles.container}>
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
            />
            <Button
              icon={<img src={trash} alt="삭제하기" width={16} height={16} />}
              iconOnly
            />
          </span>
        ) : null}
      </div>
      <p className={styles.comment}>{review.comment}</p>
      <div className={styles["report-container"]}>
        {isMyReview ? null : (
          <Button color="transparent" size="xsmall" className={styles.report}>
            신고하기
          </Button>
        )}
      </div>
    </li>
  );
}
