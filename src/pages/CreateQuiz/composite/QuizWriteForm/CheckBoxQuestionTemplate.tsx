import { FC, useState } from "react";
import styles from "./_question_form.module.scss";
import { QuizQuestionType } from "@/types/QuizType";
import useUpdateQuizCreationInfo from "@/hooks/useUpdateQuizCreationInfo";
import { useQuestionTemplate } from "@/hooks/useQuestionTemplate";
import SelectOption from "./SelectOption";
import { SelectOptionType } from "@/types/QuizType";
import { BOOK_QUIZ_OPTION_MAX_LENGTH } from "@/data/constants";

export const CheckBoxQuestionTemplate: FC<{
  questionFormId?: string;
}> = ({ questionFormId }) => {
  const { quizCreationInfo, updateQuizCreationInfo } =
    useUpdateQuizCreationInfo();
  const {
    options,
    setOptions,
    deleteOption,
    handleAddQuizOptionItemBtn,
    getQuestion,
  } = useQuestionTemplate("MULTIPLE_CHOICE_MULTIPLE_ANSWER", questionFormId!);

  const setInitialAnswer = (): { [key: string]: boolean } => {
    const question: QuizQuestionType = getQuestion();
    const initCheckedOptions: { [key: string]: boolean } = {};

    question.selectOptions.forEach(({ id, value }) => {
      initCheckedOptions[id] = question.answers.includes(value);
    });

    return initCheckedOptions;
  };
  const [checkedOptions, setCheckedOptions] = useState<{
    [key: string]: boolean;
  }>(setInitialAnswer());

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;

    const currentQuestion: QuizQuestionType | undefined =
      quizCreationInfo.questions?.find(
        (question) => question.id!.toString() === questionFormId!,
      );
    if (!currentQuestion) {
      return;
    }
    const targetSelectOption: SelectOptionType =
      currentQuestion.selectOptions.find(
        (option) => id === option.id.toString(),
      )!;
    const currentAnswer: string = targetSelectOption.answerIndex.toString();

    setCheckedOptions((prev) => {
      return {
        ...prev,
        [id]: checked,
      };
    });

    const updatedQuestions = quizCreationInfo.questions!.map((question) =>
      question.id!.toString() === questionFormId
        ? {
            ...question,
            answers: checked
              ? [...question.answers, currentAnswer]
              : question.answers.filter((answer) => answer !== currentAnswer),
          }
        : question,
    );
    console.log("Editied:%o", updatedQuestions);
    updateQuizCreationInfo("questions", updatedQuestions);
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

  return (
    <fieldset className={styles["question-options"]}>
      <legend className={styles["sr-only"]}>답안 선택지</legend>
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
          answerType={"MULTIPLE_CHOICE_MULTIPLE_ANSWER"}
        />
      ))}
      {options.length < BOOK_QUIZ_OPTION_MAX_LENGTH && (
        <AddOptionButton onAdd={handleAddQuizOptionItemBtn} />
      )}
    </fieldset>
  );
};

function AddOptionButton({ onAdd }: { onAdd: () => void }) {
  return (
    <div data-no-dnd="true" className={styles["option-add-button-container"]}>
      <button className={styles["option-add-button"]} onClick={onAdd}>
        <div className={styles["option-add-button-check-square"]} />
        <span data-no-dnd="true">옵션 추가하기</span>
      </button>
    </div>
  );
}
