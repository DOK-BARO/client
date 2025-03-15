import styles from "./_create_quiz.module.scss";
import { useEffect, useMemo, useRef, useState } from "react";
import QuizCreationFormLayout from "./layout/QuizCreationFormLayout/QuizCreationFormLayout";
import QuizCreationSteps from "./layout/QuizCreationSteps/QuizCreationSteps";
import {
  createdQuizIdAtom,
  errorModalTitleAtom,
  invalidQuestionFormIdAtom,
  isFirstVisitAtom,
  openErrorModalAtom,
  quizCreationInfoAtom,
  quizCreationStepAtom,
  resetQuizCreationStateAtom,
  stepsCompletionStatusAtom,
} from "@/store/quizAtom.ts";
import { useAtom, useSetAtom } from "jotai";
import Modal from "@/components/atom/Modal/Modal.tsx";
import useModal from "@/hooks/useModal.ts";
import { useParams } from "react-router-dom";
import { quizKeys, studyGroupKeys } from "@/data/queryKeys.ts";
import { quizService } from "@/services/server/quizService.ts";
import { useQuery } from "@tanstack/react-query";
import {
  EditScopeType,
  QuizCreateType,
  QuizFormType,
  QuizQuestionCreateType,
  ViewScopeType,
} from "@/types/QuizType.ts";
import { BookType } from "@/types/BookType.ts";
import { bookService } from "@/services/server/bookService.ts";
import { studyGroupService } from "@/services/server/studyGroupService.ts";
import { StudyGroupType } from "@/types/StudyGroupType.ts";
import { SelectOptionFormType } from "@/types/QuizType.ts";
import { QuizQuestionFormType } from "@/types/QuizType.ts";
import { resetQuizCreationBookStateAtom } from "@/store/quizAtom.ts";
import usePreventLeave from "@/hooks/usePreventLeave.ts";
import { preventLeaveModalAtom } from "@/store/quizAtom.ts";
import { QUIZ_CREATION_STEP } from "@/data/constants.ts";
import Button from "@/components/atom/Button/Button.tsx";
import useCreateQuiz from "@/hooks/mutate/useCreateQuiz.ts";
import { imageService } from "@/services/server/imageService.ts";
import useModifyQuiz from "@/hooks/mutate/useModifyQuiz.ts";
import { queryClient } from "@/services/server/queryClient.ts";
import { convertUrlsToImg } from "@/utils/\bconvertUrlsToImg.ts";
import toast from "react-hot-toast";
import useTemporarySave from "@/hooks/useTemporarySave.ts";
import isEqual from "fast-deep-equal";
import { GetCreationQuizSteps } from "./composite/GetCreationQuizSteps";
import useQuizGuide from "@/hooks/useQuizGuide";
import useValidateQuiz from "@/hooks/useValidateQuiz";
import QuizCreationModal from "./composite/QuizCreationModal/QuizCreationModal";

