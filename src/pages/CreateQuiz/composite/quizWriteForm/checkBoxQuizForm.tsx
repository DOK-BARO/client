import { FC, useState } from "react";
import styles from "@/pages/CreateQuiz/composite/quizWriteForm/_quiz_write_form_item.module.scss";
import { QuizFormMode } from "@/data/constants.ts";
import { CheckBoxOption } from "@/types/CheckBoxTypes.ts";
import QuizWriteFormCheckBoxOptionItem
  from "@/pages/CreateQuiz/composite/quizWriteForm/quizWriteFormCheckBoxOptionItem.tsx";
import { useAtom } from "jotai";
import { BookQuizType } from "@/types/BookQuizType";
import { QuizCreationInfoAtom } from "@/store/quizAtom";

// TODO: multipleChoiceQuizForm과 겹치는 부분 리팩토링 필요
export const CheckBoxQuizForm: FC<{ quizMode?: string, questionFormId?:string }> = ({ quizMode,questionFormId }) => {
  const [options, setOptions] = useState<CheckBoxOption[]>([]);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState<number | null>(null);
  const [checkedOptions, setCheckedOptions] = useState<{[key:string]: boolean}>({});
  const [, setQuizCreationInfo] = useAtom<BookQuizType>(QuizCreationInfoAtom);

  const disabled: boolean = quizMode === QuizFormMode.QUESTION;
  const deleteOption = (optionId: number) => {
    setOptions(options.filter((option) => option.id !== optionId));

    setQuizCreationInfo((prev) => {
      const updatedQuestions = prev.questions.map((question) => {
        if (question.id.toString() === questionFormId!) {
          return {
            ...question,
            selectOptions: question.selectOptions.filter((option)=> option.id !== optionId),
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

    setQuizCreationInfo((prev) => {
      const updatedQuestions = prev.questions.map((question) => {
        if (question.id.toString() === questionFormId) {
          return {
            ...question,
            selectOptions: [
              ...question.selectOptions,
              { id: id, option: "" }, // 새로운 옵션 추가
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


  const handleOptionFocus = (id: number) => {
    setFocusedOptionIndex(id);
  };
  const handleOptionBlur = () => {
    setFocusedOptionIndex(null);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked, value } = event.target;
    console.log("onChange: ",id, checked);
    setCheckedOptions((prev) => {
      return {
        ...prev,
        [id]: checked,
      };
    });

    setQuizCreationInfo((prev) => ({
      ...prev,
      questions: prev.questions.map((question) => 
        question.id.toString() === questionFormId 
      ?
      { ...question, 
        answers: checked
              ? [...question.answers,value ]
              : question.answers.filter((answer) => answer !== value),
      } 
      :
       question)
    }));
  };

  const setText = (optionId: number, value: string) => {
    //onChange();
    const updatedOptions = options.map((option) => {
      if (option.id === optionId) {
        return { ...option, value, label: value };
      }
      return option;
    });
    setOptions(updatedOptions);
  };

  return (
    <fieldset className={styles["question-options"]}>
      <legend>답안 선택지</legend>
      {options.map((option) =>
        <QuizWriteFormCheckBoxOptionItem
          key={option.id}
          option={option}
          checked={checkedOptions[option.id]}
          deleteOption={deleteOption}
          focusedOptionIndex={focusedOptionIndex}
          handleOptionFocus={handleOptionFocus}
          handleOptionBlur={handleOptionBlur}
          disabled={disabled}
          onChange={onChange}
          setText={setText}
          questionFormId={questionFormId!.toString()}
          selectedValue={option.id.toString()}/>,
      )}
      {
      quizMode == QuizFormMode.QUESTION  && 
            <AddOptionButton onAdd={onClickAddQuizOptionItem}/>
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
        <div className={styles["option-add-button-check-square"]}/>
        <span>옵션 추가하기</span>
      </button>
    </div>
  );
}
