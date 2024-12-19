import Button from "@/components/atom/button/button";
import { systemWarning } from "@/styles/abstracts/colors";
import styles from "./_five_star.module.scss";
import { StarFilled } from "@/svg/starFilled";
import { StarEmpty } from "@/svg/starEmpty";

interface Props {
  size: "medium" | "small";
  rating: number;
  isButton?: boolean;
}

export default function FiveStar({
  size = "medium",
  rating,
  isButton = false,
}: Props) {
  const iconSize = size === "medium" ? 30 : 20;

  return (
    <span className={`${styles.container} ${styles[size]}`}>
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <Button
            iconOnly
            key={starValue}
            className={`${!isButton ? styles["non-button"] : ""}`}
          >
            {starValue <= rating ? (
              <StarFilled
                width={iconSize}
                height={iconSize}
                fill={systemWarning}
              />
            ) : (
              <StarEmpty
                width={iconSize}
                height={iconSize}
                stroke={systemWarning}
              />
            )}
          </Button>
        );
      })}
    </span>
  );
}
