import { FC, useState } from "react";
import styles from "./_question_form.module.scss";
import { QuizQuestionFormType } from "@/types/QuizType";
import useUpdateQuizCreationInfo from "@/hooks/useUpdateQuizCreationInfo";
import { useQuestionTemplate } from "@/hooks/useQuestionTemplate";
import SelectOption from "./SelectOption";
import { SelectOptionFormType } from "@/types/QuizType";
import { BOOK_QUIZ_OPTION_MAX_LENGTH } from "@/data/constants";
import Button from "@/components/atom/Button/Button";
import { QuizPlus } from "@/svg/QuizPlus";
import { gray60 } from "@/styles/abstracts/colors";

interface Props {
  questionFormId?: string;
}
export const CheckBoxQuestionTemplate: FC<Props> = ({ questionFormId }) => {
  const { quizCreationInfo, updateQuizCreationInfo } =
    useUpdateQuizCreationInfo();
  const {
    options,
    setOptions,
    deleteOption,
    handleAddQuizOptionItemBtn,
    getQuestion,
  } = useQuestionTemplate("MULTIPLE_CHOICE_MULTIPLE_ANSWER", questionFormId!);
  const currentOptionLength = options.length;

  const setInitialAnswer = (): { [key: string]: boolean } => {
    const question: QuizQuestionFormType = getQuestion();
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

    const currentQuestion: QuizQuestionFormType | undefined =
      quizCreationInfo.questions?.find(
        (question) => question.id!.toString() === questionFormId!,
      );
    if (!currentQuestion) {
      return;
    }
    const targetSelectOption: SelectOptionFormType =
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

      <AddOptionButton
        onAdd={handleAddQuizOptionItemBtn}
        currentOptionLength={currentOptionLength}
      />
    </fieldset>
  );
};

function AddOptionButton({
  onAdd,
  currentOptionLength,
}: {
  onAdd: () => void;
  currentOptionLength: number;
}) {
  const isOverMaxOptionLength =
    currentOptionLength >= BOOK_QUIZ_OPTION_MAX_LENGTH;
  return (
    <Button
      className={styles["option-add-button"]}
      iconPosition="left"
      icon={
        !isOverMaxOptionLength ? (
          <QuizPlus
            alt=""
            width={20}
            height={20}
            stroke={gray60}
            fill={gray60}
          />
        ) : (
          <></>
        )
      }
      onClick={onAdd}
    >
      <span data-no-dnd="true">
        {isOverMaxOptionLength ? "선택지는 최대 5개입니다." : "선택지 추가하기"}
      </span>
      <span>
        <span
          className={
            isOverMaxOptionLength ? styles["current-option-length"] : ""
          }
        >
          {currentOptionLength}
        </span>
        <span>{`/${BOOK_QUIZ_OPTION_MAX_LENGTH}`}</span>
      </span>
    </Button>
  );
}
