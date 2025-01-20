import { DifficultyType } from "@/types/ReviewType";
import styles from "./_quiz_difficulty_chart.module.scss";
import DifficultyLevelItem from "../DifficultyLevelItem/DifficultyLevelItem";

interface Props {
  difficulty: DifficultyType;
}

export default function QuizDifficultyChart({ difficulty }: Props) {
  return (
    <div className={styles.container}>
      {difficulty
        ? Object.entries(difficulty)
          .reverse()
          .map(([level, data]) => (
            <DifficultyLevelItem key={level} level={level} data={data} />
          ))
        : [1, 2, 3].map((level) => (
          <DifficultyLevelItem
            key={level}
            level={level.toString()}
            data={{ selectCount: 0, selectRate: 0 }}
          />
        ))}
    </div>
  );
}
