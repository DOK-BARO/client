import React, { useState } from "react";
import useInput from "@/hooks/useInput.ts";
import styles from "./_quiz_write_form_item.module.scss";
import Button from "@/components/atom/button/button.tsx";
import { Move } from "@/svg/quizWriteForm/move.tsx";
import { Trash } from "@/svg/quizWriteForm/trash.tsx";
import QuizWriteFormTypeUtilButton from "@/pages/CreateQuiz/composite/quizWriteForm/quizWriteFormTypeUtilButton.tsx";
import Input from "@/components/atom/input/input.tsx";
import { gray60, gray90 } from "@/styles/abstracts/colors.ts";

interface QuizWriteFormItemProps {
  id: number;
  deleteQuizWriteForm: (id: number) => void;
}

export default function QuizWriteFormItem ({ id, deleteQuizWriteForm }: QuizWriteFormItemProps) {
  const [quizMode, setQuizMode] = useState<string>("question"); // 질문 작성 or 답안 작성
  const { onChange: onQuestionChange, value: question } = useInput("");
  const { onChange: onOptionChange, value: option, resetInput } = useInput("");
  const [optionList, setOptionList] = useState<string[]>([]);

  const onQuizModeSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
    setQuizMode(e.currentTarget.value);
  };

  // 옵션 추가 인풋창에 옵션(선지) 입력 후 엔터 눌렀을 때 등록
  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.key === "Enter") {
      setOptionList([...optionList, e.currentTarget.value]);
      resetInput("");
    }
  };

  return (
    <div className={styles["write-quiz"]}>
      <div className={styles["write-quiz-header"]}>
        <div className={styles["quiz-mode-buttons"]}>
          <Button
            value="question"
            size="medium"
            className={`${styles["set-quiz"]} ${
              quizMode === "question" ? styles["active"] : ""
            }`}
            onClick={onQuizModeSelect}
          >
            질문 설정
          </Button>
          <Button
            value="answer"
            size="medium"
            className={`${styles["set-answer"]} ${
              quizMode === "answer" ? styles["active"] : ""
            }`}
            onClick={onQuizModeSelect}
          >
            답안 설정
          </Button>
        </div>
        <span>
          <button
            className={styles["move-quiz-button"]}
            onClick={() => {}}>
            <Move width={24} height={24} stroke={gray60}/>
          </button>
          <button
            className={styles["delete-quiz-button"]}
            onClick={() => deleteQuizWriteForm(id)}>
            <Trash width={24} height={24} stroke={gray90}/>
          </button>
        </span>
      </div>
      <div className={styles["input-container"]}>

        <QuizWriteFormTypeUtilButton />

        <Input
          className={styles["question"]}
          value={question}
          onChange={onQuestionChange}
          id="option"
          placeholder="질문을 입력해주세요."
        />
      </div>
      {/* TODO: 컴포넌트 분리하기 */}
      <fieldset className={styles["question-options"]}>
        <legend>답안 선택지</legend>

        {optionList.map((option: string) => (
          <div key={option} className={styles["option-container"]}>
            <div className={styles["option-check-circle"]}/>
            <span className={styles["option-label"]}>{option}</span>
          </div>
        ))}
        <div className={styles["option-container"]}>
          <div className={styles["option-check-circle"]}/>
          <input
            id="option"
            value={option}
            onKeyDown={onEnter}
            onChange={onOptionChange}
            className={styles["new-option"]}
            placeholder="옵션 추가하기"
            autoFocus
          />
        </div>
      </fieldset>
    </div>
  );
}