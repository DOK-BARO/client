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
export const CheckBoxQuizForm: FC<{ quizMode?: string, questionFormId?: string }> = ({ quizMode, questionFormId }) => {
  const [quizCreationInfo, setQuizCreationInfo] = useAtom<BookQuizType>(QuizCreationInfoAtom);

  const setInitialOptions = ():CheckBoxOption[] => {
    const question = quizCreationInfo.questions.find((question)=>(question.id.toString() === questionFormId));
    const initialOptions: CheckBoxOption[] = question?.selectOptions.map((option, index) => ({id: option.id, value: index.toString(),label: option.option} as CheckBoxOption)) ?? [];
    return initialOptions;
  }

  const [options, setOptions] = useState<CheckBoxOption[]>(setInitialOptions());
  const [focusedOptionIndex, setFocusedOptionIndex] = useState<number | null>(null);
  const [checkedOptions, setCheckedOptions] = useState<{ [key: string]: boolean }>({});

  const disabled: boolean = quizMode === QuizFormMode.QUESTION;
  const deleteOption = (optionId: number) => {
    setOptions(options.filter((option) => option.id !== optionId));

    setQuizCreationInfo((prev) => {
      const updatedQuestions = prev.questions.map((question) => {
        if (question.id.toString() === questionFormId!) {
          return {
            ...question,
            selectOptions: question.selectOptions.filter((option) => option.id !== optionId),
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
        if (question.id.toString() === questionFormId) {
          return {
            ...question,
            selectOptions: [
              ...question.selectOptions,
              { id: id, option: "", value: id.toString() },
            ],
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
  const handleOptionBlur = () => {
    setFocusedOptionIndex(null);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    console.log("onChange: ", id, checked);
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
          {
            ...question,
            answers: checked
              ? [...question.answers, id]
              : question.answers.filter((answer) => answer !== id),
          }
          :
          question)
    }));
  };

  const setText = (optionId: number, label: string) => {

    const updatedOptions = options.map((option) => {
      if (option.id === optionId) {
        return { ...option, label }
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
          onChange={handleCheckboxChange}
          setText={setText}
          questionFormId={questionFormId!.toString()}
          selectedValue={option.id.toString()} />,
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
        <div className={styles["option-add-button-check-square"]} />
        <span>옵션 추가하기</span>
      </button>
    </div>
  );
}
