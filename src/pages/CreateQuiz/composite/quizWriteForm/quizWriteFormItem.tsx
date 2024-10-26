import React, { useState } from "react";
import useInput from "@/hooks/useInput.ts";
import styles from "./_quiz_write_form_item.module.scss";
import QuizWriteFormTypeUtilButton from "@/pages/CreateQuiz/composite/quizWriteForm/quizWriteFormTypeUtilButton.tsx";
import Input from "@/components/atom/input/input.tsx";
import Textarea from "@/components/atom/textarea/textarea.tsx";
import useTextarea from "@/hooks/useTextarea.ts";
import { ImageAdd } from "@/svg/quizWriteForm/imageAdd.tsx";
import QuizWriteFormItemHeader from "@/pages/CreateQuiz/composite/quizWriteForm/quizWriteFormItemHeader.tsx";
import { RadioOption } from "@/types/RadioTypes.ts";
import useRadioGroup from "@/hooks/useRadioGroup.ts";
import { QuizFormMode } from "@/data/constants.ts";
import QuizWriteFormOptionItem from "@/pages/CreateQuiz/composite/quizWriteForm/quizWriteFormOptionItem.tsx";

interface QuizWriteFormItemProps {
  id: number;
  deleteQuizWriteForm: (id: number) => void;
}

export default function QuizWriteFormItem({ id, deleteQuizWriteForm }: QuizWriteFormItemProps) {
  const [quizMode, setQuizMode] = useState<string>(QuizFormMode.QUESTION);
  const disabled : boolean = quizMode === QuizFormMode.QUESTION;

  const { onChange: onQuestionChange, value: question } = useInput("");
  const [options, setOptions] = useState<RadioOption[]>([]);
  const { selectedValue: selectedRadioGroupValue, handleChange: handleRadioGroupChange } = useRadioGroup("");

  const [focusedOptionIndex, setFocusedOptionIndex] = useState<number | null>(null);
  const { value: answerTextAreaValue, onChange: onAnswerTextAreaChange } = useTextarea("");

  const onQuizModeSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
    setQuizMode(e.currentTarget.value);
  };

  const setText = (optionId: number, value: string) => {
    handleRadioGroupChange(value);
    const updatedOptions = options.map((option) => {
      if (option.id === optionId) {
        return { ...option, value, label: value };
      }
      return option;
    });
    setOptions(updatedOptions);
  };

  const onClickAddQuizOptionItem = () => {
    const id = Date.now();
    setOptions((prev) => [
      ...prev,
      {
        id: id,
        value: "",
        label: "",
      },
    ]);
  };

  const handleOptionFocus = (id: number) => {
    setFocusedOptionIndex(id);
  };

  const handleOptionBlur = () => {
    setFocusedOptionIndex(null);
  };

  const deleteOption = (optionId: number) => {
    setOptions(options.filter((option) => option.id !== optionId));
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
          <QuizWriteFormTypeUtilButton />
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
          {options.map((item) =>
            <QuizWriteFormOptionItem
              key={item.id}
              option={item}
              deleteOption={deleteOption}
              focusedOptionIndex={focusedOptionIndex}
              handleOptionFocus={handleOptionFocus}
              handleOptionBlur={handleOptionBlur}
              disabled={disabled}
              onChange={handleRadioGroupChange}
              setText={setText}
              selectedValue={selectedRadioGroupValue}
            />,
          )}
          <AddOptionButton onAdd={onClickAddQuizOptionItem}/>
        </fieldset>
      </div>

      {
        quizMode === QuizFormMode.ANSWER &&
        <div className={styles["quiz-mode-answer-container"]}>
          <div className={styles["quiz-mode-answer-header"]}>
            <span>답안 설명</span>
            <button
              className={styles["image-add-button"]}
            ><ImageAdd width={24} height={24}/></button>
          </div>
          <Textarea
            className={styles["quiz-mode-answer-text-area"]}
            id={QuizFormMode.ANSWER}
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
        <div className={styles["option-add-button-check-circle"]}/>
        <span>옵션 추가하기</span>
      </button>
    </div>
  );
}
