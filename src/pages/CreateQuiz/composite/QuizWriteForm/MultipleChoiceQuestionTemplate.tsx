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
import Button from "@/components/atom/Button/Button";
import { QuizPlus } from "@/svg/QuizPlus";
import { gray60 } from "@/styles/abstracts/colors";
interface Props {
  questionFormId?: string;
}
export const MultipleChoiceQuestionTemplate: FC<Props> = ({
  questionFormId,
}) => {
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
  const currentOptionLength = options.length;

  const setInitialAnswer = (): string => {
    // atom에 저장된 데이터 초기화
    const question = getQuestion();
    const matchAnswerIdx = question?.answers[0];
    return matchAnswerIdx ?? "";
  };
  const {
    selectedValue: selectedAnswerRadioGroupValue,
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
      )!; // 선택된 옵션의 id값으로 전역 데이터에서 해당하는 옵션 데이터 매칭

    const currentAnswer: string = targetSelectOption.answerIndex.toString(); // 그 옵션의 정답 값을 현재 정답으로 저장

    const updatedQuestions: QuizQuestionType[] = // 전뎍 데이터 업데이트
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
              : selectedAnswerRadioGroupValue
          }
          answerType={"MULTIPLE_CHOICE_SINGLE_ANSWER"}
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
