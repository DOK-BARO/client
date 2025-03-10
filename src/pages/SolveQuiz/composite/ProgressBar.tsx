import { SolvingQuizQuestionType } from "@/types/QuizType";
import styles from "./_progress_bar.module.scss";
import { Check } from "@/svg/Check";
import { gray00 } from "@/styles/abstracts/colors";
import { Close } from "@/svg/Close";
interface Props {
  questions: SolvingQuizQuestionType[];
  currentStep: number;
  isAnswerCorrects: boolean[];
}
export default function ProgressBar({
  currentStep,
  questions,
  isAnswerCorrects,
}: Props) {
  return (
    <section className={styles["progress-bar"]}>
      {questions.map((_, index) => {
        const questionIndex = index + 1;
        const isCurrent = currentStep === questionIndex;
        let isCorrect;
        const isCheckedAnswer = isAnswerCorrects[index] !== undefined;
        let className = styles["step"];
        if (isCurrent) {
          className = styles["current-step"];
        }
        if (isCheckedAnswer) {
          isCorrect = isAnswerCorrects[index];
          if (isCorrect) {
            className = styles["correct-step"];
          } else {
            className = styles["incorrect-step"];
          }
        }
        return (
          <div key={index} className={styles["step-container"]}>
            <div className={className}>
              {isCheckedAnswer &&
                (isCorrect ? (
                  <Check stroke={gray00} width={26} height={26} alt="" />
                ) : (
                  <Close
                    stroke={gray00}
                    width={26}
                    height={26}
                    strokeWidth={2.1}
                    alt=""
                  />
                ))}
              {!isCheckedAnswer && questionIndex}
            </div>
            <div className={styles["step-bar"]}></div>
          </div>
        );
      })}
    </section>
  );
}
