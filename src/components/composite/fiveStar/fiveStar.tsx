import Button from "@/components/atom/button/button";
import { systemWarning } from "@/styles/abstracts/colors";
import styles from "./_five_star.module.scss";
import { StarFilled } from "@/svg/starFilled";
import { StarEmpty } from "@/svg/starEmpty";

interface Props {
  size: number;
  rating: number;
  isButton?: boolean;
}

export default function FiveStar({
  size = 30,
  rating,
  isButton = false,
}: Props) {
  return (
    <span className={styles.container}>
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <Button
            iconOnly
            key={starValue}
            className={`${!isButton ? styles["non-button"] : ""}`}
          >
            {starValue <= rating ? (
              <StarFilled width={size} height={size} fill={systemWarning} />
            ) : (
              <StarEmpty width={size} height={size} stroke={systemWarning} />
            )}
          </Button>
        );
      })}
    </span>
  );
}
