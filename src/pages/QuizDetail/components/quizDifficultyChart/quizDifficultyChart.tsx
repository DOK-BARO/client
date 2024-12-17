import { DifficultyType } from "@/types/ReviewType";
import styles from "./_quiz_difficulty_chart.module.scss";
import DifficultyLevelItem from "../difficultyLevelItem/difficultyLevelItem";

interface Props {
  difficulty: DifficultyType;
}

export default function DifficultyChart({ difficulty }: Props) {
  return (
    <div className={styles.container}>
      {Object.entries(difficulty)
        .reverse()
        .map(([level, data]) => (
          <DifficultyLevelItem key={level} level={level} data={data} />
        ))}
    </div>
  );
}
