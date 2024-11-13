import React, { useState, useRef } from "react";
import styles from "./_quiz_write_form_item.module.scss";
import QuizWriteFormTypeUtilButton from "@/pages/CreateQuiz/composite/quizWriteForm/quizWriteFormTypeUtilButton.tsx";
import Textarea from "@/components/atom/textarea/textarea.tsx";
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
import useAutoResizeTextarea from "@/hooks/useAutoResizeTextArea";
import { useAtom } from "jotai";
import { BookQuizType } from "@/types/BookQuizType";
import { QuizCreationInfoAtom } from "@/store/quizAtom";
import { errorModalTitleAtom, openErrorModalAtom } from "@/store/quizAtom";

interface QuizWriteFormItemProps {
  id: number;
  deleteQuizWriteForm: (id: number) => void;
  quizWriteFormType: string; 
}

const quizWriteFormTypeUtilList: QuestionFormTypeType[] = [
  {
    Icon: UlList,
    text: "객관식",
    typeFlag: "MULTIPLE_CHOICE",
    FormComponent: <MultipleChoiceQuizForm />,
  },
  {
    Icon: OlList,
    text: "복수 정답",
    typeFlag: "CHECK_BOX",
    FormComponent: <CheckBoxQuizForm />,
  },
  {
    Icon: OxQuiz,
    text: "OX 퀴즈",
    typeFlag: "OX",
    FormComponent: <OXQuizForm />,
  },
  {
    Icon: BlankQuiz,
    text: "빈칸 채우기",
    typeFlag: "FILL_BLANK",
    FormComponent: <div></div>,
  },
  {
    Icon: AlignJustify,
    text: "단답형 주관식",
    typeFlag: "SHORT",
    FormComponent: <div></div>,
  },
] as const;
export default function QuizWriteFormItem({ id, deleteQuizWriteForm, quizWriteFormType }: QuizWriteFormItemProps) {
  const [quizCreationInfo, setQuizCreationInfo] = useAtom<BookQuizType>(QuizCreationInfoAtom);
  const deleteIcon = "/assets/svg/quizWriteForm/delete_ellipse.svg";

  const setInitialFormType = (): QuestionFormTypeType => {
    const answerType = quizWriteFormTypeUtilList.find(({ typeFlag }) => typeFlag === quizWriteFormType);
    console.log("id, answerType: %d %o", id, answerType);
    return answerType || quizWriteFormTypeUtilList[0];
  }

  const [questionFormType, setQuestionFormType] = useState<QuestionFormTypeType>(setInitialFormType());

  const [quizMode, setQuizMode] = useState<string>(QuizFormMode.QUESTION);

  const titleMaxLength = 25000;
  const { value: question, onChange: onQuestionChange, textareaRef: questionTextAreaRef } = useAutoResizeTextarea(quizCreationInfo.questions.find((question) => (question.id === id))?.content);

  const descriptionMaxLength = 500;
  const { value: answerTextAreaValue, onChange: onAnswerTextAreaChange, textareaRef: descriptionTextAreaRef } = useAutoResizeTextarea("");

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onAnswerTextAreaChange(e);
    setQuizCreationInfo((prev) => ({
      ...prev,
      questions: prev.questions.map((question) => question.id === id ? { ...question, answerExplanationContent: e.target.value } : question) // 해당 질문만 업데이트
    }));
  }


  const onQuizModeSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
    setQuizMode(e.currentTarget.value);
  };

  const [selectedImages, setSelectedImages] = useState<(File | string)[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);

  //const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleDeleteImage = (index: number) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const [, setErrorModalTitle] = useAtom(errorModalTitleAtom);
  const [openModal] = useAtom(openErrorModalAtom);


  const checkValidation = () => {
    // - 질문 입력 안 했을 때: 질문을 입력해 주세요.
    if (question.length === 0) {
      setErrorModalTitle("질문을 입력해 주세요");
      openModal!();
    }
    // - 옵션 하나도 없을 때: 선택지를 1개 이상 추가해 주세요.
    //TODO: 퀴즈 만들기 프로세스 데이터를 전역 상태로 구현 후 구현 예정
    // -  중복된 옵션이 있을 때: 중복된 선택지입니다. 다시 입력해 주세요.

    // - 정답 선택 안 했을 때: 답안이 선택되었는지 확인하세요. 


  }

  const fileInputRef = useRef<HTMLInputElement | null>(null); // 파일 입력 참조
  const maxImgFileCount = 3;

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files; // 선택된 파일들

    if (files) {
      if (selectedImages.length + files.length > maxImgFileCount) {
        setErrorMessage('최대 3장까지만 업로드할 수 있습니다.');
        return;
      } else {
        setErrorMessage(null); // 오류 메시지 초기화
      }
      const newImages: string[] = [];
      const newImagesFile: File[] = [];
      const readerPromises: Promise<void>[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        const promise = new Promise<void>((resolve) => {
          reader.onloadend = () => {
            newImages.push(reader.result as string); // 이미지 미리보기 URL 추가
            newImagesFile.push(file);
            resolve();
          };
          reader.readAsDataURL(file); // 파일을 Data URL로 읽기
        });

        readerPromises.push(promise);
      }

      Promise.all(readerPromises).then(() => {
        setSelectedImages((prev) => [...prev, ...newImagesFile]); // 기존 이미지와 새 이미지를 합칩니다.
        setImagePreview((prev) => [...prev, ...newImages])


        setQuizCreationInfo((prev) => {
          const updatedQuestions = prev.questions.map((question) => {
            if (question.id === id!) { // TODO: questionFormId로 변수 네이밍 통일 필요
              return {
                ...question,
                answerExplanationImages:
                  [...question.answerExplanationImages, ...newImagesFile]
              };
            }
            return question;
          });

          return {
            ...prev,
            questions: updatedQuestions,
          };
        });
      });
    }
  };


  const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onQuestionChange(e);
    setQuizCreationInfo((prev) => ({
      ...prev,
      questions: prev.questions.map((question) => question.id === id ? { ...question, content: e.target.value } : question) // 해당 질문만 업데이트
    }));
  };

  const handleButtonClick = () => {
    if (selectedImages.length >= maxImgFileCount) {
      setErrorMessage('최대 3장까지만 업로드할 수 있습니다.');
      return;
    }
    fileInputRef.current?.click();
  };




  return (
    <div className={styles["write-quiz"]}>
      <QuizWriteFormItemHeader
        id={id}
        quizMode={quizMode}
        onQuizModeSelect={onQuizModeSelect}
        deleteQuizWriteForm={deleteQuizWriteForm}
        checkValidation={checkValidation}
      />

      <div>
        <div className={styles["input-container"]}>
          <QuizWriteFormTypeUtilButton
            quizId={id}
            list={quizWriteFormTypeUtilList}
            selectedOption={questionFormType}
            setSelectedOption={setQuestionFormType}
          />
          <div className={styles["title-area"]}>
            <Textarea
              maxLength={titleMaxLength}
              className={styles["question"]}
              value={question}
              onChange={handleQuestionChange}
              id="option"
              placeholder="질문을 입력해주세요."
              textAreaRef={questionTextAreaRef}
            />
          </div>
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
            onChange={handleAnswerChange}
            value={answerTextAreaValue}
            maxLength={descriptionMaxLength}
            placeholder={"답안에 대한 설명을 입력해주세요"}
            textAreaRef={descriptionTextAreaRef}
            maxLengthShow
          />

          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

          {/*           {imagePreview.length > 0 && (
            <div className={styles["image-area"]}>
              {imagePreview.map((image, index) => ( */}

          {selectedImages.length > 0 && (
            <section className={styles["image-area"]}>
              {selectedImages.map((image, index) => (
                <div className={styles["image-item"]}>
                  <img
                    key={index}
                    //FIXME: 고칠 예정
                    src={image}
                    alt={`이미지 미리보기 ${index + 1}`}
                    className={styles["image"]}
                  />
                  <button className={styles["delete-button"]}
                    onClick={() => handleDeleteImage(index)}
                  ><img src={deleteIcon} /></button>
                </div>
              ))}
            </section>
          )}
        </div>
      }
    </div>
  );
}