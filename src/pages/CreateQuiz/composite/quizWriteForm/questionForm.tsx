import React, { useState, useRef, useEffect } from "react";
import styles from "./_quiz_write_form_item.module.scss";
import Textarea from "@/components/atom/textarea/textarea.tsx";
import { ImageAdd } from "@/svg/quizWriteForm/imageAdd.tsx";
import QuestionFormHeader from "./questionFormHeader";
import { QuestionFormMode } from "@/data/constants.ts";
import { QuestionTemplateType as QuestionTemplateType } from "@/types/QuestionFormTypeType.ts";
import { UlList } from "@/svg/quizWriteForm/ulList.tsx";
import { OlList } from "@/svg/quizWriteForm/olList.tsx";
import { OxQuiz } from "@/svg/quizWriteForm/oxQuiz.tsx";
import { BlankQuiz } from "@/svg/quizWriteForm/blankQuiz.tsx";
import { AlignJustify } from "@/svg/quizWriteForm/alignJustify.tsx";
import { MultipleChoiceQuestionTemplate } from "@/pages/CreateQuiz/composite/quizWriteForm/multipleChoiceQuestionTemplate";
import { CheckBoxQuestionTemplate } from "@/pages/CreateQuiz/composite/quizWriteForm/checkBoxQuestionTemplate";
import { OXQuestionTemplate } from "@/pages/CreateQuiz/composite/quizWriteForm/oxQuestionTemplate";
import useAutoResizeTextarea from "@/hooks/useAutoResizeTextArea";
import { useAtom } from "jotai";
import useUpdateQuizCreationInfo from "@/hooks/useUpdateQuizCreationInfo";
import { errorModalTitleAtom, openErrorModalAtom } from "@/store/quizAtom";
import { QuizQuestionType } from "@/types/QuizType";
import QuestionTemplateUtilButton from "./questionTemplateUtilButton";


interface QuizWriteFormItemProps {
  questionFormId: number;
  deleteQuestion: (id: number) => void;
  answerType: string;
}

const questionTemplates: QuestionTemplateType[] = [
  {
    Icon: UlList,
    text: "객관식",
    answerType: "MULTIPLE_CHOICE",
    FormComponent: <MultipleChoiceQuestionTemplate />,
  },
  {
    Icon: OlList,
    text: "복수 정답",
    answerType: "CHECK_BOX",
    FormComponent: <CheckBoxQuestionTemplate />,
  },
  {
    Icon: OxQuiz,
    text: "OX 퀴즈",
    answerType: "OX",
    FormComponent: <OXQuestionTemplate />,
  },
  {
    Icon: BlankQuiz,
    text: "빈칸 채우기",
    answerType: "FILL_BLANK",
    FormComponent: <div></div>,
  },
  {
    Icon: AlignJustify,
    text: "단답형 주관식",
    answerType: "SHORT",
    FormComponent: <div></div>,
  },
] as const;

