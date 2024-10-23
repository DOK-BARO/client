import React, { ReactNode, useState } from "react";
import useInput from "@/hooks/useInput.ts";
import styles from "./_quiz_write_form_item.module.scss";
import QuizWriteFormTypeUtilButton from "@/pages/CreateQuiz/composite/quizWriteForm/quizWriteFormTypeUtilButton.tsx";
import Input from "@/components/atom/input/input.tsx";
import { gray90 } from "@/styles/abstracts/colors.ts";
import { Close } from "@/svg/close.tsx";
import Textarea from "@/components/atom/textarea/textarea.tsx";
import useTextarea from "@/hooks/useTextarea.ts";
import { ImageAdd } from "@/svg/quizWriteForm/imageAdd.tsx";
import QuizWriteFormItemHeader from "@/pages/CreateQuiz/composite/quizWriteForm/quizWriteFormItemHeader.tsx";

interface QuizWriteFormItemProps {
  id: number;
  deleteQuizWriteForm: (id: number) => void;
}

interface QuizOptionItemType {
  id: number;
  component: ReactNode;
}

export default function QuizWriteFormItem({ id, deleteQuizWriteForm }: QuizWriteFormItemProps) {
  const [quizMode, setQuizMode] = useState<string>("question"); // 질문 작성 or 답안 작성
  const { onChange: onQuestionChange, value: question } = useInput("");
  const [optionList, setOptionList] = useState<QuizOptionItemType[]>([]);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState<number | null>(null);
  const { value:answerTextAreaValue,onChange:onAnswerTextAreaChange }= useTextarea("");

  const onQuizModeSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
    // TODO: 답안 설정 클릭 시
    // TODO : 옵션리스트 텍스트 라벨 못씀
    // TODO: 답안 설명란 생김
    // TODO: 옵션 리스트 클릭 시 답안으로 설정됨
    setQuizMode(e.currentTarget.value);
  };

  const onClickAddQuizOptionItem = () => {
    const id = Date.now();
    setOptionList((prev) => [
      ...prev,
      {
        id: id,
        component: <QuizWriteFormOptionItem id={id} deleteOption={deleteOption} focusedOptionIndex={focusedOptionIndex}
          handleOptionFocus={handleOptionFocus}
          handleOptionBlur={handleOptionBlur}                                  
        />,
      },
    ]);
  };

  const handleOptionFocus = (id: number) => {
    console.log(id);
    setFocusedOptionIndex(id);
  };

  const handleOptionBlur = () => {
    setFocusedOptionIndex(null);
  };

  const deleteOption = (optionId: number) => {
    setOptionList(optionList.filter((item) => item.id !== optionId));
  };


  return (
    <div className={styles["write-quiz"]}>
      <QuizWriteFormItemHeader
        id={id}
        quizMode={quizMode}
        onQuizModeSelect={onQuizModeSelect}
        deleteQuizWriteForm={deleteQuizWriteForm}
      />

      <div>
        <div className={styles["input-container"]}>
          <QuizWriteFormTypeUtilButton/>
          <Input
            className={styles["question"]}
            value={question}
            onChange={onQuestionChange}
            id="option"
            placeholder="질문을 입력해주세요."
          />
        </div>

        <fieldset className={styles["question-options"]}>
          <legend>답안 선택지</legend>
          {optionList.map((item) =>
            <QuizWriteFormOptionItem
              id={item.id}
              deleteOption={deleteOption} focusedOptionIndex={focusedOptionIndex}
              handleOptionFocus={handleOptionFocus}
              handleOptionBlur={handleOptionBlur}
            />,
          )}
          <AddOptionButton onAdd={onClickAddQuizOptionItem}/>
        </fieldset>
      </div>

      {
        quizMode === "answer" && 
        <div className={styles["quiz-mode-answer-container"]}>
          <div className={styles["quiz-mode-answer-header"]}>
            <span>답안 설명</span>
            <button
              className={styles["image-add-button"]}
            ><ImageAdd width={24} height={24}/></button>
          </div>
          <Textarea
            className={styles["quiz-mode-answer-text-area"]}
            id={"answer"}
            onChange={onAnswerTextAreaChange}
            value={answerTextAreaValue}
            placeholder={"답안에 대한 설명을 입력해주세요"}
          />
        </div>
      }
    </div>
  );
}


function AddOptionButton({ onAdd }: { onAdd: () => void }) {

  return (
    <div className={styles["option-add-button-container"]}>
      <button
        className={styles["option-add-button"]}
        onClick={onAdd}>
        <div className={styles["option-add-button-check-circle"]} />
        <span>옵션 추가하기</span>
      </button>
    </div>
  );
}

interface QuizOptionItemProps {
  id: number;
  focusedOptionIndex: number | null;
  handleOptionFocus: (id: number) => void;
  handleOptionBlur: ( )=> void;
  deleteOption: (id: number) => void;
}

function QuizWriteFormOptionItem({ id, focusedOptionIndex, deleteOption, handleOptionFocus, handleOptionBlur }: QuizOptionItemProps) {
  const { onChange: onOptionChange, value: option } = useInput("");

  return (
    <div key={id}
      className={`${styles["option-container"]} ${focusedOptionIndex === id ? styles["focused"] : ""}`}
      onFocus={() => handleOptionFocus(id)}
      onBlur={handleOptionBlur}
    >
      <div className={styles["option-label"]}>
        <div className={styles["option-check-circle"]}/>
        <input
          id="option"
          value={option}
          onChange={onOptionChange}
          className={`${styles["new-option"]} ${focusedOptionIndex === id ? styles["focused"] : ""}`}
          // placeholder="선택지를 입력해주세요"
          autoFocus
        />
      </div>
      <button
        className={styles["delete-option-button"]}
        onClick={() => deleteOption(id)}
      >
        <Close width={20} height={20} stroke={gray90} strokeWidth={2}/>
      </button>
    </div>
  );
}