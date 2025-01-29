import React, { useState, useRef, useEffect } from "react";
import styles from "./_question_form.module.scss";
import Textarea from "@/components/atom/Textarea/Textarea";
import { ImageAdd } from "@/svg/QuizWriteForm/ImageAdd";
import QuestionFormHeader from "./QuestionFormHeader";
import { QuestionTemplateType as QuestionTemplateType } from "@/types/QuestionTemplateType";
import { UlList } from "@/svg/QuizWriteForm/UlList";
import { OlList } from "@/svg/QuizWriteForm/OlList";
// import { BlankQuiz } from "@/svg/QuizWriteForm/BlankQuiz";
// import { AlignJustify } from "@/svg/QuizWriteForm/AlignJustify";
import { MultipleChoiceQuestionTemplate } from "@/pages/CreateQuiz/composite/QuizWriteForm/MultipleChoiceQuestionTemplate";
import { CheckBoxQuestionTemplate } from "@/pages/CreateQuiz/composite/QuizWriteForm/CheckBoxQuestionTemplate";
import { OXQuestionTemplate } from "@/pages/CreateQuiz/composite/QuizWriteForm/OXQuestionTemplate";
import useAutoResizeTextarea from "@/hooks/useAutoResizeTextArea";
import { useAtom } from "jotai";
import useUpdateQuizCreationInfo from "@/hooks/useUpdateQuizCreationInfo";
import deleteIcon from "/assets/svg/quizWriteForm/delete_ellipse.svg";
import { errorModalTitleAtom, openErrorModalAtom } from "@/store/quizAtom";
import { QuizQuestionType } from "@/types/QuizType";
import QuestionTemplateTypeUtilButton from "./QuestionTemplateTypeUtilButton";
import { SelectOptionType } from "@/types/QuizType";
import { OxQuiz } from "@/svg/QuizWriteForm/OXQuiz";
import { invalidQuestionFormIdAtom } from "@/store/quizAtom";
interface QuizWriteFormItemProps {
  questionFormId: number;
  deleteQuestion: (id: number) => void;
  answerType: string;
}

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
}: QuizWriteFormItemProps) {
  const { quizCreationInfo, updateQuizCreationInfo } =
    useUpdateQuizCreationInfo();
  const [invalidQuestionFormId] = useAtom(invalidQuestionFormIdAtom);
  const isInvalidForm = invalidQuestionFormId === questionFormId;

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
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [, setErrorModalTitle] = useAtom(errorModalTitleAtom);
  const [openModal] = useAtom(openErrorModalAtom);

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
      setImagePreview(initialImages);
    };
    fetchImagePreviews();
  }, []);

  const setInitialImgPreview = async (): Promise<string[]> => {
    const answerExplanationImages: File[] =
      quizCreationInfo.questions?.find(
        (question) => question.id === questionFormId,
      )?.answerExplanationImages ?? [];
    const newImages = await readFilesAsDataURL(answerExplanationImages);

    return [...imagePreview, ...newImages];
  };

  const handleDeleteImage = (index: number) => {
    setImagePreview((prevImages) => prevImages.filter((_, i) => i !== index));
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

  const hasDuplicate = (arr: SelectOptionType[]) => {
    const options: string[] = arr.map(({ option }) => option);
    return new Set(options).size !== options.length;
  };
  const checkValidation = () => {
    const questionForm = quizCreationInfo.questions?.find(
      ({ id }) => id === questionFormId,
    );

    if (!questionForm) {
      setErrorModalTitle("질문을 찾을 수 없습니다.");
      openModal!();
      return;
    }
    const selectOptions: SelectOptionType[] = questionForm.selectOptions;

    // - 질문 입력 안 했을 때: 질문을 입력해 주세요.
    if (questionForm.content.length === 0) {
      setErrorModalTitle("질문을 입력해 주세요");
      openModal!();
      return;
    }
    // - 옵션 하나도 없을 때: 선택지를 1개 이상 추가해 주세요.
    if (
      questionForm.answerType !== "OX" &&
      questionForm.selectOptions.length === 0
    ) {
      setErrorModalTitle("선택지를 1개 이상 추가해 주세요");
      openModal!();
      return;
    }

    // -  중복된 옵션이 있을 때: 중복된 옵션입니다. 다시 입력해 주세요.
    const duplicated: boolean = hasDuplicate(selectOptions);
    if (duplicated) {
      setErrorModalTitle("중복된 옵션입니다. 다시 입력해 주세요.");
      openModal!();
      return;
    }
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
      setImagePreview((prev) => [...prev, ...newImages]);

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
      // console.log("id!: " + invalidQuestionFormId);
      targetElement?.scrollIntoView({ behavior: "smooth", block: "center" });
      console.log("scrolled!:d***");
    }
  }, [invalidQuestionFormId]);

  const handleRef = (id: string) => (element: HTMLDivElement | null) => {
    formRefs.current[id] = element;
  };
  return (
    <section
      ref={handleRef(questionFormId.toString())}
      className={`${styles["question-form"]} 
      ${styles[isInvalidForm ? "invalid" : ""]}`}
    >
      <h2 className={styles["sr-only"]}>퀴즈 문제 작성 폼</h2>
      <QuestionFormHeader
        id={questionFormId}
        deleteQuizWriteForm={deleteQuestion}
        checkValidation={checkValidation}
      />

      <div className={styles["question-form-content"]}>
        <div className={styles["setting-container"]}>
          <QuestionTemplateTypeUtilButton
            quizId={questionFormId}
            list={questionTemplates}
            selectedOption={questionFormType}
            setSelectedOption={setQuestionFormType}
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
          />
        </div>
        {React.cloneElement(questionFormType.FormComponent, {
          questionFormId: questionFormId.toString(),
        })}
      </div>

      <div className={styles["answer-area"]}>
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
        />

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        {/* TODO: refactor 퀴즈 풀기 해설과 같은 컴포넌트 */}
        {imagePreview.length > 0 && (
          <section className={styles["image-area"]}>
            {imagePreview.map((image, index) => (
              <div className={styles["image-item-container"]} key={index}>
                <img
                  key={index}
                  src={image}
                  alt={`이미지 미리보기 ${index + 1}`}
                  className={styles["image"]}
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
    </section>
  );
}
