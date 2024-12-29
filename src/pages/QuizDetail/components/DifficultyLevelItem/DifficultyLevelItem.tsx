import { DifficultyLevelType } from "@/types/ReviewType";
import styles from "./_difficulty_level_Item.module.scss";

interface Props {
  level: string;
  data: DifficultyLevelType;
}
export type LevelType = "1" | "2" | "3";
export const levelMapping: Record<LevelType, string> = {
  "1": "쉬움",
  "2": "보통",
  "3": "어려움",
};
export default function DifficultyLevelItem({ level, data }: Props) {
  const ratePercentage: number = data.selectRate * 100;
  const roundedPercentage: number = Math.floor(ratePercentage);

  return (
    <div className={styles.container}>
      <p className={styles.level}>{levelMapping[level as LevelType]}</p>
      <div
        className={styles.bar}
        role="progressbar"
        aria-valuenow={ratePercentage}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={styles["percentage-bar"]}
          style={{ width: `${ratePercentage}%` }}
          aria-hidden="true"
        />
      </div>
      <div className={styles["percentage-count-container"]}>
        <p
          className={styles.percentage}
          aria-label={`선택된 비율: ${roundedPercentage}%`}
        >
          {roundedPercentage}%
        </p>
        <p
          className={styles.count}
          aria-label={`선택한 사람: ${data.selectCount}명`}
        >
          ({data.selectCount}명)
        </p>
      </div>
    </div>
  );
}
