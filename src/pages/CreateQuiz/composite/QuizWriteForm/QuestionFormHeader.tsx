import styles from "./_question_form.module.scss";
import { Move } from "@/svg/QuizWriteForm/Move";
import { gray70 } from "@/styles/abstracts/colors.ts";
import { Trash } from "@/svg/QuizWriteForm/Trash";
import Button from "@/components/atom/Button/Button";

interface QuizWriteFormItemHeaderProps {
  id: number;
  deleteQuizWriteForm: (id: number) => void;
  checkValidation: () => void;
  dragHandleProps?: {
    attributes?: unknown;
    listeners?: unknown;
  };
}

export default function QuestionFormHeader({
  id,
  deleteQuizWriteForm,
  dragHandleProps,
}: QuizWriteFormItemHeaderProps) {
  return (
    <div className={styles["question-form-header"]}>
      <div
        {...(dragHandleProps?.attributes ?? {})}
        {...(dragHandleProps?.listeners ?? {})}
      >
        <Button
          iconOnly
          icon={<Move width={24} height={24} stroke={gray70} />}
        />
      </div>

      <button
        className={styles["delete-quiz"]}
        onClick={() => deleteQuizWriteForm(id)}
      >
        <Trash width={24} height={24} stroke={gray70} />
      </button>
    </div>
  );
}
