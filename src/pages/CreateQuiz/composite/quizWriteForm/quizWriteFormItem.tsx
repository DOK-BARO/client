import React, { useState } from "react";
import useInput from "@/hooks/useInput.ts";
import styles from "./_quiz_write_form_item.module.scss";
import QuizWriteFormTypeUtilButton from "@/pages/CreateQuiz/composite/quizWriteForm/quizWriteFormTypeUtilButton.tsx";
import Input from "@/components/atom/input/input.tsx";
import Textarea from "@/components/atom/textarea/textarea.tsx";
import useTextarea from "@/hooks/useTextarea.ts";
import { ImageAdd } from "@/svg/quizWriteForm/imageAdd.tsx";
import QuizWriteFormItemHeader from "@/pages/CreateQuiz/composite/quizWriteForm/quizWriteFormItemHeader.tsx";
import { QuizFormMode } from "@/data/constants.ts";
import { QuestionFormTypeType } from "@/types/QuestionFormTypeType.ts";
import { UlList } from "@/svg/quizWriteForm/ulList.tsx";
import { OlList } from "@/svg/quizWriteForm/olList.tsx";
import { OxQuiz } from "@/svg/quizWriteForm/oxQuiz.tsx";
import { BlankQuiz } from "@/svg/quizWriteForm/blankQuiz.tsx";
import { AlignJustify } from "@/svg/quizWriteForm/alignJustify.tsx";
import { MultipleChoiceQuizForm } from "@/pages/CreateQuiz/composite/quizWriteForm/multipleChoiceQuizForm.tsx";
import { CheckBoxQuizForm } from "@/pages/CreateQuiz/composite/quizWriteForm/checkBoxQuizForm.tsx";

interface QuizWriteFormItemProps {
  id: number;
  deleteQuizWriteForm: (id: number) => void;
}

const quizWriteFormTypeUtilList: QuestionFormTypeType[] = [
  {
    Icon: UlList,
    text: "객관식",
    FormComponent: <MultipleChoiceQuizForm />,
  },
  {
    Icon: OlList,
    text: "복수 정답",
    FormComponent: <CheckBoxQuizForm />,
  },
  {
    Icon: OxQuiz,
    text: "OX 퀴즈",
    FormComponent: <div></div>,
  },
  {
    Icon: BlankQuiz,
    text: "빈칸 채우기",
    FormComponent: <div></div>,
  },
  {
    Icon: AlignJustify,
    text: "단답형 주관식",
    FormComponent: <div></div>,
  },
] as const;

export default function QuizWriteFormItem({ id, deleteQuizWriteForm }: QuizWriteFormItemProps) {
  const [questionFormType, setQuestionFormType] = useState<QuestionFormTypeType>(quizWriteFormTypeUtilList[0]);

  const [quizMode, setQuizMode] = useState<string>(QuizFormMode.QUESTION);

  const { onChange: onQuestionChange, value: question } = useInput("");

  const { value: answerTextAreaValue, onChange: onAnswerTextAreaChange } = useTextarea("");

  const onQuizModeSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
    setQuizMode(e.currentTarget.value);
  };

  return (
    <div className={styles["write-quiz"]}>
      <QuizWriteFormItemHeader
        id={id}
        quizMode={quizMode}
        onQuizModeSelect={onQuizModeSelect}
        deleteQuizWriteForm={deleteQuizWriteForm}
      />

      <div>
        <div className={styles["input-container"]}>
          <QuizWriteFormTypeUtilButton
            list={quizWriteFormTypeUtilList}
            selectedOption={questionFormType}
            setSelectedOption={setQuestionFormType}
          />
          <Input
            className={styles["question"]}
            value={question}
            onChange={onQuestionChange}
            id="option"
            placeholder="질문을 입력해주세요."
          />
        </div>
        {React.cloneElement(questionFormType.FormComponent, { quizMode })}
      </div>

      {
        quizMode === QuizFormMode.ANSWER &&
        <div className={styles["quiz-mode-answer-container"]}>
          <div className={styles["quiz-mode-answer-header"]}>
            <span>답안 설명</span>
            <button
              className={styles["image-add-button"]}
            ><ImageAdd width={24} height={24}/></button>
          </div>
          <Textarea
            className={styles["quiz-mode-answer-text-area"]}
            id={QuizFormMode.ANSWER}
            onChange={onAnswerTextAreaChange}
            value={answerTextAreaValue}
            placeholder={"답안에 대한 설명을 입력해주세요"}
          />
        </div>
      }
    </div>
  );
}

