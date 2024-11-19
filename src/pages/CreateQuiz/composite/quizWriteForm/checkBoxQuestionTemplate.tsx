import { FC, useState, useEffect } from "react";
import styles from "@/pages/CreateQuiz/composite/quizWriteForm/_quiz_write_form_item.module.scss";
import { QuizFormMode } from "@/data/constants.ts";
import { CheckBoxOption } from "@/types/CheckBoxTypes.ts";
import SelectOptionCheckBox from "@/pages/CreateQuiz/composite/quizWriteForm/selectOptionCheckBox";
import { BookQuizQuestionType } from "@/types/BookQuizType";
import useUpdateQuizCreationInfo from "@/hooks/useUpdateQuizCreationInfo";

// TODO: multipleChoiceQuizForm과 겹치는 부분 리팩토링 필요
export const CheckBoxQuestionTemplate: FC<{
  quizMode?: string;
  questionFormId?: string;
}> = ({ quizMode, questionFormId }) => {
  const { quizCreationInfo, updateQuizCreationInfo } =
    useUpdateQuizCreationInfo();

  const getQuestion = () =>
    quizCreationInfo.questions?.find(
      (question) => question.id.toString() === questionFormId
    ) as BookQuizQuestionType;

  const setInitialOptions = (): CheckBoxOption[] => {
    const question = getQuestion();
    const initialOptions: CheckBoxOption[] =
      question?.selectOptions.map(
        (option) =>
          ({
            id: option.id,
            value: option.value,
            label: option.option,
          } as CheckBoxOption)
      ) ?? [];
    return initialOptions;
  };

  const [options, setOptions] = useState<CheckBoxOption[]>(setInitialOptions());
  const [focusedOptionIndex, setFocusedOptionIndex] = useState<number | null>(
    null
  );

  const setInitialAnswer = (): { [key: string]: boolean } => {
    const question = getQuestion();
    const initCheckedOptions: { [key: string]: boolean } = {};
    question.selectOptions.forEach(({ id, value }) => {
      if (question.answers.includes(value)) {
        // 답안에 value가 포함되어 있으면
        initCheckedOptions[id] = true; // 해당 선택지의 id를 true로 설정
      }
    });
    return initCheckedOptions;
  };
  const [checkedOptions, setCheckedOptions] = useState<{
    [key: string]: boolean;
  }>(setInitialAnswer());

  const disabled: boolean = quizMode === QuizFormMode.QUESTION;
  const deleteOption = (optionId: number) => {
    setOptions(options.filter((option) => option.id !== optionId));

    const updatedQuestions: BookQuizQuestionType[] =
      quizCreationInfo.questions?.map((question) => {
        const filteredSelectOptions = question.selectOptions.filter(
          (option) => option.id !== optionId
        );
        return {
          ...question,
          selectOptions: filteredSelectOptions,
        };
      }) ?? [];

    updateQuizCreationInfo("questions", updatedQuestions);
  };

  const onClickAddQuizOptionItem = () => {
    const id: number = Date.now();
    const value: string = (options.length + 1).toString();

    setOptions((prev) => [
      ...prev,
      {
        id: id,
        value: value,
        label: "",
      },
    ]);

    const updatedQuestions = quizCreationInfo.questions!.map((question) => {
      if (question.id.toString() === questionFormId!) {
        return {
          ...question,
          selectOptions: [
            ...question.selectOptions,
            { id: id, option: "", value: value },
          ],
        };
      }
      return question;
    });

    updateQuizCreationInfo("questions", updatedQuestions);
  };

  const handleOptionFocus = (id: number) => {
    setFocusedOptionIndex(id);
  };
  const handleOptionBlur = () => {
    setFocusedOptionIndex(null);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked, value } = event.target;
    console.log("onChange: ", id, checked, value);
    console.log("quesformid; ", questionFormId);

    setCheckedOptions((prev) => {
      return {
        ...prev,
        [id]: checked,
      };
    });

    const updatedQuestions = quizCreationInfo.questions!.map((question) =>
      question.id.toString() === questionFormId
        ? {
            ...question,
            answers: checked
              ? [...question.answers, value]
              : question.answers.filter((answer) => answer !== value),
          }
        : question
    );
    updateQuizCreationInfo("questions", updatedQuestions);
  };

  useEffect(() => {
    //TODO: 리팩토링 필요
    const question = getQuestion();
    const initCheckedOptions: { [key: string]: boolean } = {};

    if (quizMode === QuizFormMode.QUESTION) {
      question.selectOptions.forEach(({ id }) => {
        initCheckedOptions[id] = false;
      });
      setCheckedOptions(initCheckedOptions);
    } else {
      question.selectOptions.forEach(({ id, value }) => {
        if (question.answers.includes(value)) {
          // 답안에 value가 포함되어 있으면
          initCheckedOptions[id] = true; // 해당 선택지의 id를 true로 설정
        }
      });
      setCheckedOptions(initCheckedOptions);
    }
  }, [quizMode]);

  const setText = (optionId: number, label: string) => {
    const updatedOptions = options.map((option) => {
      if (option.id === optionId) {
        return { ...option, label };
      }
      return option;
    });
    setOptions(updatedOptions);
  };

  return (
    <fieldset className={styles["question-options"]}>
      <legend>답안 선택지</legend>
      {options.map((option) => (
        <SelectOptionCheckBox
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
          selectedValue={checkedOptions}
          quizMode={quizMode!}
        />
      ))}
      {quizMode == QuizFormMode.QUESTION && (
        <AddOptionButton onAdd={onClickAddQuizOptionItem} />
      )}
    </fieldset>
  );
};

function AddOptionButton({ onAdd }: { onAdd: () => void }) {
  return (
    <div className={styles["option-add-button-container"]}>
      <button className={styles["option-add-button"]} onClick={onAdd}>
        <div className={styles["option-add-button-check-square"]} />
        <span>옵션 추가하기</span>
      </button>
    </div>
  );
}
