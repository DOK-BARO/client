import { QuizExplanationType } from "@/types/QuizType";
import styles from "./_quiz_explanation.module.scss";
import IconTextLabel from "../../../../components/composite/iconTextLabel/iconTextLabel";

export default function QuizExplanation({
  quizExplanation,
}: {
  quizExplanation: QuizExplanationType;
}) {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{quizExplanation.title}</h2>
      <span className={styles["iconTextLabel-container"]}>
        <IconTextLabel icon={<div>dd</div>} labelText="쉬움" />
        <span className={styles.divider} />
        <IconTextLabel icon={<div>dd</div>} labelText="쉬움" />
        <span className={styles.divider} />
        <IconTextLabel icon={<div>dd</div>} labelText="쉬움" />
      </span>
      <p className={styles.description}>{quizExplanation.description}</p>
    </section>
  );
}
