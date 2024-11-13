import styles from "@/pages/CreateQuiz/composite/quizWriteForm/_quiz_write_form_item.module.scss";
import QuizWriteFormOptionItem from "@/pages/CreateQuiz/composite/quizWriteForm/quizWriteFormOptionItem.tsx";
import { RadioOption } from "@/types/RadioTypes.ts";
import { FC, useEffect, useState } from "react";
import { QuizFormMode } from "@/data/constants.ts";
import useRadioGroup from "@/hooks/useRadioGroup.ts";
import { useAtom } from "jotai";
import { BookQuizQuestionType, BookQuizType } from "@/types/BookQuizType";
import { QuizCreationInfoAtom } from "@/store/quizAtom";

export const MultipleChoiceQuizForm: FC<{ quizMode?: string, questionFormId?: string }> = ({ quizMode, questionFormId }) => {
  const [quizCreationInfo, setQuizCreationInfo] = useAtom<BookQuizType>(QuizCreationInfoAtom);

  const getQuestion = () => (quizCreationInfo.questions.find((question) => (question.id.toString() === questionFormId)) as BookQuizQuestionType);

  const setInitialOptions = (): RadioOption[] => {
    const question = getQuestion();
    const initialOptions: RadioOption[] = question?.selectOptions.map((option) => ({ id: option.id, value: option.value, label: option.option } as RadioOption)) ?? [];
    return initialOptions;
  }
  const [options, setOptions] = useState<RadioOption[]>(setInitialOptions());
  const [focusedOptionIndex, setFocusedOptionIndex] = useState<number | null>(null);

  const setInitialAnswer = (): string => {
    const question = getQuestion();
    return question.answers[0];
  }
  const { selectedValue: selectedRadioGroupValue, handleChange: onRadioGroupChange } = useRadioGroup(setInitialAnswer());

  const deleteOption = (optionId: number) => {
    setOptions(options.filter((option) => option.id !== optionId));

    // TODO: onClickAddQuizOptionItem와 겹치는 로직 리팩토링 필요
    setQuizCreationInfo((prev) => {
      const updatedQuestions = prev.questions.map((question) => {
        if (question.id.toString() === questionFormId!) {
          return {
            ...question,
            selectOptions: question.selectOptions.filter((option) => option.id !== optionId)
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
    if (quizMode === QuizFormMode.QUESTION) {
      onRadioGroupChange(null);
    } else {
      const question = getQuestion();
      const radioBtnIdx: number = parseInt(question.answers[0]);
      const index: string = radioBtnIdx.toString();
      onRadioGroupChange(index);
    }



  }, [quizMode]);

  const handleOptionBlur = () => {
    setFocusedOptionIndex(null);
  };

  const setText = (optionId: number, label: string) => {

    const updatedOptions = options.map((option) => {
      if (option.id === optionId) {
        return { ...option, label };
      }
      return option;
    });
    setOptions(updatedOptions);
  };

  const handleRadioGroupChange = (value: string) => {
    onRadioGroupChange(value);
    setQuizCreationInfo((prev) => ({
      ...prev,
      questions: prev.questions.map((question) => question.id.toString() === questionFormId ? { ...question, answers: [value] } : question) // 해당 질문만 업데이트
    }));
  }

  const onClickAddQuizOptionItem = () => {
    const id:number = options.length;
    const value:string = (options.length + 1).toString() ;

    setOptions((prev) => [
      ...prev,
      {
        id: id,
        value: value,
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
              { id: id, option: "", value: value},
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
