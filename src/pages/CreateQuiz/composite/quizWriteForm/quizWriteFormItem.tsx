import React, { useState, useRef } from "react";
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
import { OXQuizForm } from "@/pages/CreateQuiz/composite/quizWriteForm/oxQuizForm.tsx";

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
    FormComponent: <OXQuizForm />,
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

  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null); // 파일 입력 참조

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files; // 선택된 파일들
    if (files) {
      if (selectedImages.length + files.length > 3) {
        setErrorMessage('최대 3장까지만 업로드할 수 있습니다.');
        return;
      } else {
        setErrorMessage(null); // 오류 메시지 초기화
      }
      const newImages: string[] = [];
      const readerPromises: Promise<void>[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        const promise = new Promise<void>((resolve) => {
          reader.onloadend = () => {
            newImages.push(reader.result as string); // 이미지 미리보기 URL 추가
            resolve();
          };
          reader.readAsDataURL(file); // 파일을 Data URL로 읽기
        });

        readerPromises.push(promise);
      }

      Promise.all(readerPromises).then(() => {
        setSelectedImages((prev) => [...prev, ...newImages]); // 기존 이미지와 새 이미지를 합칩니다.
      });
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click(); // 버튼 클릭 시 파일 입력 클릭
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
        {React.cloneElement(questionFormType.FormComponent, { questionFormId: id.toString(), quizMode })}
      </div>

      {
        quizMode === QuizFormMode.ANSWER &&
        <div className={styles["quiz-mode-answer-container"]}>
          <div className={styles["quiz-mode-answer-header"]}>
            <span>답안 설명</span>
            <input
              className={styles["a11y-hidden"]}
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              multiple
            />
            <button
              onClick={handleButtonClick}
              className={styles["image-add-button"]}
            ><ImageAdd width={24} height={24} />
            </button>
          </div>
          <Textarea
            className={styles["quiz-mode-answer-text-area"]}
            id={QuizFormMode.ANSWER}
            onChange={onAnswerTextAreaChange}
            value={answerTextAreaValue}
            placeholder={"답안에 대한 설명을 입력해주세요"}
          />

          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* 오류 메시지 표시 */}
          {selectedImages.length > 0 && (
            <div className={styles["image-area"]}>
              {selectedImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`이미지 미리보기 ${index + 1}`}
                  className={styles["image"]}
                />
              ))}
            </div>
          )}

        </div>
      }
    </div>
  );
}

