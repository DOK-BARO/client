import { FC, useState, useEffect } from "react";
import styles from "./_question_form.module.scss";
import { QuestionFormMode } from "@/data/constants.ts";
import { QuizQuestionType } from "@/types/QuizType";
import useUpdateQuizCreationInfo from "@/hooks/useUpdateQuizCreationInfo";
import { useQuestionTemplate } from "@/hooks/useQuestionTemplate";
import SelectOption from "./selectOption";

export const CheckBoxQuestionTemplate: FC<{
  questionFormMode?: string;
  questionFormId?: string;
}> = ({ questionFormMode, questionFormId }) => {
  const { quizCreationInfo, updateQuizCreationInfo } = useUpdateQuizCreationInfo();
  const {
    options,
    setOptions,
    deleteOption,
    onClickAddQuizOptionItem,
    getQuestion,
  } = useQuestionTemplate("CHECK_BOX", questionFormId!);

  const setInitialAnswer = (): { [key: string]: boolean } => {
    const question: QuizQuestionType = getQuestion();
    const initCheckedOptions: { [key: string]: boolean } = {};

    question.selectOptions.forEach(({ id, value }) => {
      initCheckedOptions[id] = question.answers.includes(value);
    });

    return initCheckedOptions;
  };
  const [checkedOptions, setCheckedOptions] = useState<{ [key: string]: boolean; }>(setInitialAnswer());

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked, value } = event.target;

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
    const question = getQuestion();
    const initCheckedOptions = initializeCheckedOptions(question);

    setCheckedOptions(initCheckedOptions);
  }, [questionFormMode]);

  const initializeCheckedOptions = (question: QuizQuestionType): { [key: string]: boolean } => {
    const checkedOptions: { [key: string]: boolean } = {};
    question.selectOptions.forEach(({ id, value }) => {
      checkedOptions[id] = questionFormMode === QuestionFormMode.QUESTION ? false : question.answers.includes(value);
    });

    return checkedOptions;
  }

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
      <SelectOption 
          key={option.id}
          option={option}
          checked={checkedOptions[option.id]}
          deleteOption={deleteOption}        
          onChange={handleCheckboxChange}
          setText={setText}
          questionFormId={questionFormId!.toString()}
          selectedValue={checkedOptions}
          quizMode={questionFormMode!}
          answerType={"CHECK_BOX"}
      />
      ))}
      {questionFormMode == QuestionFormMode.QUESTION && (
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
