import React, { useState } from "react";
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
import { RadioOptions } from "@/types/RadioTypes.ts";
import useRadioGroup from "@/hooks/useRadioGroup.ts";

interface QuizWriteFormItemProps {
  id: number;
  deleteQuizWriteForm: (id: number) => void;
}

// interface QuizOptionItemType {
//   id: number;
//   component: ReactNode;
// }

export default function QuizWriteFormItem({ id, deleteQuizWriteForm }: QuizWriteFormItemProps) {
  const [quizMode, setQuizMode] = useState<string>("question"); // 질문 작성 or 답안 작성
  const { onChange: onQuestionChange, value: question } = useInput("");
  //const [optionList, setOptionList] = useState<QuizOptionItemType[]>([]);
  const [options, setOptions] = useState<RadioOptions[]>([]);
  const { selectedValue:selectedRadioGroupValue, handleChange: handleRadioGroupChange } = useRadioGroup("");

  const [focusedOptionIndex, setFocusedOptionIndex] = useState<number | null>(null);
  const { value:answerTextAreaValue,onChange:onAnswerTextAreaChange }= useTextarea("");

  const onQuizModeSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
    // TODO: 답안 설정 클릭 시
    // TODO : 옵션리스트 텍스트 라벨 못씀
    // TODO: 옵션 리스트 클릭 시 답안으로 설정됨
    setQuizMode(e.currentTarget.value);
  };

  const setText = (optionId: number, value: string) => {
    handleRadioGroupChange(value);
    const updatedOptions = options.map((option) => {
      if(option.id === optionId) {
        return { ...option, value, label: value };
      }
      return option;
    });
    setOptions(updatedOptions);
  };

  const onClickAddQuizOptionItem = () => {
    const id = Date.now();
    console.log("%o",options);
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
    console.log("지워질 optionId:"+optionId );

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
          <QuizWriteFormTypeUtilButton/>
          <Input
            className={styles["question"]}
            value={question}
            onChange={onQuestionChange}
            id="option"
            placeholder="질문을 입력해주세요."
          />
        </div>
        {/*{optionList.map((item) =>*/}
        <fieldset className={styles["question-options"]}>
          <legend>답안 선택지</legend>
          {options.map((item) =>
            <QuizWriteFormOptionItem
              key={item.id}
              id={item.id}
              deleteOption={deleteOption}
              focusedOptionIndex={focusedOptionIndex}
              handleOptionFocus={handleOptionFocus}
              handleOptionBlur={handleOptionBlur}
              isQuestionType={quizMode === "question"}
              onChange={handleRadioGroupChange}
              setText={setText}
              selectedValue={selectedRadioGroupValue}
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
  isQuestionType: boolean; // TODO: 변수명 직관적으로 변경 필요
  selectedValue: string;
  onChange: (value: string) => void;
  setText: (optionId: number, value: string) => void;
}

function QuizWriteFormOptionItem({ id, focusedOptionIndex, deleteOption, handleOptionFocus, handleOptionBlur, isQuestionType, selectedValue, onChange,setText }: QuizOptionItemProps) {
  const { onChange: onOptionChange, value: option } = useInput("");

  const onTextAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onOptionChange(e);
    setText(id, e.target.value);
  };

  return (
    <div key={id}
      className={`${styles["option-container"]} ${focusedOptionIndex === id ? styles["focused"] : ""}`}
      onFocus={() => handleOptionFocus(id)}
      onBlur={handleOptionBlur} 
    >
      <label key={id} className={styles["option-label"]}>
        <input
          type="radio"
          disabled={isQuestionType}
          id={`option-${id}`}
          value={option}
          checked={selectedValue === option}
          onChange={() => onChange(option)}
          className={`${styles["new-option"]} ${focusedOptionIndex === id ? styles["focused"] : ""}`}
          autoFocus
        />
        { // TODO: 코드 분리 필요
          isQuestionType && 
            <input
              disabled={!isQuestionType}
              id={`${id}`}
              name={"radio-group"}
              value={option}
              //onChange={onOptionChange}
              onChange={onTextAreaChange}
              className={`${styles["new-option"]} ${focusedOptionIndex === id ? styles["focused"] : ""}`}
              // placeholder="선택지를 입력해주세요"
              autoFocus
            />
        }
        {
          !isQuestionType &&
            <div>{option}</div>
        }
      </label>
      <button
        className={styles["delete-option-button"]}
        onClick={() =>{
          deleteOption(id);
        }}
      >
        <Close width={20} height={20} stroke={gray90} strokeWidth={2}/>
      </button>
    </div>
  );
}