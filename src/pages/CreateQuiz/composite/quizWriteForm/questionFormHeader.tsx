import styles from "./_quiz_write_form_item.module.scss";
import Button from "@/components/atom/button/button.tsx";
import { Move } from "@/svg/quizWriteForm/move.tsx";
import { gray60, gray90 } from "@/styles/abstracts/colors.ts";
import { Trash } from "@/svg/quizWriteForm/trash.tsx";
import React from "react";

interface QuizWriteFormItemHeaderProps {
  id: number;
  quizMode: string;
  onQuizModeSelect: (e: React.MouseEvent<HTMLButtonElement>) => void;
  deleteQuizWriteForm: (id: number) => void;
  checkValidation: () => void;
}

export default function QuestionFormHeader({
  id,
  quizMode,
  onQuizModeSelect,
  deleteQuizWriteForm,
  checkValidation,
}: QuizWriteFormItemHeaderProps) {
  function QuestionFormUtilButtons() {
    return (
      <span>
        <button className={styles["move-quiz-button"]} onClick={() => {}}>
          <Move width={24} height={24} stroke={gray60} />
        </button>
        <button
          className={styles["delete-quiz-button"]}
          onClick={() => deleteQuizWriteForm(id)}
        >
          <Trash width={24} height={24} stroke={gray90} />
        </button>
      </span>
    );
  }

  const onSetAnswerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    checkValidation();
    onQuizModeSelect(e);
  };

  return (
    <div className={styles["write-quiz-header"]}>
      <div className={styles["quiz-mode-buttons"]}>
        <Button
          value="question"
          size="medium"
          color={quizMode === "question" ? "secondary" : "transparent"}
          onClick={onQuizModeSelect}
        >
          질문 설정
        </Button>
        <Button
          value="answer"
          size="medium"
          color={quizMode === "answer" ? "secondary" : "transparent"}
          onClick={onSetAnswerClick}
        >
          답안 설정
        </Button>
      </div>
      <QuestionFormUtilButtons />
    </div>
  );
}
