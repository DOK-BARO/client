import React, { useState, useRef, useEffect } from "react";
import styles from "./_question_form.module.scss";
import Textarea from "@/components/atom/Textarea/Textarea";
import { ImageAdd } from "@/svg/QuizWriteForm/ImageAdd";
import QuestionFormHeader from "./QuestionFormHeader";
import { QuestionTemplateType as QuestionTemplateType } from "@/types/QuestionTemplateType";
import { UlList } from "@/svg/QuizWriteForm/UlList";
import { OlList } from "@/svg/QuizWriteForm/OlList";
import { MultipleChoiceQuestionTemplate } from "@/pages/CreateQuiz/composite/QuizWriteForm/MultipleChoiceQuestionTemplate";
import { CheckBoxQuestionTemplate } from "@/pages/CreateQuiz/composite/QuizWriteForm/CheckBoxQuestionTemplate";
import { OXQuestionTemplate } from "@/pages/CreateQuiz/composite/QuizWriteForm/OXQuestionTemplate";
import useAutoResizeTextarea from "@/hooks/useAutoResizeTextArea";
import { useAtom } from "jotai";
import useUpdateQuizCreationInfo from "@/hooks/useUpdateQuizCreationInfo";
import deleteIcon from "/assets/svg/quizWriteForm/delete_ellipse.svg";
import { AnswerType, QuizQuestionType } from "@/types/QuizType";
import QuestionTemplateTypeUtilButton from "./QuestionTemplateTypeUtilButton";
import { OxQuiz } from "@/svg/QuizWriteForm/OXQuiz";
import {
  invalidQuestionFormIdAtom,
  isFirstVisitAtom,
  quizGuideStepAtom,
} from "@/store/quizAtom";
import QuizWriteGuideBubble from "../QuizWriteGuideBubble/QuizWriteGuideBubble";
import { useValidateQuizForm } from "@/hooks/useValidateQuizForm";
import ImageLayer from "@/components/layout/ImageLayer/ImageLayer";
import useImageLayer from "@/hooks/useImageLayer";
interface QuizWriteFormItemProps {
  questionFormId: number;
  deleteQuestion: (id: number) => void;
  answerType: string;
  onUpdateQuestionFormsWithAnswerType: (
    questionId: number,
    newAnswerType: AnswerType,
  ) => void;
}

const validateForm = useValidateQuizForm;

const questionTemplates: QuestionTemplateType[] = [
  {
    Icon: UlList,
    text: "객관식",
    answerType: "MULTIPLE_CHOICE_SINGLE_ANSWER",
    FormComponent: <MultipleChoiceQuestionTemplate />,
  },
  {
    Icon: OlList,
    text: "복수 정답",
    answerType: "MULTIPLE_CHOICE_MULTIPLE_ANSWER",
    FormComponent: <CheckBoxQuestionTemplate />,
  },
  {
    Icon: OxQuiz,
    text: "OX 퀴즈",
    answerType: "OX",
    FormComponent: <OXQuestionTemplate />,
  },
  // {
  //   Icon: BlankQuiz,
  //   text: "빈칸 채우기",
  //   answerType: "FILL_BLANK",
  //   FormComponent: <div></div>,
  // },
  // {
  //   Icon: AlignJustify,
  //   text: "단답형 주관식",
  //   answerType: "SHORT",
  //   FormComponent: <div></div>,
  // },
] as const;

