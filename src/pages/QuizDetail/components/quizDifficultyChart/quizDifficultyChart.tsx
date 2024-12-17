import { DifficultyType } from "@/types/ReviewType";
import styles from "./_quiz_difficulty_chart.module.scss";
import DifficultyLevelItem from "../difficultyLevelItem/difficultyLevelItem";

interface Props {
  difficulty: DifficultyType;
}

export default function DifficultyChart({ difficulty }: Props) {
  console.log(difficulty);
  return (
    <div className={styles.container}>
      {Object.entries(difficulty)
        .reverse()
        .map(([level, data]) => (
          <DifficultyLevelItem level={level} data={data} />
        ))}
    </div>
  );
}
