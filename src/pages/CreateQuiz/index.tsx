import styles from "./_create_quiz.module.scss";
import { useEffect, useMemo, useRef, useState } from "react";
import QuizSettingStudyGroupForm from "@/pages/CreateQuiz/composite/QuizSettingStudyGroupForm/QuizSettingStudyGroupForm";
import QuizWriteForm from "./composite/QuizWriteForm/QuizWriteForm";
import QuizSettingsForm from "./composite/QuizSettingsForm/QuizSettingsForm";
import QuizCreationFormLayout from "./layout/QuizCreationFormLayout/QuizCreationFormLayout";
import QuizCreationSteps from "./layout/QuizCreationSteps/QuizCreationSteps";
import MemoizedQuizBasicInfoForm from "@/pages/CreateQuiz/composite/QuizBasicInfoForm/QuizBasicInfoForm";
import {
  createdQuizIdAtom,
  errorModalTitleAtom,
  invalidQuestionFormIdAtom,
  isFirstVisitAtom,
  openErrorModalAtom,
  quizCreationInfoAtom,
  quizCreationStepAtom,
  quizGuideStepAtom,
  resetQuizCreationStateAtom,
  stepsCompletionStatusAtom,
} from "@/store/quizAtom.ts";
import { useAtom, useSetAtom } from "jotai";
import Modal from "@/components/atom/Modal/Modal.tsx";
import useModal from "@/hooks/useModal.ts";
import { Step } from "@/types/StepType.ts";
import QuizBookSelectionForm from "./composite/QuizBookSectionForm/QuizBookSelectionForm/QuizBookSelectionForm.tsx";
import { useBlocker, useNavigate, useParams } from "react-router-dom";
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
import { currentUserAtom } from "@/store/userAtom.ts";
import ROUTES from "@/data/routes.ts";
import { preventLeaveModalAtom } from "@/store/quizAtom.ts";
import useUpdateQuizCreationInfo from "@/hooks/useUpdateQuizCreationInfo.ts";
import QuizWriteGuideForm from "./composite/QuizWriteForm/QuizWriteGuideForm.tsx";
import { QUIZ_CREATION_STEP } from "@/data/constants.ts";
import LoadingSpinner from "@/components/atom/LoadingSpinner/LoadingSpinner.tsx";
import Button from "@/components/atom/Button/Button.tsx";
import useCreateQuiz from "@/hooks/mutate/useCreateQuiz.ts";
import { imageService } from "@/services/server/imageService.ts";
import useModifyQuiz from "@/hooks/mutate/useModifyQuiz.ts";
import { queryClient } from "@/services/server/queryClient.ts";
import { useValidateQuizForm } from "@/hooks/useValidateQuizForm.ts";
import { convertUrlsToImg } from "@/utils/\bconvertUrlsToImg.ts";
import toast from "react-hot-toast";
import useTemporarySave from "@/hooks/useTemporarySave.ts";

