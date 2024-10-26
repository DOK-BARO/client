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
import { RadioOption } from "@/types/RadioTypes.ts";
import useRadioGroup from "@/hooks/useRadioGroup.ts";
import RadioButton from "@/components/atom/radioButton/radioButton.tsx";
import { QuizFormMode } from "@/data/constants.ts";

interface QuizWriteFormItemProps {
  id: number;
  deleteQuizWriteForm: (id: number) => void;
}

export default function QuizWriteFormItem({ id, deleteQuizWriteForm }: QuizWriteFormItemProps) {
  const [quizMode, setQuizMode] = useState<string>(QuizFormMode.QUESTION);
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
    console.log("%o", options);
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
              option={item}
              deleteOption={deleteOption}
              focusedOptionIndex={focusedOptionIndex}
              handleOptionFocus={handleOptionFocus}
              handleOptionBlur={handleOptionBlur}
              isQuestionType={quizMode === QuizFormMode.QUESTION}
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

interface QuizOptionItemProps {
  //id: number;
  option: RadioOption;
  focusedOptionIndex: number | null;
  handleOptionFocus: (id: number) => void;
  handleOptionBlur: () => void;
  deleteOption: (id: number) => void;
  isQuestionType: boolean; // TODO: 변수명 직관적으로 변경 필요
  selectedValue: string;
  onChange: (value: string) => void;
  setText: (optionId: number, value: string) => void;
}

function QuizWriteFormOptionItem({
  option,
  focusedOptionIndex,
  deleteOption,
  handleOptionFocus,
  handleOptionBlur,
  isQuestionType,
  selectedValue,
  onChange,
  setText,
}: QuizOptionItemProps) {
  const { onChange: onOptionChange, value: optionText } = useInput(option.value); // input임

  const onTextAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onOptionChange(e);
    setText(option.id, e.target.value);
  };

  return (
    <div key={option.id}
      className={`${styles["option-container"]} ${focusedOptionIndex === option.id ? styles["focused"] : ""}`}
      onFocus={() => handleOptionFocus(option.id)}
      onBlur={handleOptionBlur}
    >
      <RadioButton
        option={option}
        selectedValue={selectedValue}
        onChange={() => onChange(optionText)}
        isDisabled={isQuestionType}
        className={`${styles["new-option"]} ${focusedOptionIndex === option.id ? styles["focused"] : ""}`}
        autoFocus={true}
        LabelComponent={
          isQuestionType ?
            <input
              disabled={!isQuestionType}
              id={`${option.id}`}
              name={"radio-group"}
              value={optionText}
              onChange={onTextAreaChange}
              className={`${styles["new-option-text-input"]} ${focusedOptionIndex === option.id ? styles["focused"] : ""}`}
              autoFocus
            /> :
            <div className={`${styles["new-option-label"]}`}>{optionText}</div>
        }
      />

      {/*<label key={id} className={styles["radio-button-item"]}>*/}
      {/*  <input*/}
      {/*    type="radio"*/}
      {/*    disabled={isQuestionType}*/}
      {/*    id={`option-${id}`}*/}
      {/*    value={option}*/}
      {/*    checked={selectedValue === option}*/}
      {/*    onChange={() => onChange(option)}*/}
      {/*    className={`${styles["new-option"]} ${focusedOptionIndex === id ? styles["focused"] : ""}`}*/}
      {/*    autoFocus*/}
      {/*  />*/}
      {/*  { // TODO: 코드 분리 필요*/}
      {/*    isQuestionType &&*/}
      {/*    <input*/}
      {/*      disabled={!isQuestionType}*/}
      {/*      id={`${id}`}*/}
      {/*      name={"radio-group"}*/}
      {/*      value={option}*/}
      {/*      //onChange={onOptionChange}*/}
      {/*      onChange={onTextAreaChange}*/}
      {/*      className={`${styles["new-option-text-input"]} ${focusedOptionIndex === id ? styles["focused"] : ""}`}*/}
      {/*      // placeholder="선택지를 입력해주세요"*/}
      {/*      autoFocus*/}
      {/*    />*/}
      {/*  }*/}
      {/*  {*/}
      {/*    !isQuestionType &&*/}
      {/*    <div className={`${styles["new-option-label"]}`}>{option}</div>*/}
      {/*  }*/}
      {/*</label>*/}
      <button
        className={styles["delete-option-button"]}
        onClick={() => {
          deleteOption(option.id);
        }}
      >
        <Close width={20} height={20} stroke={gray90} strokeWidth={2}/>
      </button>
    </div>
  );
}