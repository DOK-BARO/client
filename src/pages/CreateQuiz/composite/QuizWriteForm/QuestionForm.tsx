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
import deleteIcon from "/assets/svg/quizWriteForm/deleteEllipse.svg";
import { AnswerType, QuizQuestionFormType } from "@/types/QuizType";
import QuestionTemplateTypeUtilButton from "./QuestionTemplateTypeUtilButton";
import { OxQuiz } from "@/svg/QuizWriteForm/OXQuiz";
import Button from "@/components/atom/Button/Button";
import { gray90 } from "@/styles/abstracts/colors";
import {
  errorMessageAtomFamily,
  invalidQuestionFormIdAtom,
  isFirstVisitAtom,
  quizGuideStepAtom,
} from "@/store/quizAtom";
import QuizWriteGuideBubble from "../QuizWriteGuideBubble/QuizWriteGuideBubble";
import { useValidateQuizForm } from "@/hooks/useValidateQuizForm";
import ImageLayer from "@/components/layout/ImageLayer/ImageLayer";
import useImageLayer from "@/hooks/useImageLayer";
interface Props {
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
}: Props) {
  const { quizCreationInfo, updateQuizCreationInfo } =
    useUpdateQuizCreationInfo();
  const [invalidQuestionFormId] = useAtom(invalidQuestionFormIdAtom);
  const [isSubmissionCheckInvalidForm, setIsSubmissionCheckInvalidForm] =
    useState(invalidQuestionFormId === questionFormId);
  const IMAGE_MAX_ERROR_MSG = "*최대 3장까지만 업로드할 수 있습니다.";

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
    43,
  );
  const {
    value: answerTextAreaValue,
    onChange: onAnswerTextAreaChange,
    textareaRef: descriptionTextAreaRef,
  } = useAutoResizeTextarea(
    quizCreationInfo.questions?.find(
      (question) => question.id === questionFormId,
    )?.answerExplanationContent,
    23,
  );

  const [selectedImages, setSelectedImages] = useState<JSX.Element[]>(
    quizCreationInfo.questions?.find(
      (question) => question.id === questionFormId,
    )?.answerExplanationImages ?? [],
  );
  const [imagePreviewEls, setImagePreviewEls] = useState<JSX.Element[]>([]);
  const [errorMessage, setErrorMessage] = useAtom(
    errorMessageAtomFamily(questionFormId),
  );

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onAnswerTextAreaChange(e);
    const updatedQuestions: QuizQuestionFormType[] =
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
      setImagePreviewEls(initialImages);
    };
    fetchImagePreviews();
  }, []);

  const setInitialImgPreview = async (): Promise<JSX.Element[]> => {
    const answerExplanationImages: JSX.Element[] =
      quizCreationInfo.questions?.find(
        (question) => question.id === questionFormId,
      )?.answerExplanationImages ?? [];

    return [...imagePreviewEls, ...answerExplanationImages];
  };

  const handleDeleteImage = (index: number) => {
    if (errorMessage) {
      setErrorMessage(null);
    }
    setImagePreviewEls((prevImages) =>
      prevImages.filter((_, i) => i !== index),
    );

    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));

    const updatedQuestions: QuizQuestionFormType[] =
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

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    // TODO: 이미지 핸들링 hook으로 만들기
    const files = event.target.files;
    if (files) {
      if (selectedImages.length + files.length > maxImgFileCount) {
        setErrorMessage(IMAGE_MAX_ERROR_MSG);
        return;
      } else {
        setErrorMessage(null); // 오류 메시지 초기화
      }

      const newImagesFile: File[] = Array.from(files);
      const imgEls = newImagesFile.map((file) => {
        const imgURL = URL.createObjectURL(file); // 미리보기용 URL
        return (
          <img
            className={styles["image"]}
            alt=""
            src={imgURL}
            data-file={file}
          />
        );
      });

      setSelectedImages((prev) => [...prev, ...imgEls]);
      setImagePreviewEls((prev) => [...prev, ...imgEls]);

      const updatedQuestions: QuizQuestionFormType[] =
        quizCreationInfo.questions?.map((question) => {
          if (question.id === questionFormId!) {
            return {
              ...question,
              answerExplanationImages: [
                ...question.answerExplanationImages,
                ...imgEls,
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
    const updatedQuestions: QuizQuestionFormType[] =
      quizCreationInfo.questions?.map((question) =>
        question.id === questionFormId
          ? { ...question, content: e.target.value }
          : question,
      ) ?? [];
    updateQuizCreationInfo("questions", updatedQuestions);
  };

  const handleButtonClick = () => {
    if (selectedImages.length >= maxImgFileCount) {
      setErrorMessage(IMAGE_MAX_ERROR_MSG);
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

  // File을 Data URL로 변환
  const convertFileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          resolve(reader.result as string); // Data URL 반환
        } else {
          reject("File conversion failed");
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file); // 파일을 Data URL로 읽기
    });
  };
  const setImgLayer = async () => {
    const fileList: File[] = [];
    const dataUrlList: string[] = [];
    const alreadyUploadedList: string[] = [];

    // img태그를 File형태로 변환
    // console.log("원본:", imagePreviewEls);
    imagePreviewEls.forEach((img) => {
      const file = (img.props as { "data-file"?: File })["data-file"];
      const src = (img.props as { src?: string }).src;

      if (file instanceof File) {
        fileList.push(file); // 새로 업로드할 이미지
        // console.log("filelist:", idx);
      } else {
        // 이미 업로드된 이미지 URL은 이미 중복 처리될 가능성이 있으므로 추가하지 않음
        if (!alreadyUploadedList.includes(src!)) {
          alreadyUploadedList.push(src!);
        }
        // console.log("already:", idx);
      }
    });

    for (const file of fileList) {
      try {
        const dataUrl = await convertFileToDataUrl(file);

        if (!dataUrlList.includes(dataUrl)) {
          // 변환된 Data URL을 배열에 추가
          dataUrlList.push(dataUrl);
        }
      } catch (error) {
        // console.error("Error converting file to Data URL:", error);
      }
    }
    return [...alreadyUploadedList, ...dataUrlList]; // 최종적으로 Data URL 배열 반환
  };
  const [imgLayer, setImgLayerState] = useState<string[]>([]); // imgLayer 초기값 설정

  useEffect(() => {
    const fetchImgLayer = async () => {
      const result = await setImgLayer();
      setImgLayerState(result); // 비동기 결과를 상태로 저장
    };

    fetchImgLayer();
  }, [imagePreviewEls]);

  const {
    clickedImage,
    handleCloseLayer,
    handleArrowClick,
    handleImageClicked,
  } = useImageLayer(imgLayer);

  const makeImgElToUrl = async (img: JSX.Element): Promise<string> => {
    const file = (img.props as { "data-file"?: File })["data-file"]; // 새로 업로드 할 이미지는 data-file형태
    const src = (img.props as { src?: string }).src;
    if (file instanceof File) {
      return await convertFileToDataUrl(file!); // 새로 업로드 할 이미지
    }
    return src!; // 이미 업로드 된 url형태
  };

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
          onLeftArrowClick={(e) => handleArrowClick(e, "left")}
          onRightArrowClick={(e) => handleArrowClick(e, "right")}
        />
      ) : null}

      <QuestionFormHeader
        id={questionFormId}
        deleteQuizWriteForm={deleteQuestion}
      />

      <div className={styles["question-form-content"]}>
        <div className={styles["setting-container"]}>
          {/* <Button
            icon={
              <ImageAdd
                width={24}
                height={24}
                alt="질문 사진 추가"
                stroke={gray60}
              />
            }
            iconOnly
            className={styles["image-add-button"]}
          /> */}
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
            label="질문 입력"
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
          <label htmlFor="answer-image-uploader" className={styles["sr-only"]}>
            해설 사진 업로드
          </label>
          <input
            id="answer-image-uploader"
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
            aria-label="해설 사진 추가하기"
          >
            <ImageAdd
              stroke={gray90}
              width={20}
              height={20}
              alt="해설 사진 추가"
            />
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
          fullWidth
          onKeyDown={(e) => {
            e.stopPropagation();
          }}
          disabled={isFirstVisit && !isEditMode && currentQuizGuideStep == 1}
          label="답안에 대한 설명 입력"
        />
        {/* TODO: refactor 퀴즈 풀기 해설과 같은 컴포넌트 */}
        {imagePreviewEls.length > 0 && (
          <section className={styles["image-area"]}>
            {imagePreviewEls.map((image, index) => (
              <div className={styles["image-item-container"]} key={index}>
                <div
                  onClick={async () => {
                    handleImageClicked({
                      index,
                      src: await makeImgElToUrl(image),
                    });
                  }}
                  data-no-dnd="true"
                >
                  {image}
                </div>
                <Button
                  iconOnly
                  icon={<img src={deleteIcon} alt="사진 삭제" />}
                  className={styles["delete-button"]}
                  onClick={() => handleDeleteImage(index)}
                  ariaLabel="사진 삭제하기"
                />
              </div>
            ))}
          </section>
        )}
        {errorMessage && (
          <p data-no-dnd="true" className={styles["error-text-max-img"]}>
            {errorMessage}
          </p>
        )}
      </div>
      {/* </div> */}
    </section>
  );
}
