import { QuizExplanationType } from "@/types/QuizType";
import styles from "./_quiz_short_info.module.scss";
import IconTextLabel from "../../../../components/composite/iconTextLabel/iconTextLabel";
import { StarFilled } from "@/svg/starFilled";
import { systemWarning } from "@/styles/abstracts/colors";
import { BarChart } from "@/svg/barChart";
import {
  levelMapping,
  LevelType,
} from "../../components/difficultyLevelItem/difficultyLevelItem";

interface Props {
  quizExplanation: QuizExplanationType;
  reviewCount: number;
  roundedAverageRating: number;
  averageDifficulty: number;
}

export default function QuizShortInfo({
  quizExplanation,
  reviewCount,
  roundedAverageRating,
  averageDifficulty,
}: Props) {
  const averageDifficultyLabel =
    levelMapping[averageDifficulty.toString() as LevelType];

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{quizExplanation.title}</h2>
      <span className={styles["iconTextLabel-container"]}>
        <IconTextLabel
          icon={<StarFilled width={20} height={20} fill={systemWarning} />}
          labelText={
            <p className={styles["rating-text"]}>
              {roundedAverageRating}
              <b>/5 ({reviewCount}개의 후기)</b>
            </p>
          }
        />
        <span className={styles.divider} />
        <IconTextLabel
          icon={<BarChart alt="어려움 레벨" level={averageDifficulty} />}
          labelText={averageDifficultyLabel}
        />
        <span className={styles.divider} />
        <IconTextLabel
          icon={
            <div className={styles["creator-profile-image"]}>
              <img
                src={quizExplanation.creator.profileImageUrl}
                width={26}
                height={26}
              />
            </div>
          }
          labelText={quizExplanation.creator.nickname}
        />
      </span>
      <p className={styles.description}>{quizExplanation.description}</p>
    </section>
  );
}
