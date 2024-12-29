import styles from "./_question_form.module.scss";
import Button from "@/components/atom/Button/Button";
import { Move } from "@/svg/quizWriteForm/Move";
import { gray60, gray90 } from "@/styles/abstracts/colors.ts";
import { Trash } from "@/svg/quizWriteForm/Trash";
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
      <span className={styles["util-button-area"]}>
        <button className={styles["move-quiz"]}>
          <Move width={24} height={24} stroke={gray60} />
        </button>
        <button
          className={styles["delete-quiz"]}
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
    <div className={styles["question-form-header"]}>
      <div className={styles["question-form-mode-button-area"]}>
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
