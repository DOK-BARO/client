import styles from "./_question_form.module.scss";
import { FC, useEffect, useState } from "react";
import useRadioGroup from "@/hooks/useRadioGroup.ts";
import { QuizQuestionType, SelectOptionType } from "@/types/QuizType";
import useUpdateQuizCreationInfo from "@/hooks/useUpdateQuizCreationInfo";
import { useQuestionTemplate } from "@/hooks/useQuestionTemplate";
import SelectOption from "./SelectOption";
import { BOOK_QUIZ_OPTION_MAX_LENGTH } from "@/data/constants.ts";
import { isFirstVisitAtom, quizGuideStepAtom } from "@/store/quizAtom";
import { useAtom } from "jotai";
import QuizWriteGuideBubble from "../QuizWriteGuideBubble/QuizWriteGuideBubble";

export const MultipleChoiceQuestionTemplate: FC<{
  questionFormId?: string;
}> = ({ questionFormId }) => {
  const { quizCreationInfo, updateQuizCreationInfo } =
    useUpdateQuizCreationInfo();
  const [currentQuizGuideStep] = useAtom(quizGuideStepAtom);
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

  useEffect(() => {
    console.log("selectedRadioGroupValue", selectedRadioGroupValue);
  }, [selectedRadioGroupValue]);

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

  const [isFirstVisit] = useAtom(isFirstVisitAtom);
  const isEditMode =
    localStorage.getItem("isEditMode") == "true" ? true : false;
  const [predefinedValue, setPredefinedValue] = useState<null | string>(null);

  // 정해진 정답 자동 선택
  useEffect(() => {
    console.log("currentQuizGuideStep", currentQuizGuideStep);
    if (isFirstVisit && !isEditMode && currentQuizGuideStep === 2) {
      const timer = setTimeout(() => {
        setPredefinedValue("1");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isFirstVisit, isEditMode, currentQuizGuideStep]);

  return (
    <fieldset className={styles["question-options"]}>
      <QuizWriteGuideBubble
        marginTop={-85}
        text={
          <p>
            <em>클릭</em>해서&nbsp;<em>답안을 설정</em>해요.
          </p>
        }
        guideStep={2}
      />
      <legend className={styles["sr-only"]}>답안 선택지</legend>
      {options.map((item) => (
        <SelectOption
          key={item.id}
          option={item}
          questionFormId={questionFormId!}
          deleteOption={deleteOption}
          onChange={handleRadioGroupChange}
          setText={setText}
          // 가이드 모드 정답 선택
          selectedValue={
            isFirstVisit && !isEditMode
              ? predefinedValue
              : selectedRadioGroupValue
          }
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
    <div data-no-dnd="true" className={styles["option-add-button-container"]}>
      <button className={styles["option-add-button"]} onClick={onAdd}>
        <div className={styles["option-add-button-check-circle"]} />
        <span data-no-dnd="true">옵션 추가하기</span>
      </button>
    </div>
  );
}
