import styles from "./_question_form.module.scss";
import { Move } from "@/svg/QuizWriteForm/Move";
import { gray70 } from "@/styles/abstracts/colors.ts";
import { Trash } from "@/svg/QuizWriteForm/Trash";

interface QuizWriteFormItemHeaderProps {
  id: number;
  deleteQuizWriteForm: (id: number) => void;
  checkValidation: () => void;
}

export default function QuestionFormHeader({
  id,
  deleteQuizWriteForm,
}: QuizWriteFormItemHeaderProps) {
  return (
    <div className={styles["question-form-header"]}>
      <Move width={24} height={24} stroke={gray70} />
      <button
        className={styles["delete-quiz"]}
        onClick={() => deleteQuizWriteForm(id)}
      >
        <Trash width={24} height={24} stroke={gray70} />
      </button>
    </div>
  );
}
