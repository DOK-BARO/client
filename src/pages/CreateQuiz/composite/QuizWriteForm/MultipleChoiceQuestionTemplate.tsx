import styles from "./_question_form.module.scss";
import { FC } from "react";
import useRadioGroup from "@/hooks/useRadioGroup.ts";
import { QuizQuestionType, SelectOptionType } from "@/types/QuizType";
import useUpdateQuizCreationInfo from "@/hooks/useUpdateQuizCreationInfo";
import { useQuestionTemplate } from "@/hooks/useQuestionTemplate";
import SelectOption from "./SelectOption";
import { BOOK_QUIZ_OPTION_MAX_LENGTH } from "@/data/constants.ts";

export const MultipleChoiceQuestionTemplate: FC<{
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
  } = useQuestionTemplate("MULTIPLE_CHOICE_SINGLE_ANSWER", questionFormId!);

  const setInitialAnswer = (): string => {
    const question = getQuestion();
    return question?.answers[0] ?? "";
  };
  const {
    selectedValue: selectedRadioGroupValue,
    handleChange: onRadioGroupChange,
  } = useRadioGroup(setInitialAnswer());

  const setText = (optionId: number, label: string) => {
    const updatedOptions = options.map((option) => {
      if (option.id === optionId) {
        return { ...option, label };
      }
      return option;
    });
    setOptions(updatedOptions);
  };

  const handleRadioGroupChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { id } = event.target;
    onRadioGroupChange(event);

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

    const updatedQuestions: QuizQuestionType[] =
      quizCreationInfo.questions!.map((question) =>
        question.id!.toString() === questionFormId
          ? { ...question, answers: [currentAnswer] }
          : question,
      );
    updateQuizCreationInfo("questions", updatedQuestions);
  };

  return (
    <fieldset className={styles["question-options"]}>
      <legend className={styles["sr-only"]}>답안 선택지</legend>
      {options.map((item) => (
        <SelectOption
          key={item.id}
          option={item}
          questionFormId={questionFormId!}
          deleteOption={deleteOption}
          onChange={handleRadioGroupChange}
          setText={setText}
          selectedValue={selectedRadioGroupValue}
          answerType={"MULTIPLE_CHOICE_SINGLE_ANSWER"}
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
    <div className={styles["option-add-button-container"]}>
      <button className={styles["option-add-button"]} onClick={onAdd}>
        <div className={styles["option-add-button-check-circle"]} />
        <span data-no-dnd="true">옵션 추가하기</span>
      </button>
    </div>
  );
}
