import Button from "@/components/atom/Button/Button";
import { systemWarning } from "@/styles/abstracts/colors";
import styles from "./_five_star.module.scss";
import { StarFilled } from "@/svg/StarFilled";
import { StarEmpty } from "@/svg/StarEmpty";

interface Props {
  size: "large" | "medium" | "small";
  rating: number;
  isButton?: boolean;
  strokeWidth?: number;
  setStarRating?: React.Dispatch<React.SetStateAction<number>>;
  type?: "review" | "normal";
  gap?: 46 | 30;
}

export default function FiveStar({
  size = "medium",
  rating,
  isButton = false,
  strokeWidth,
  setStarRating,
  type = "normal",
  gap = 46,
}: Props) {
  const iconSize = () => {
    if (size === "small") {
      return 20;
    } else if (size === "medium") {
      return 30;
    } else {
      return 40;
    }
  };

  const renderReviewTypeDescription = (): string | undefined => {
    if (rating === 1) {
      return "추천하지 않아요 😵";
    } else if (rating === 2) {
      return "개선이 필요해요 ☹️";
    } else if (rating === 3) {
      return "그저 그래요 🙂";
    } else if (rating === 4) {
      return "추천해요 😄";
    } else if (rating === 5) {
      return "매우 추천해요 😍";
    } else {
      return undefined;
    }
  };
  const reviewDescription: string | undefined = renderReviewTypeDescription();
  const starSelected: boolean = type === "review" && !!reviewDescription;

  const handleStarClick = (
    _: React.MouseEvent<HTMLButtonElement>,
    starValue: number
  ) => {
    setStarRating ? setStarRating(starValue ?? 0) : () => {};
  };

  return (
    <span
      className={`${styles.container} ${styles[size]} ${styles[`gap-${gap}`]}`}
    >
      <span
        className={`${styles["stars"]} ${
          styles[starSelected ? "slideIn" : ""]
        }`}
      >
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          return (
            <Button
              iconOnly
              key={starValue}
              onClick={(e) => handleStarClick(e, starValue)}
              className={`${
                !isButton ? styles["non-button"] : styles["star-button"]
              }`}
            >
              {starValue <= rating ? (
                <StarFilled
                  width={iconSize()}
                  height={iconSize()}
                  fill={systemWarning}
                  strokeWidth={strokeWidth}
                />
              ) : (
                <StarEmpty
                  width={iconSize()}
                  height={iconSize()}
                  stroke={systemWarning}
                  strokeWidth={strokeWidth}
                />
              )}
            </Button>
          );
        })}
      </span>
      {starSelected && (
        <div className={styles["review-type-description"]}>
          {reviewDescription}
        </div>
      )}
    </span>
  );
}