export default function Index() {
  const { id } = useParams();
  const quizId: number = parseInt(id!);
  const navigate = useNavigate();

  const [isEditMode] = useState<boolean>(!!quizId);
  const [completionStatus] = useAtom(stepsCompletionStatusAtom);

  const [quizCreationInfo, setQuizCreationInfo] = useAtom(quizCreationInfoAtom);
  const [preventLeaveModal] = useAtom(preventLeaveModalAtom);
  const [currentUser] = useAtom(currentUserAtom);
  const blocker = useBlocker(true);
  const setPreventLeaveModal = useSetAtom(preventLeaveModalAtom);

  usePreventLeave(); // 새로고침

  useEffect(() => {
    localStorage.setItem("isEditMode", isEditMode ? "true" : "false");
  }, [isEditMode]);

  // 퀴즈 작성 가이드를 위한 첫 방문 확인
  const [isFirstVisit, setIsFirstVisit] = useAtom(isFirstVisitAtom);
  const { updateQuizCreationInfo } = useUpdateQuizCreationInfo();

  useEffect(() => {
    const firstVisit = localStorage.getItem("firstVisit");
    if (firstVisit === undefined) {
      setIsFirstVisit(true);
    } else if (firstVisit && firstVisit === "false") {
      setIsFirstVisit(false);
      updateQuizCreationInfo("questions", null);
    }
  }, [isFirstVisit, isEditMode]);

  // 퀴즈 문제 작성 가이드 스텝 초기화
  const [, setQuizGuideStepAtom] = useAtom(quizGuideStepAtom);
  useEffect(() => {
    if (isFirstVisit) {
      setQuizGuideStepAtom(1);
    }
  }, [isFirstVisit]);

  const { data: prevQuiz, isLoading: isPrevQuizLoading } = useQuery({
    queryKey: quizKeys.prevDetail(quizId!),
    queryFn: () => (quizId ? quizService.fetchQuizzesDetail(quizId) : null),
    enabled: isEditMode && !!quizId,
  });

  const { data: prevBook, isLoading: isBookLoading } = useQuery({
    queryKey: ["bookDetail", prevQuiz?.bookId],
    queryFn: () => bookService.fetchBook(prevQuiz!.bookId),
    enabled: isEditMode && !!prevQuiz?.bookId,
  });

  const { data: studyGroupDetail, isLoading: isStudyGroupLoading } = useQuery({
    queryKey: ["studyGroupDetail", prevQuiz?.studyGroupId],
    queryFn: () =>
      studyGroupService.fetchStudyGroup(prevQuiz?.studyGroupId ?? -1),
    enabled: isEditMode && !!prevQuiz?.studyGroupId,
  });

  useEffect(() => {
    if (!currentUser) {
      navigate(ROUTES.ROOT);
      if (blocker.proceed) {
        blocker.proceed();
      }
    }
  }, [currentUser]);

  useEffect(() => {
    // 퀴즈 초기화
    async function initializeQuiz() {
      if (isEditMode) {
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
      }
    }
    initializeQuiz();
  }, [prevQuiz, isEditMode, prevBook?.isbn, studyGroupDetail?.name]);

  const steps: Step[] = useMemo(
    () => [
      {
        order: QUIZ_CREATION_STEP.STUDY_GROUP_SELECT,
        icon: "👥",
        title: "스터디 그룹 선택",
        description: "퀴즈를 풀 스터디 그룹을 만들거나 선택해주세요.",
        formComponent: () => <QuizSettingStudyGroupForm />,
        isDone: completionStatus.isStudyGroupSelected,
      },
      {
        order: QUIZ_CREATION_STEP.BOOK_SELECT,
        icon: "📚",
        title: "도서 선택",
        description: "퀴즈를 내고자 하는 도서를 선택해주세요.",
        formComponent: () => <QuizBookSelectionForm />,
        isDone: completionStatus.isBookSelected,
      },
      {
        order: QUIZ_CREATION_STEP.QUIZ_BASIC_INFO,
        icon: "🏆",
        title: "퀴즈 작성",
        subSteps: [
          {
            order: QUIZ_CREATION_STEP.QUIZ_BASIC_INFO_FORM,
            title: "퀴즈 기본 정보",
            description: "퀴즈 이름과 설명을 작성해주세요.",
            formComponent: () => <MemoizedQuizBasicInfoForm />,
          },
          {
            order: QUIZ_CREATION_STEP.QUIZ_WRITE_FORM,
            title: "문제 작성",
            description:
              "퀴즈의 질문을 작성한 후, 답안을 클릭하여 설정해주세요.",
            formComponent: () =>
              isFirstVisit && !isEditMode ? (
                <QuizWriteGuideForm />
              ) : (
                <QuizWriteForm />
              ),
          },
        ],
        isDone: completionStatus.isQuestionsWritten,
      },
      {
        order: QUIZ_CREATION_STEP.SETTING,
        icon: "🔗",
        title: "공유 설정",
        description: "퀴즈를 볼 수 있는 사람을 설정해 주세요.",
        formComponent: () => <QuizSettingsForm />,
        isDone: completionStatus.isSet,
      },
    ],
    [completionStatus, isFirstVisit, isEditMode],
  );

  const [currentStep, setCurrentStep] = useAtom(quizCreationStepAtom);
  const [errorModalTitle] = useAtom(errorModalTitleAtom);
  const { isModalOpen, openModal, closeModal } = useModal();
  const [, setOpenErrorModal] = useAtom(openErrorModalAtom);
  const resetQuizState = useSetAtom(resetQuizCreationStateAtom);
  const resetBookState = useSetAtom(resetQuizCreationBookStateAtom);
  const [isComplete, setIsComplete] = useState<boolean>(false);

  useEffect(() => {
    // 퀴즈 상태 초기화
    if (isEditMode) {
      setCurrentStep(2);
    } else {
      setCurrentStep(0);
    }
    resetQuizState();

    return () => {
      resetBookState();
    };
  }, []);

  useEffect(() => {
    setOpenErrorModal(() => openModal);
  }, [setOpenErrorModal]);

  const [, setCreatedQuizId] = useAtom(createdQuizIdAtom);

  const { createQuiz } = useCreateQuiz({
    onTemporarySuccess: (quizId, options) => {
      // 임시 퀴즈 생성 후 처리
      // setCreatedQuizId(id);
      // console.log("임시저장된 퀴즈 아이디", quizId);
      if (options?.showToast) {
        toast.success("퀴즈가 임시저장되었습니다.");
      }
      // 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: quizKeys.detail(quizId),
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
        queryKey: quizKeys.detail(editQuizId),
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

  const validateQuizCreationInfo = ({
    isTemporary,
    quizCreationInfo,
  }: {
    isTemporary: boolean;
    quizCreationInfo: QuizFormType;
  }) => {
    const requiredFields = ["title", "description", "book"];
    const allRequiredFields = [...requiredFields, "viewScope"];

    const hasNullFields = (
      isTemporary ? requiredFields : allRequiredFields
    ).some(
      (field) =>
        quizCreationInfo[field as keyof typeof quizCreationInfo] === null,
    );

    return !hasNullFields;
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
    if (!validateQuizCreationInfo({ isTemporary, quizCreationInfo })) {
      return;
    }
    if (
      !quizCreationInfo.title ||
      !quizCreationInfo.description ||
      !quizCreationInfo.book
    ) {
      throw new Error("퀴즈 필수 정보가 없습니다.");
    }

    const quiz: Omit<QuizCreateType, "temporary"> = {
      title: quizCreationInfo.title,
      description: quizCreationInfo.description,
      viewScope: quizCreationInfo.viewScope ?? "CREATOR",
      editScope: "CREATOR",
      bookId: quizCreationInfo.book.id,
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

  useEffect(() => {
    // TODO: 페이지 이탈을 막는 모달을 예외처리하는 로직이 이상함
    if (isComplete) {
      navigate(ROUTES.CREATE_QUIZ_COMPLETE);
      if (blocker.proceed && blocker.state === "blocked") {
        blocker.proceed();
        setIsComplete(false);
        setPreventLeaveModal(true);
      }
    }
  }, [blocker, isComplete]);

  const endStep = steps.length - 1;
  const validateQuizForm = useValidateQuizForm;
  const [, setErrorModalTitle] = useAtom(errorModalTitleAtom);
  const [, setInvalidQuestionFormId] = useAtom(invalidQuestionFormIdAtom);

  const notValidCallBack = (errorTitle: string, questionId: number) => {
    setErrorModalTitle(errorTitle);
    setInvalidQuestionFormId(questionId);
    openModal();
  };

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

  const validateAndRequestQuiz = async ({
    quizCreationInfo,
    isTemporary,
    isAutoSave = false,
  }: {
    quizCreationInfo: QuizFormType;
    isTemporary: boolean;
    isAutoSave?: boolean;
  }): Promise<boolean> => {
    if (currentStepRef.current >= QUIZ_CREATION_STEP.QUIZ_BASIC_INFO) {
      const isValid = validateQuizForm(
        quizCreationInfo.questions ?? [], // 최신 quizCreationInfo 사용
        notValidCallBack,
        setInvalidQuestionFormId,
        isTemporary,
        isAutoSave,
      );
      if (!isValid) {
        return false;
      }

      if (isValid && isTemporary) {
        await requestQuiz({ isTemporary: true, isAutoSave, quizCreationInfo });
      }
    } else if (currentStepRef.current == endStep) {
      setPreventLeaveModal(false);
      await requestQuiz({ isTemporary, isAutoSave, quizCreationInfo });
      return false;
    }
    prevQuizCreationInfoRef.current = JSON.parse(
      JSON.stringify(quizCreationInfoRef.current),
    );

    return true;
  };

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

  if (isPrevQuizLoading || isBookLoading || isStudyGroupLoading) {
    return <LoadingSpinner pageCenter width={40} />;
  }

  return (
    <section className={styles["container"]}>
      {isFirstVisit &&
      !isEditMode &&
      currentStep == QUIZ_CREATION_STEP.QUIZ_WRITE_FORM ? (
        <div className={styles.layer} />
      ) : null}
      <h2 className={styles["sr-only"]}>퀴즈 등록</h2>
      <div className={styles["left-section"]}>
        <QuizCreationSteps isEditMode={isEditMode} steps={steps} />
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
      {/* TODO: 컴포넌트 분리 */}

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

      {currentUser && preventLeaveModal && blocker.state === "blocked" && (
        <Modal
          contents={[
            {
              title:
                currentStep >= QUIZ_CREATION_STEP.QUIZ_BASIC_INFO
                  ? "이 페이지를 벗어나면 변경사항이 저장되지 않을 수 있어요. 임시 저장을 하시겠습니까?"
                  : "정말 페이지를 나가시겠어요?",
              content: <></>,
            },
          ]}
          closeModal={() => {
            blocker.reset();
          }}
          showHeaderCloseButton={true}
          bottomButtons={
            currentStep >= QUIZ_CREATION_STEP.QUIZ_BASIC_INFO
              ? [
                  {
                    text: "아니오",
                    color: "primary-border",
                    onClick: () => {
                      // 임시저장하지 않고 나가기
                      blocker.proceed();
                    },
                    width: 76,
                  },
                  {
                    text: "네",
                    color: "primary",
                    onClick: async () => {
                      // 임시저장
                      const canProceed = await validateAndRequestQuiz({
                        quizCreationInfo,
                        isTemporary: true,
                      });
                      if (canProceed) {
                        // 나가기
                        blocker.proceed();
                      }
                    },
                    width: 76,
                  },
                ]
              : [
                  {
                    text: "네",
                    color: "primary",
                    onClick: () => {
                      blocker.proceed();
                    },
                    width: 76,
                  },
                ]
          }
        />
      )}
    </section>
  );
}
