import React, { useState } from "react";
import { CheckBoxOptionType } from "@/types/CheckBoxTypes";
import styles from "./_question_form.module.scss";
import CheckBox from "@/components/atom/Checkbox/Checkbox";
import useUpdateQuizCreationInfo from "@/hooks/useUpdateQuizCreationInfo";
import { AnswerType, QuizQuestionFormType } from "@/types/QuizType";
import { RadioOptionType } from "@/types/RadioTypes";
import RadioOption from "@/components/atom/RadioOption/RadioOption";
import useAutoResizeTextarea from "@/hooks/useAutoResizeTextArea";
import { isFirstVisitAtom, quizGuideStepAtom } from "@/store/quizAtom";
import { useAtom } from "jotai";
interface Props {
  option: RadioOptionType | CheckBoxOptionType;
  deleteOption: (id: number) => void;
  selectedValue: string | null | { [key: string]: boolean };
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setText: (optionId: number, value: string) => void;
  questionFormId: string;
  answerType: AnswerType;
  checked?: boolean;
}

const SelectOption: React.FC<Props> = ({
  option,
  deleteOption,
  selectedValue,
  onChange,
  setText,
  questionFormId,
  answerType,
  checked,
}) => {
  const [isFirstVisit] = useAtom(isFirstVisitAtom);
  const { quizCreationInfo, updateQuizCreationInfo } =
    useUpdateQuizCreationInfo();
  const {
    value: optionText,
    onChange: onOptionChange,
    textareaRef,
  } = useAutoResizeTextarea(option.label, 23);

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onOptionChange(e);
    setText(option.id, e.target.value);

    const updatedQuestions: QuizQuestionFormType[] =
      quizCreationInfo.questions?.map((question) => {
        if (question.id!.toString() === questionFormId!) {
          return {
            ...question,
            selectOptions: question.selectOptions.map((selectOption) => {
              if (selectOption.id === option.id) {
                return { ...selectOption, option: e.target.value };
              }
              return selectOption;
            }),
          };
        }
        return question;
      }) ?? [];

    updateQuizCreationInfo("questions", updatedQuestions);
  };

  const isChecked =
    typeof selectedValue === "string"
      ? selectedValue === option.value
      : selectedValue
        ? selectedValue[option.id]
        : false;
  const [currentQuizGuideStep] = useAtom(quizGuideStepAtom);
  const isEditMode =
    localStorage.getItem("isEditMode") == "true" ? true : false;

  const [currentWritingOptionId, setCurrentWritingOptionId] =
    useState<number>();

  const handleFocus = () => {
    setCurrentWritingOptionId(option.id);
  };
  const handleBlur = () => {
    setCurrentWritingOptionId(undefined);
  };
  const isCurrentWriting = currentWritingOptionId === option.id;

  return (
    <div
      key={option.id}
      className={styles["option-container"]}
      style={
        isFirstVisit && !isEditMode && currentQuizGuideStep == 2
          ? { position: "relative", zIndex: 999 }
          : {}
      }
    >
      {answerType === "MULTIPLE_CHOICE_SINGLE_ANSWER" ? (
        <RadioOption
          data-no-dnd="true"
          radioGroupName={questionFormId}
          option={option as RadioOptionType}
          checked={isChecked}
          onChange={onChange}
          disabled={false}
          labelValue={optionText}
          onLabelValueChange={handleTextAreaChange}
          type={
            isChecked
              ? "option-correct"
              : isCurrentWriting
                ? "option-writing"
                : "option-written"
          }
          deleteOption={deleteOption}
          onFocus={handleFocus}
          onBlur={handleBlur}
          textAreaRef={textareaRef}
        />
      ) : (
        <CheckBox
          id={option.id.toString()}
          checked={checked!}
          onChange={onChange}
          disabled={false}
          value={optionText}
          onLabelValueChange={handleTextAreaChange}
          type={
            isChecked
              ? "checkbox-correct"
              : isCurrentWriting
                ? "checkbox-writing"
                : "checkbox-written"
          }
          deleteOption={deleteOption}
          onFocus={handleFocus}
          onBlur={handleBlur}
          textAreaRef={textareaRef}
        />
      )}
    </div>
  );
};

export default SelectOption;
