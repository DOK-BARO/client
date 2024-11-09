import { RadioOption } from "@/types/RadioTypes.ts";
import useInput from "@/hooks/useInput.ts";
import React from "react";
import styles from "./_quiz_write_form_option_item.module.scss";
import RadioButton from "@/components/atom/radioButton/radioButton.tsx";
import { Close } from "@/svg/close.tsx";
import { gray90 } from "@/styles/abstracts/colors.ts";
import { QuizFormMode } from "@/data/constants";
import { useAtom } from "jotai";
import { BookQuizType } from "@/types/BookQuizType";
import { QuizCreationInfoAtom } from "@/store/quizAtom";

interface QuizOptionItemProps {
  option: RadioOption;
  focusedOptionIndex: number | null;
  handleOptionFocus: (id: number) => void;
  handleOptionBlur: () => void;
  deleteOption: (id: number) => void;
  selectedValue: string | null;
  onChange: (value: string) => void;
  setText: (optionId: number, value: string) => void;
  questionFormId: string;
  quizMode: string;
}

export default function QuizWriteFormOptionItem({
  option,
  focusedOptionIndex,
  deleteOption,
  handleOptionFocus,
  handleOptionBlur,
  selectedValue,
  onChange,
  setText,
  questionFormId,
  quizMode,
}: QuizOptionItemProps) {
  const { onChange: onOptionChange, value: optionText } = useInput(option.value); // input임
  const [, setQuizCreationInfo] = useAtom<BookQuizType>(QuizCreationInfoAtom);

  const onTextAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onOptionChange(e);
    setText(option.id, e.target.value);

    setQuizCreationInfo((prev) => {
      const updatedQuestions = prev.questions.map((question) => {
        if (question.id.toString() === questionFormId!) {
          return {
            ...question,
            selectOptions: 
            question.selectOptions.map((selectOption) => {
                if(selectOption.id === option.id) {
                  return {...selectOption, option: e.target.value};
                }
                return selectOption;
            })
          };
        }
        return question; // 해당 질문이 아닐 경우 원래 질문을 반환
      });
  
      return {
        ...prev,
        questions: updatedQuestions,
      };
    });
  };


  const isChecked = selectedValue === optionText;


  return (
    <div key={option.id}
      className={`${styles["option-container"]} ${focusedOptionIndex === option.id ? styles["focused"] : ""} ${isChecked ? styles["checked"] : ""}`}
      onFocus={() => handleOptionFocus(option.id)}
      onBlur={handleOptionBlur}
    >
      <RadioButton
        radioGroupName={questionFormId}
        option={option}
        selectedValue={selectedValue}
        onChange={() => onChange(optionText)}
        isDisabled={quizMode === QuizFormMode.QUESTION}
        className={`${styles["new-option"]} ${focusedOptionIndex === option.id ? styles["focused"] : ""}`}
        autoFocus={true}
        LabelComponent={
          quizMode === QuizFormMode.QUESTION ?
            <input
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
      {quizMode === QuizFormMode.QUESTION
        &&
        <button
          className={styles["delete-option-button"]}
          onClick={() => {
            deleteOption(option.id);
          }}
        >
          <Close width={20} height={20} stroke={gray90} strokeWidth={2} />
        </button>
      }
    </div>
  );
}