export default function Index() {
  const { id } = useParams();
  const [quizId, setQuizId] = useState<number>(parseInt(id!));
  const [isEditMode, setIsEditMode] = useState<boolean>(!!quizId);

  const [quizCreationInfo, setQuizCreationInfo] = useAtom(quizCreationInfoAtom);
  const [currentStep, setCurrentStep] = useAtom(quizCreationStepAtom);

  const [isFirstVisit] = useAtom(isFirstVisitAtom);
  const [completionStatus] = useAtom(stepsCompletionStatusAtom);

  useEffect(() => {
    localStorage.setItem("isEditMode", isEditMode ? "true" : "false");
  }, [isEditMode]);

  usePreventLeave(); // 새로고침
  useQuizGuide(isEditMode); // 퀴즈 작성 가이드라인

  const setPreventLeaveModal = useSetAtom(preventLeaveModalAtom);
  const { isModalOpen, openModal, closeModal } = useModal();
  const [errorModalTitle, setErrorModalTitle] = useAtom(errorModalTitleAtom);

  const [, setOpenErrorModal] = useAtom(openErrorModalAtom);
  const resetQuizState = useSetAtom(resetQuizCreationStateAtom);
  const resetBookState = useSetAtom(resetQuizCreationBookStateAtom);
  const [isComplete, setIsComplete] = useState<boolean>(false);

  useEffect(() => {
    setOpenErrorModal(() => openModal);
  }, [setOpenErrorModal]);

  // 퀴즈 생성 각 단계
  const steps = useMemo(() => {
    return GetCreationQuizSteps({ completionStatus, isFirstVisit, isEditMode });
  }, [completionStatus, isFirstVisit, isEditMode]);
  const endStep = steps.length - 1;

  const { validateQuestionForm, checkNullFieldsInQuiz } = useValidateQuiz();
  const [, setInvalidQuestionFormId] = useAtom(invalidQuestionFormIdAtom);

  /* 최신 값을 반영하기 위한 useRef (임시저장에 사용) */
  const currentStepRef = useRef(currentStep); // currentStep 최신값 저장
  const quizCreationInfoRef = useRef(quizCreationInfo); // quizCreationInfo 최신값 저장
  const prevQuizCreationInfoRef = useRef<QuizFormType | null>(quizCreationInfo);

  // currentStep 변경 시 최신값 업데이트
  useEffect(() => {
    currentStepRef.current = currentStep;
  }, [currentStep]);

  // quizCreationInfo 변경 시 최신값 업데이트
  useEffect(() => {
    quizCreationInfoRef.current = quizCreationInfo;
  }, [quizCreationInfo]);

  const { data: prevQuiz } = useQuery({
    queryKey: quizKeys.prevDetail(quizId!),
    queryFn: () => (quizId ? quizService.fetchQuizzesDetail(quizId) : null),
    enabled: isEditMode && !!quizId,
  });

  const isNonTemporaryEditMode = isEditMode && !prevQuiz?.temporary;

  useEffect(() => {
    if (!isTemporarySaved) {
      if (isNonTemporaryEditMode) {
        setCurrentStep(2);
      } else {
        setCurrentStep(0);
      }
    }
    resetQuizState();

    return () => {
      resetBookState();
    };
  }, [isNonTemporaryEditMode]);

  const { data: prevBook } = useQuery({
    queryKey: ["bookDetail", prevQuiz?.bookId],
    queryFn: () => bookService.fetchBook(prevQuiz!.bookId),
    enabled: isEditMode && !!prevQuiz?.bookId,
  });

  const { data: studyGroupDetail } = useQuery({
    queryKey: ["studyGroupDetail", prevQuiz?.studyGroupId],
    queryFn: () =>
      studyGroupService.fetchStudyGroup(prevQuiz?.studyGroupId ?? -1),
    enabled: isEditMode && !!prevQuiz?.studyGroupId,
  });

  // 퀴즈 수정일 경우, 이전 퀴즈 정보를 기반으로 한 퀴즈 상태 초기화
  useEffect(() => {
    const initializeQuiz = async () => {
      const formattedBook: BookType = {
        id: prevBook?.id ?? -1,
        isbn: prevBook?.isbn ?? "",
        title: prevBook?.title ?? "",
        publisher: prevBook?.publisher ?? "",
        publishedAt: prevBook?.publishedAt ?? "",
        imageUrl: prevBook?.imageUrl ?? "",
        categories: prevBook?.categories ?? [],
        authors: prevBook?.authors ?? [],
      };

      let formattedStudyGroup: StudyGroupType | undefined = undefined;
      if (studyGroupDetail != undefined) {
        formattedStudyGroup = {
          id: studyGroupDetail?.id,
          name: studyGroupDetail?.name ?? "",
          profileImageUrl: studyGroupDetail?.profileImageUrl,
        };
      }
      const prevQuestions: QuizQuestionFormType[] = await Promise.all(
        prevQuiz?.questions.map(async (q) => {
          const images = await convertUrlsToImg({
            urls: q.answerExplanationImages,
            renderImage: (url) => (
              <img className={styles["image"]} src={url} alt="Converted" />
            ),
          });
          const selectOptions: SelectOptionFormType[] = q.selectOptions.map(
            (optionText, index) => ({
              id: index, // TODO: index로 해도 되는지 확인 필요
              option: optionText,
              value: (index + 1).toString(),
              answerIndex: index + 1, // 퀴즈의 정답이 아닌 이 옵션의 고유 정답 번호 set
            }),
          );
          return {
            id: q.id!,
            content: q.content,
            selectOptions,
            answerExplanationContent: q.answerExplanationContent,
            answerExplanationImages: images,
            answerType: q.answerType,
            answers: q.answers,
          };
        }) ?? [],
      );

      const quiz: QuizFormType = {
        title: prevQuiz?.title ?? "",
        description: prevQuiz?.description ?? "",
        book: formattedBook,
        viewScope: prevQuiz?.viewScope as ViewScopeType,
        editScope: "CREATOR" as EditScopeType,
        studyGroup: formattedStudyGroup,
        questions: prevQuestions,
      };
      setQuizCreationInfo(quiz);
    };
    if (isEditMode) {
      initializeQuiz();
    }
  }, [prevQuiz, isEditMode, prevBook?.isbn, studyGroupDetail?.name]);

  const [, setCreatedQuizId] = useAtom(createdQuizIdAtom);
  const [isTemporarySaved, setIsTemporarySaved] = useState<boolean>(false);

  const { createQuiz } = useCreateQuiz({
    onTemporarySuccess: (quizId, options) => {
      // 임시 퀴즈 생성 후 처리
      if (options?.showToast) {
        toast.success("퀴즈가 임시저장되었습니다.");
      }
      setQuizId(quizId);
      setIsEditMode(true);
      setIsTemporarySaved(true);

      // 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: quizKeys.prevDetail(quizId),
      });
    },
    onPermanentSuccess: (quizId) => {
      // 영구 퀴즈 생성 후 처리
      queryClient.invalidateQueries({
        queryKey: studyGroupKeys.myUnsolvedQuizList(
          quizCreationInfo.studyGroup?.id,
          {},
        ),
        exact: true,
      });
      setCreatedQuizId(quizId);
    },
  });

  const { modifyQuiz } = useModifyQuiz({
    onTemporarySuccess: (editQuizId, options) => {
      // 임시 퀴즈 생성 후 처리
      // setCreatedQuizId(id);
      if (options?.showToast) {
        toast.success("퀴즈가 임시저장되었습니다.");
      }
      // 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: quizKeys.prevDetail(editQuizId),
      });
      queryClient.invalidateQueries({
        queryKey: quizKeys.myQuiz({ page: "1" }),
      });
    },
    onPermanentSuccess: (editQuizId) => {
      queryClient.invalidateQueries({
        queryKey: studyGroupKeys.myUnsolvedQuizList(
          quizCreationInfo.studyGroup?.id,
          {},
        ),
        exact: true,
      });
      if (!editQuizId) {
        return;
      }
      setCreatedQuizId(editQuizId);
    },
  });

  const requestUploadExplanationImages = async (
    uploadTargetImgs: JSX.Element[],
  ): Promise<string[]> => {
    // JSX.Element에서 data-file 속성의 File 객체 가져오기
    const fileList: File[] = [];
    const alreadyUploadedList: string[] = [];

    // 파일이 아닌건 이미 업로드 된 이미지 이므로 업로드 x, url만 저장

    uploadTargetImgs.forEach((img) => {
      const file = (img.props as { "data-file"?: File })["data-file"];
      const src = (img.props as { src?: string }).src;

      if (file instanceof File) {
        fileList.push(file); // 새로 업로드할 이미지
      } else if (typeof src === "string") {
        alreadyUploadedList.push(src); // 이미 업로드된 이미지 URL 저장
      }
    });

    // Data URL을 Blob(File) 객체로 변환 후 업로드
    const promiseImgList = fileList.map(async (file) => {
      const paramObj: {
        image: File;
        imageTarget:
          | "MEMBER_PROFILE"
          | "STUDY_GROUP_PROFILE"
          | "BOOK_QUIZ_ANSWER";
      } = {
        image: file,
        imageTarget: "BOOK_QUIZ_ANSWER",
      };
      return await imageService.uploadImage(paramObj);
    });

    const uploadedImgUrl: string[] = await Promise.all(promiseImgList);
    // 기존 업로드된 이미지 URL과 새로 업로드한 URL을 합쳐서 반환
    return [...alreadyUploadedList, ...uploadedImgUrl];
  };

  const setRequestQuestion = async (
    quizCreationInfo: QuizFormType,
  ): Promise<QuizQuestionCreateType[]> => {
    if (!quizCreationInfo.questions) {
      return [];
    }
    const uploadedImgQuestions = quizCreationInfo.questions!.map(
      async (question) => {
        const { id, ...rest } = question;
        return {
          // TODO: isEdit으로 체크해도 될듯
          // 기존 퀴즈 id의 경우 선택옵션 순서대로 0,1,2... 이런식으로 생성됨
          // 새로 추가된 퀴즈 id의 경우 timemillis 값이므로 무조건 1000 이상의 수 이다.
          // 질문 수정의 경우 기존 id, 질문을 새로 create하는 경우 undefined값으로 set
          id: id > 1000 ? void id : id,
          ...rest,
          answerExplanationImages: await requestUploadExplanationImages(
            question.answerExplanationImages,
          ),
          selectOptions: question.selectOptions.map((option) => option.option),
          answerExplanationContent: question.answerExplanationContent,
        };
      },
    );
    return await Promise.all(uploadedImgQuestions);
  };

  const requestQuiz = async ({
    isTemporary,
    isAutoSave = false,
    quizCreationInfo,
  }: {
    isTemporary: boolean;
    isAutoSave?: boolean;
    quizCreationInfo: QuizFormType;
  }) => {
    if (!checkNullFieldsInQuiz({ isTemporary, quizCreationInfo })) {
      return;
    }

    const quiz: Omit<QuizCreateType, "temporary"> = {
      title: quizCreationInfo.title!,
      description: quizCreationInfo.description!,
      viewScope: quizCreationInfo.viewScope ?? "CREATOR",
      editScope: "CREATOR",
      bookId: quizCreationInfo.book!.id,
      studyGroupId: quizCreationInfo.studyGroup?.id ?? undefined,
      questions: await setRequestQuestion(quizCreationInfo),
    };

    isEditMode
      ? modifyQuiz({
          editQuizId: quizId!,
          quiz,
          isTemporary,
          showToast: !isAutoSave,
        })
      : createQuiz({ quiz, isTemporary, showToast: !isAutoSave });

    if (!isTemporary) {
      setIsComplete(true);
    }

    return;
  };

  const notValidCallBack = (errorTitle: string, questionId: number) => {
    setErrorModalTitle(errorTitle);
    setInvalidQuestionFormId(questionId);
    openModal();
  };

  const validateAndRequestQuiz = async ({
    quizCreationInfo,
    isTemporary,
    isAutoSave = false,
  }: {
    quizCreationInfo: QuizFormType;
    isTemporary: boolean;
    isAutoSave?: boolean;
  }): Promise<boolean> => {
    if (currentStepRef.current == endStep) {
      setPreventLeaveModal(false);
      await requestQuiz({ isTemporary, isAutoSave, quizCreationInfo });
      return false;
    }
    if (currentStepRef.current >= QUIZ_CREATION_STEP.QUIZ_BASIC_INFO) {
      const isQuestionFormValid = validateQuestionForm(
        quizCreationInfo.questions ?? [], // 최신 quizCreationInfo 사용
        notValidCallBack,
        setInvalidQuestionFormId,
        isTemporary,
        isAutoSave,
      );

      if (!isQuestionFormValid) {
        setPreventLeaveModal(true);
        return false;
      }

      if (isTemporary) {
        await requestQuiz({ isTemporary: true, isAutoSave, quizCreationInfo });
      }
    }
    prevQuizCreationInfoRef.current = JSON.parse(
      JSON.stringify(quizCreationInfoRef.current),
    );
    return true;
  };

  const [isQuizCreationInfoUpdated, setIsQuizCreationInfoUpdated] =
    useState<boolean>(false);

  useEffect(() => {
    const isUpdated = !isEqual(
      prevQuizCreationInfoRef.current,
      quizCreationInfoRef.current,
    );
    setIsQuizCreationInfoUpdated(isUpdated);
  }, [quizCreationInfoRef.current, prevQuizCreationInfoRef.current]);

  // 퀴즈 임시 저장
  const { lastTemporarySavedTime } = useTemporarySave({
    quizCreationInfo,
    quizCreationInfoRef,
    prevQuizCreationInfoRef,
    validateAndRequestQuiz,
  });

  const handleStepProgression = async () => {
    const canProceed = await validateAndRequestQuiz({
      isTemporary: false,
      quizCreationInfo,
    });
    if (!canProceed) {
      return;
    }

    const step = steps[currentStep];
    const mainStepOrder: number = Math.trunc(currentStep);
    const isMainStep = Number.isInteger(currentStep);
    const hasSubStep = !!step?.subSteps;

    if (isMainStep) {
      if (hasSubStep) {
        setCurrentStep((prev) => prev + 0.2);
      } else {
        setCurrentStep((prev) => prev + 1);
      }
      return;
    }

    const isSubStep: boolean = !!steps[mainStepOrder].subSteps;

    if (isSubStep) {
      const currentSubStep = steps[mainStepOrder].subSteps!;
      const lastOrderIdx: number = currentSubStep.length! - 1;
      const isLastSubStep = currentStep === currentSubStep[lastOrderIdx].order;
      const isFirstSubStep = currentStep === currentSubStep[0].order;

      if (isFirstSubStep) {
        setCurrentStep((prev) => Math.trunc(prev) + 0.2);
        return;
      }
      if (isLastSubStep) {
        setCurrentStep((prev) => Math.trunc(prev) + 1);
        return;
      }
    }
  };

  const hasReachedQuizBasicInfoStep =
    currentStep >= QUIZ_CREATION_STEP.QUIZ_BASIC_INFO;

  // if (isPrevQuizLoading || isBookLoading || isStudyGroupLoading) {
  //   return <LoadingSpinner pageCenter width={40} />;
  // }

  return (
    <section className={styles["container"]}>
      {isFirstVisit &&
      !isEditMode &&
      currentStep == QUIZ_CREATION_STEP.QUIZ_WRITE_FORM ? (
        <div className={styles.layer} />
      ) : null}
      <h2 className={styles["sr-only"]}>퀴즈 등록</h2>
      <div className={styles["left-section"]}>
        <QuizCreationSteps
          isNonTemporaryEditMode={isNonTemporaryEditMode}
          steps={steps}
        />
        {currentStep >= QUIZ_CREATION_STEP.QUIZ_BASIC_INFO ? (
          <section>
            <h3 className={styles["sr-only"]}>퀴즈 임시저장</h3>
            <Button
              color="white"
              fullWidth
              onClick={async () => {
                await validateAndRequestQuiz({
                  isTemporary: true,
                  isAutoSave: false,
                  quizCreationInfo,
                });
              }}
            >
              임시저장 하기
            </Button>
            {lastTemporarySavedTime ? (
              <p className={styles["temporary-save-date"]}>
                자동저장 {lastTemporarySavedTime}
              </p>
            ) : null}
          </section>
        ) : null}
      </div>
      <QuizCreationFormLayout
        steps={steps}
        onStepProgression={handleStepProgression}
      />

      {isModalOpen && (
        <Modal
          closeModal={closeModal}
          title={errorModalTitle}
          bottomButtons={[
            { text: "확인", color: "primary", onClick: closeModal },
          ]}
          showHeaderCloseButton={false}
          contents={[]}
        />
      )}

      <QuizCreationModal
        isQuizCreationInfoUpdated={isQuizCreationInfoUpdated}
        hasReachedQuizBasicInfoStep={hasReachedQuizBasicInfoStep}
        isComplete={isComplete}
        setIsComplete={setIsComplete}
        validateAndRequestQuiz={async () =>
          validateAndRequestQuiz({
            quizCreationInfo,
            isTemporary: true,
          })
        }
      />
    </section>
  );
}