export default function QuestionForm({
  questionFormId,
  deleteQuestion,
  answerType,
  onUpdateQuestionFormsWithAnswerType,
}: QuizWriteFormItemProps) {
  const { quizCreationInfo, updateQuizCreationInfo } =
    useUpdateQuizCreationInfo();
  const [invalidQuestionFormId] = useAtom(invalidQuestionFormIdAtom);
  const [isSubmissionCheckInvalidForm, setIsSubmissionCheckInvalidForm] =
    useState(invalidQuestionFormId === questionFormId);

  const isWritingValid = validateForm(
    quizCreationInfo.questions?.filter(
      (question) => question.id === questionFormId,
    ) ?? [],
    () => {},
  );

  // "다음버튼"클릭 시 유효하지 않은 폼이 현재 폼인지 체크
  useEffect(() => {
    setIsSubmissionCheckInvalidForm(invalidQuestionFormId === questionFormId);
  }, [invalidQuestionFormId, questionFormId]);

  // 임시처리
  // "다음버튼 클릭 후 에러 border가 적용된 다음,
  // 해당입력 폼의 유효성 검사가 통과되면 에러 border를 없에는 처리"
  useEffect(() => {
    setIsSubmissionCheckInvalidForm(false);
  }, [isWritingValid, isSubmissionCheckInvalidForm]);

  const setInitialFormType = (): QuestionTemplateType => {
    return (
      questionTemplates.find(
        ({ answerType: typeFlag }) => typeFlag === answerType,
      ) || questionTemplates[0]
    );
  };

  const [questionFormType, setQuestionFormType] =
    useState<QuestionTemplateType>(setInitialFormType());
  const titleMaxLength = 25000;
  const descriptionMaxLength = 500;

  const {
    value: question,
    onChange: onQuestionChange,
    textareaRef: questionTextAreaRef,
  } = useAutoResizeTextarea(
    quizCreationInfo.questions?.find(
      (question) => question.id === questionFormId,
    )?.content,
  );
  const {
    value: answerTextAreaValue,
    onChange: onAnswerTextAreaChange,
    textareaRef: descriptionTextAreaRef,
  } = useAutoResizeTextarea(
    quizCreationInfo.questions?.find(
      (question) => question.id === questionFormId,
    )?.answerExplanationContent,
  );

  const [selectedImages, setSelectedImages] = useState<File[]>(
    quizCreationInfo.questions?.find(
      (question) => question.id === questionFormId,
    )?.answerExplanationImages ?? [],
  );
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onAnswerTextAreaChange(e);
    const updatedQuestions: QuizQuestionType[] =
      quizCreationInfo.questions?.map((question) =>
        question.id === questionFormId
          ? { ...question, answerExplanationContent: e.target.value }
          : question,
      ) ?? [];
    updateQuizCreationInfo("questions", updatedQuestions);
  };

  useEffect(() => {
    const fetchImagePreviews = async () => {
      const initialImages = await setInitialImgPreview();
      setImagePreviews(initialImages);
    };
    fetchImagePreviews();
  }, []);

  const setInitialImgPreview = async (): Promise<string[]> => {
    const answerExplanationImages: File[] =
      quizCreationInfo.questions?.find(
        (question) => question.id === questionFormId,
      )?.answerExplanationImages ?? [];
    const newImages = await readFilesAsDataURL(answerExplanationImages);

    return [...imagePreviews, ...newImages];
  };

  const handleDeleteImage = (index: number) => {
    setImagePreviews((prevImages) => prevImages.filter((_, i) => i !== index));
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));

    const updatedQuestions: QuizQuestionType[] =
      quizCreationInfo.questions?.map((question) => {
        if (question.id === questionFormId!) {
          return {
            ...question,
            answerExplanationImages: question.answerExplanationImages.filter(
              (_, i) => i !== index,
            ),
          };
        }
        return question;
      }) ?? [];

    updateQuizCreationInfo("questions", updatedQuestions);
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null); // 파일 입력 참조
  const maxImgFileCount = 3;

  //TODO: hook으로 만들기
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

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    // TODO: 이미지 핸들링 hook으로 만들기
    const files = event.target.files;
    if (files) {
      if (selectedImages.length + files.length > maxImgFileCount) {
        setErrorMessage("최대 3장까지만 업로드할 수 있습니다.");
        return;
      } else {
        setErrorMessage(null); // 오류 메시지 초기화
      }

      const newImagesFile: File[] = Array.from(files);
      const newImages = await readFilesAsDataURL(newImagesFile);

      setSelectedImages((prev) => [...prev, ...newImagesFile]);
      setImagePreviews((prev) => [...prev, ...newImages]);

      const updatedQuestions: QuizQuestionType[] =
        quizCreationInfo.questions?.map((question) => {
          if (question.id === questionFormId!) {
            return {
              ...question,
              answerExplanationImages: [
                ...question.answerExplanationImages,
                ...newImagesFile,
              ],
            };
          }
          return question;
        }) ?? [];

      updateQuizCreationInfo("questions", updatedQuestions);
    }
  };

  const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onQuestionChange(e);
    const updatedQuestions: QuizQuestionType[] =
      quizCreationInfo.questions?.map((question) =>
        question.id === questionFormId
          ? { ...question, content: e.target.value }
          : question,
      ) ?? [];
    updateQuizCreationInfo("questions", updatedQuestions);
  };

  const handleButtonClick = () => {
    if (selectedImages.length >= maxImgFileCount) {
      setErrorMessage("최대 3장까지만 업로드할 수 있습니다.");
      return;
    }
    fileInputRef.current?.click();
  };
  const formRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (invalidQuestionFormId && invalidQuestionFormId === questionFormId) {
      const targetElement = formRefs.current[invalidQuestionFormId];
      targetElement?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [invalidQuestionFormId]);

  const handleRef = (id: string) => (element: HTMLDivElement | null) => {
    formRefs.current[id] = element;
  };
  const [isFirstVisit] = useAtom(isFirstVisitAtom);
  const [currentQuizGuideStep] = useAtom(quizGuideStepAtom);
  const isEditMode =
    localStorage.getItem("isEditMode") == "true" ? true : false;

  const {
    clickedImage,
    handleCloseLayer,
    handleArrowClick,
    handleImageClicked,
  } = useImageLayer(imagePreviews);

  return (
    <section
      ref={handleRef(questionFormId.toString())}
      className={`${styles["question-form"]} 
      ${styles[isSubmissionCheckInvalidForm || !isWritingValid ? "border--invalid" : ""]}
      `}
    >
      <h2 className={styles["sr-only"]}>퀴즈 문제 작성 폼</h2>

      {clickedImage !== undefined ? (
        <ImageLayer
          onCloseLayer={handleCloseLayer}
          image={clickedImage}
          onLeftArrowClick={() => handleArrowClick("left")}
          onRightArrowClick={() => handleArrowClick("right")}
        />
      ) : null}

      <QuestionFormHeader
        id={questionFormId}
        deleteQuizWriteForm={deleteQuestion}
      />

      <div className={styles["question-form-content"]}>
        <div className={styles["setting-container"]}>
          <QuestionTemplateTypeUtilButton
            questionId={questionFormId}
            list={questionTemplates}
            selectedOption={questionFormType}
            setSelectedOption={setQuestionFormType}
            onUpdateQuestionFormsWithAnswerType={
              onUpdateQuestionFormsWithAnswerType
            }
          />
          <Textarea
            maxLength={titleMaxLength}
            className={styles["title"]}
            value={question}
            onChange={handleQuestionChange}
            id="option"
            placeholder="질문을 입력해주세요."
            textAreaRef={questionTextAreaRef}
            fullWidth
            onKeyDown={(e) => {
              e.stopPropagation();
            }}
          />
        </div>
        {React.cloneElement(questionFormType.FormComponent, {
          questionFormId: questionFormId.toString(),
        })}
      </div>

      <div
        className={styles["answer-area"]}
        style={
          isFirstVisit && !isEditMode && currentQuizGuideStep == 1
            ? { position: "relative", zIndex: 999 }
            : {}
        }
      >
        <QuizWriteGuideBubble
          marginTop={-95}
          text={
            <p>
              해설은 <em>선택</em>이에요.
            </p>
          }
          guideStep={1}
        />
        <div className={styles["answer-area-header"]}>
          <span>해설</span>
          <input
            className={styles["sr-only"]}
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            multiple
          />
          <button
            onClick={handleButtonClick}
            className={styles["image-add-button"]}
          >
            <ImageAdd width={24} height={24} />
          </button>
        </div>

        <Textarea
          className={styles["answer"]}
          id={questionFormId.toString()}
          onChange={handleAnswerChange}
          value={answerTextAreaValue}
          maxLength={descriptionMaxLength}
          placeholder={"답안에 대한 설명을 입력해주세요"}
          textAreaRef={descriptionTextAreaRef}
          maxLengthShow
          fullWidth
          onKeyDown={(e) => {
            e.stopPropagation();
          }}
          disabled={isFirstVisit && !isEditMode && currentQuizGuideStep == 1}
        />

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        {/* TODO: refactor 퀴즈 풀기 해설과 같은 컴포넌트 */}
        {imagePreviews.length > 0 && (
          <section className={styles["image-area"]}>
            {imagePreviews.map((image, index) => (
              <div className={styles["image-item-container"]} key={index}>
                <img
                  key={index}
                  src={image}
                  alt={`이미지 미리보기 ${index + 1}`}
                  className={styles["image"]}
                  onClick={() => {
                    handleImageClicked({ index, src: image });
                  }}
                  data-no-dnd="true"
                />
                <button
                  className={styles["delete-button"]}
                  onClick={() => handleDeleteImage(index)}
                >
                  <img src={deleteIcon} />
                </button>
              </div>
            ))}
          </section>
        )}
      </div>
      {/* </div> */}
    </section>
  );
}
