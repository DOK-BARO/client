import { RadioOption } from "@/types/RadioTypes.ts";
import useInput from "@/hooks/useInput.ts";
import React from "react";
import styles from "./_quiz_write_form_option_item.module.scss";
import RadioButton from "@/components/atom/radioButton/radioButton.tsx";
import { Close } from "@/svg/close.tsx";
import { gray90 } from "@/styles/abstracts/colors.ts";
import { QuestionFormMode } from "@/data/constants";
import useUpdateQuizCreationInfo from "@/hooks/useUpdateQuizCreationInfo";
import { BookQuizQuestionType } from "@/types/QuizType";

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

export default function SelectOptionMultipleChoice({
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
  const { onChange: onOptionChange, value: optionText } = useInput(option.label); // input임
  const { quizCreationInfo, updateQuizCreationInfo } = useUpdateQuizCreationInfo();

  const onTextAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //FIXME: quizWriteFormCheckBoxOptionItem.tsx와 로직 동일
    onOptionChange(e);
    setText(option.id, e.target.value);

    const updatedQuestions: BookQuizQuestionType[] = quizCreationInfo.questions?.map((question) => {
      if (question.id.toString() === questionFormId!) {
        return {
          ...question,
          selectOptions:
            question.selectOptions.map((selectOption) => {
              if (selectOption.id === option.id) {
                return { ...selectOption, option: e.target.value };
              }
              return selectOption;
            })
        };
      }
      return question;
    }) ?? [];
    updateQuizCreationInfo("questions", updatedQuestions);

  };


  const isChecked = selectedValue === option.value;


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
        onChange={() => onChange(option.value)}
        isDisabled={quizMode === QuestionFormMode.QUESTION}
        className={`${styles["new-option"]} ${focusedOptionIndex === option.id ? styles["focused"] : ""}`}
        autoFocus={true}
        LabelComponent={
          quizMode === QuestionFormMode.QUESTION ?
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
      {quizMode === QuestionFormMode.QUESTION
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