export default function QuestionForm({ questionFormId, deleteQuestion, answerType }: QuizWriteFormItemProps) {
  const { quizCreationInfo, updateQuizCreationInfo } = useUpdateQuizCreationInfo();
  const deleteIcon = "/assets/svg/quizWriteForm/delete_ellipse.svg";

  const setInitialFormType = (): QuestionTemplateType => {
    return questionTemplates.find(({ answerType: typeFlag }) => typeFlag === answerType) || questionTemplates[0];
  };

  const [questionFormType, setQuestionFormType] = useState<QuestionTemplateType>(setInitialFormType());
  const [questionFormMode, setQuestionFormMode] = useState<string>(QuestionFormMode.QUESTION);
  const titleMaxLength = 25000;
  const descriptionMaxLength = 500;

  const { value: question, onChange: onQuestionChange, textareaRef: questionTextAreaRef } = useAutoResizeTextarea(quizCreationInfo.questions?.find((question) => (question.id === questionFormId))?.content);
  const { value: answerTextAreaValue, onChange: onAnswerTextAreaChange, textareaRef: descriptionTextAreaRef } = useAutoResizeTextarea(quizCreationInfo.questions?.find((question) => (question.id === questionFormId))?.answerExplanationContent);

  const [selectedImages, setSelectedImages] = useState<File[]>(quizCreationInfo.questions?.find((question) => (question.id === questionFormId))?.answerExplanationImages ?? []);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [, setErrorModalTitle] = useAtom(errorModalTitleAtom);
  const [openModal] = useAtom(openErrorModalAtom);

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onAnswerTextAreaChange(e);
    const updatedQuestions: QuizQuestionType[] = quizCreationInfo.questions?.map((question) => question.id === questionFormId ? { ...question, answerExplanationContent: e.target.value } : question) ?? [];
    updateQuizCreationInfo("questions", updatedQuestions);
  }

  const onQuizModeSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("sdfd: ",e.currentTarget.value)
    setQuestionFormMode(e.currentTarget.value);
  };

  useEffect(() => {
    const fetchImagePreviews = async () => {
      const initialImages = await setInitialImgPreview();
      setImagePreview(initialImages);
    };
    fetchImagePreviews();
  }, []);

  const setInitialImgPreview = async (): Promise<string[]> => {
    const answerExplanationImages: File[] = quizCreationInfo.questions?.find((question) => question.id === questionFormId)?.answerExplanationImages ?? [];
    const newImages = await readFilesAsDataURL(answerExplanationImages);

    return [...imagePreview, ...newImages];
  };

  const handleDeleteImage = (index: number) => {
    setImagePreview((prevImages) => prevImages.filter((_, i) => i !== index));
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));

    const updatedQuestions: QuizQuestionType[] = quizCreationInfo.questions?.map((question) => {
      if (question.id === questionFormId!) {
        return {
          ...question,
          answerExplanationImages: question.answerExplanationImages.filter((_, i) => i !== index)
        };
      }
      return question;
    }) ?? [];

    updateQuizCreationInfo("questions", updatedQuestions);
  };



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

  const readFilesAsDataURL = async (files: File[]): Promise<string[]> => {
    const readerPromises: Promise<string>[] = files.map((file) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    });
    return Promise.all(readerPromises);
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      if (selectedImages.length + files.length > maxImgFileCount) {
        setErrorMessage('최대 3장까지만 업로드할 수 있습니다.');
        return;
      } else {
        setErrorMessage(null); // 오류 메시지 초기화
      }

      const newImagesFile: File[] = Array.from(files);
      const newImages = await readFilesAsDataURL(newImagesFile);

      setSelectedImages((prev) => [...prev, ...newImagesFile]);
      setImagePreview((prev) => [...prev, ...newImages]);

      const updatedQuestions: QuizQuestionType[] = quizCreationInfo.questions?.map((question) => {
        if (question.id === questionFormId!) {
          return {
            ...question,
            answerExplanationImages: [...question.answerExplanationImages, ...newImagesFile]
          };
        }
        return question;
      }) ?? [];

      updateQuizCreationInfo("questions", updatedQuestions);
    }
  };

  const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onQuestionChange(e);
    const updatedQuestions: QuizQuestionType[] = quizCreationInfo.questions?.map((question) => question.id === questionFormId ? { ...question, content: e.target.value } : question) ?? [];
    updateQuizCreationInfo("questions", updatedQuestions);
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
      <QuestionFormHeader
        id={questionFormId}
        quizMode={questionFormMode}
        onQuizModeSelect={onQuizModeSelect}
        deleteQuizWriteForm={deleteQuestion}
        checkValidation={checkValidation}
      />

      <div>
        <div className={styles["input-container"]}>
          <QuestionTemplateUtilButton
            quizId={questionFormId}
            list={questionTemplates}
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
        {React.cloneElement(questionFormType.FormComponent, { questionFormId: questionFormId.toString(), questionFormMode: questionFormMode })}
      </div>

      {
        questionFormMode === QuestionFormMode.ANSWER &&
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
            id={QuestionFormMode.ANSWER}
            onChange={handleAnswerChange}
            value={answerTextAreaValue}
            maxLength={descriptionMaxLength}
            placeholder={"답안에 대한 설명을 입력해주세요"}
            textAreaRef={descriptionTextAreaRef}
            maxLengthShow
          />

          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          {imagePreview.length > 0 && (
            <section className={styles["image-area"]}>
              {imagePreview.map((image, index) => (
                <div className={styles["image-item"]} key={index}>
                  <img
                    key={index}
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