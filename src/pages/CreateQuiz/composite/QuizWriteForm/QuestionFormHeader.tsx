import styles from "./_question_form.module.scss";
import { Move } from "@/svg/QuizWriteForm/Move";
import { gray70 } from "@/styles/abstracts/colors.ts";
import { Trash } from "@/svg/QuizWriteForm/Trash";
import Button from "@/components/atom/Button/Button";

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
      <div data-allow-dnd="true">
        <Button
          iconOnly
          icon={<Move width={24} height={24} stroke={gray70} />}
        />
      </div>
      <Button
        iconOnly
        onClick={() => {
          deleteQuizWriteForm(id);
        }}
        icon={<Trash width={24} height={24} stroke={gray70} />}
      />
    </div>
  );
}
