import styles from "@/pages/CreateQuiz/composite/quizWriteForm/_quiz_write_form_item.module.scss";
import QuizWriteFormOptionItem from "@/pages/CreateQuiz/composite/quizWriteForm/quizWriteFormOptionItem.tsx";
import { RadioOption } from "@/types/RadioTypes.ts";
import { FC, useEffect, useState } from "react";
import { QuizFormMode } from "@/data/constants.ts";
import useRadioGroup from "@/hooks/useRadioGroup.ts";
import { useAtom } from "jotai";
import { BookQuizType } from "@/types/BookQuizType";
import { QuizCreationInfoAtom } from "@/store/quizAtom";

export const MultipleChoiceQuizForm: FC<{ quizMode?: string, questionFormId?: string }> = ({ quizMode, questionFormId }) => {
  const [options, setOptions] = useState<RadioOption[]>([]);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState<number | null>(null);
  const { selectedValue: selectedRadioGroupValue, handleChange: onRadioGroupChange } = useRadioGroup(null);
  const [, setQuizCreationInfo] = useAtom<BookQuizType>(QuizCreationInfoAtom);

  const deleteOption = (optionId: number) => {
    setOptions(options.filter((option) => option.id !== optionId));

    // TODO: onClickAddQuizOptionItem와 겹치는 로직 리팩토링 필요
    setQuizCreationInfo((prev) => {
      const updatedQuestions = prev.questions.map((question) => {
        if (question.id.toString() === questionFormId!) {
          return {
            ...question,
            selectOptions: question.selectOptions.filter((option)=> option.id !== optionId)
          };
        }
        return question;
      });

      return {
        ...prev,
        questions: updatedQuestions,
      };
    });
  };

  const handleOptionFocus = (id: number) => {
    setFocusedOptionIndex(id);
  };

  useEffect(() => {
    onRadioGroupChange(null);
  }, [quizMode]);

  const handleOptionBlur = () => {
    setFocusedOptionIndex(null);
  };
  const setText = (optionId: number, value: string) => {
    onRadioGroupChange(value);


    const updatedOptions = options.map((option) => {
      if (option.id === optionId) {
        return { ...option, label: value };
      }
      return option;
    });
    setOptions(updatedOptions);
    onRadioGroupChange(null); // value가 변경되면 라디오 버튼이 자동 선택되기 때문에 라디오 버튼 선택 해제
  };

  const handleRadioGroupChange = (value: string) => {
    onRadioGroupChange(value);
    setQuizCreationInfo((prev) => ({
      ...prev,
      questions: prev.questions.map((question) => question.id.toString() === questionFormId ? { ...question, answers: [value] } : question) // 해당 질문만 업데이트
    }));
  }

  const onClickAddQuizOptionItem = () => {
    //const id = Date.now();
    const id = options.length + 1;
    setOptions((prev) => [ 
      ...prev,
      {
        id: id,
        value: id.toString(),
        label: "",
      },
    ]);

    setQuizCreationInfo((prev) => {
      const updatedQuestions = prev.questions.map((question) => {
        if (question.id.toString() === questionFormId!) {
          return {
            ...question,
            selectOptions: [
              ...question.selectOptions,
              { id: id, option: "" , value: id.toString()},
            ],
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

  return (
    <fieldset className={styles["question-options"]}>
      <legend>답안 선택지</legend>
      {options.map((item) =>
        <QuizWriteFormOptionItem
          key={item.id}
          questionFormId={questionFormId!}
          option={item}
          deleteOption={deleteOption}
          focusedOptionIndex={focusedOptionIndex}
          handleOptionFocus={handleOptionFocus}
          handleOptionBlur={handleOptionBlur}
          quizMode={quizMode!}
          onChange={handleRadioGroupChange}
          setText={setText}
          selectedValue={selectedRadioGroupValue}
        />,
      )}
      {
        quizMode == QuizFormMode.QUESTION &&
        <AddOptionButton onAdd={onClickAddQuizOptionItem} />
      }
    </fieldset>
  );
};


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
