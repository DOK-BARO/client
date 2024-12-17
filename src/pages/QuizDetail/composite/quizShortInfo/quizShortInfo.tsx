import { QuizExplanationType } from "@/types/QuizType";
import styles from "./_quiz_short_info.module.scss";
import IconTextLabel from "../../../../components/composite/iconTextLabel/iconTextLabel";
import { StarFilled } from "@/svg/starFilled";
import { systemWarning } from "@/styles/abstracts/colors";
import barChart from "/assets/svg/quizDetail/bar-chart.svg";

interface Props {
  quizExplanation: QuizExplanationType;
  reviewCount: number;
  roundedAverageRating: number;
  averageDifficultyLabel: string;
}

export default function QuizShortInfo({
  quizExplanation,
  reviewCount,
  roundedAverageRating,
  averageDifficultyLabel,
}: Props) {
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
          icon={<img src={barChart} width={24} height={24} />}
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
