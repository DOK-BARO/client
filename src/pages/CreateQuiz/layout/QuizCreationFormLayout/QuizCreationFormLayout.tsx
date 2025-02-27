import styles from "./_quiz_creation_form_layout.module.scss";
import { Step } from "@/types/StepType";
import Button from "@/components/atom/Button/Button";
import RightArrow from "@/svg/RightArrow";
import { gray00, gray60 } from "@/styles/abstracts/colors.ts";
import { useAtom, useSetAtom } from "jotai";
import {
  createdQuizIdAtom,
  isQuizNextButtonEnabledAtom,
  quizCreationInfoAtom,
  quizCreationStepAtom,
} from "@/store/quizAtom";
import {
  QuizFormType,
  QuizQuestionCreateType,
  QuizCreateType,
} from "@/types/QuizType";
import { imageService } from "@/services/server/imageService";
import { errorModalTitleAtom, openErrorModalAtom } from "@/store/quizAtom";
import { quizService } from "@/services/server/quizService";
import { useMutation } from "@tanstack/react-query";
import { ErrorType } from "@/types/ErrorType";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ROUTES from "@/data/routes";
import { invalidQuestionFormIdAtom } from "@/store/quizAtom";
import { queryClient } from "@/services/server/queryClient";
import { studyGroupKeys } from "@/data/queryKeys";
import { preventLeaveModalAtom } from "@/store/quizAtom";
import { Blocker } from "react-router-dom";
import { useValidateQuizForm } from "@/hooks/useValidateQuizForm";
import { QUIZ_CREATION_STEP } from "@/data/constants";
interface Props {
  isEditMode: boolean;
  editQuizId?: number;
  steps: Step[];
  blocker: Blocker;
}

export default function QuizCreationFormLayout({
  isEditMode,
  editQuizId,
  steps,
  blocker,
}: Props) {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useAtom(quizCreationStepAtom);
  const [isQuizNextButtonEnabled] = useAtom<boolean>(
    isQuizNextButtonEnabledAtom,
  );
  const [quizCreationInfo] = useAtom<QuizFormType>(quizCreationInfoAtom);
  const [, setErrorModalTitle] = useAtom(errorModalTitleAtom);
  const [openModal] = useAtom(openErrorModalAtom);
  const [, setInvalidQuestionFormId] = useAtom(invalidQuestionFormIdAtom);
  const setPreventLeaveModal = useSetAtom(preventLeaveModalAtom);
  const [isComplete, setIsComplete] = useState(false);
  const validateQuizForm = useValidateQuizForm;

  // // localStorage에 임시저장
  // useEffect(() => {
  //   // const intervalId = setInterval(() => {
  //   //   localStorage.setItem(
  //   //     "quizCreationInfo",
  //   //     JSON.stringify(quizCreationInfo),
  //   //   );
  //   // }, 5000); // 5초마다 실행
  //   // return () => clearInterval(intervalId);
  //   if (quizCreationInfo.questions) {
  //     localStorage.setItem(
  //       "quizCreationInfo",
  //       JSON.stringify(quizCreationInfo),
  //     );
  //   }
  // }, [quizCreationInfo.questions]);

  // 퀴즈 불러오기
  useEffect(() => {}, []);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     requestQuiz();
  //   }, 60000);
  //   return () => clearInterval(intervalId);
  // }, []);
  const notValidCallBack = (errorTitle: string, questionId: number) => {
    setErrorModalTitle(errorTitle);
    setInvalidQuestionFormId(questionId);
    openModal!();
  };
  const getCurrentStep = (): Step => {
    const step = steps[currentStep];
    if (step) return step;

    const truncatedStep = Math.trunc(currentStep);
    return steps[truncatedStep]!.subSteps!.find(
      (subStep) => subStep.order === currentStep,
    )!;
  };

  const requestUploadExplanationImages = async (
    uploadTargetImgs: JSX.Element[],
  ): Promise<string[]> => {
    // JSX.Element에서 data-file 속성의 File 객체 가져오기
    const fileList: File[] = [];
    const alreadyUploadedList: string[] = [];

    // 파일이 아닌건 이미 업로드 된 사진 이므로 업로드 x, url만 저장

    uploadTargetImgs.forEach((img) => {
      const file = (img.props as { "data-file"?: File })["data-file"];
      const src = (img.props as { src?: string }).src;

      if (file instanceof File) {
        fileList.push(file); // 새로 업로드할 사진
      } else if (typeof src === "string") {
        alreadyUploadedList.push(src); // 이미 업로드된 사진 URL 저장
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
    // 기존 업로드된 사진 URL과 새로 업로드한 URL을 합쳐서 반환
    return [...alreadyUploadedList, ...uploadedImgUrl];
  };

  const setRequestQuestion = async (): Promise<QuizQuestionCreateType[]> => {
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

  const [, setCreatedQuizId] = useAtom(createdQuizIdAtom);

  const { mutate: createQuiz } = useMutation<
    { id: number } | null,
    ErrorType,
    QuizCreateType
  >({
    mutationFn: (quiz) => quizService.createQuiz(quiz),
    onSuccess: (data) => {
      if (!data) {
        return;
      }
      queryClient.invalidateQueries({
        queryKey: studyGroupKeys.myUnsolvedQuizList(
          quizCreationInfo.studyGroup?.id,
          {},
        ),
        exact: true,
      });
      setCreatedQuizId(data.id);
      // localStorage.removeItem("quizCreationInfo");
      // blocker사용떄문에 아래 useEFfect에서 페이지 이동
    },
  });

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

  const { mutate: requestModifyQuiz } = useMutation<
    void,
    ErrorType,
    { editQuizId: number; quiz: QuizCreateType }
  >({
    mutationFn: ({ editQuizId, quiz }) =>
      quizService.modifyQuiz({ editQuizId, quiz }),
    onSuccess: () => {
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
      // localStorage.removeItem("quizCreationInfo");
      // blocker사용떄문에 아래 useEFfect에서 페이지 이동
    },
  });

  const requestQuiz = async () => {
    if (
      quizCreationInfo.title === null ||
      quizCreationInfo.description === null ||
      quizCreationInfo.book === null ||
      quizCreationInfo.viewScope === null ||
      quizCreationInfo.questions === null
    ) {
      return;
    }

    const quiz: QuizCreateType = {
      title: quizCreationInfo.title,
      description: quizCreationInfo.description,
      viewScope: quizCreationInfo.viewScope,
      editScope: "CREATOR",
      bookId: quizCreationInfo.book.id,
      studyGroupId: quizCreationInfo.studyGroup?.id || undefined,
      questions: await setRequestQuestion(),
      // temporary: isTemporary,
    };
    setIsComplete(true);
    isEditMode
      ? requestModifyQuiz({ editQuizId: editQuizId!, quiz })
      : createQuiz(quiz);

    return;
  };

  const endStep = steps.length - 1;

  const goToNextStep = async () => {
    if (currentStep === QUIZ_CREATION_STEP.QUIZ_WRITE_FORM) {
      const isValid = validateQuizForm(
        quizCreationInfo.questions ?? [],
        notValidCallBack,
        setInvalidQuestionFormId,
      );
      if (!isValid) return;
    } else if (currentStep == endStep) {
      setPreventLeaveModal(false);

      await requestQuiz(); //TODO: 리팩토링 필요: 퀴즈 수정과 생성을 이 함수에서 같이 하고있음
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

  const step: Step = getCurrentStep();

  const title = step?.subSteps?.[0].title
    ? step.subSteps?.[0].title
    : step!.title;
  const description = step?.description
    ? step.description
    : step?.subSteps?.[0].description
      ? step.subSteps?.[0].description
      : "";

  const FormComponent = step?.formComponent
    ? step.formComponent
    : step?.subSteps?.[0]?.formComponent
      ? step.subSteps[0].formComponent
      : null;

  return (
    <section className={styles["container"]}>
      <h3 className={styles["title"]}>{title}</h3>
      <h4 className={styles["step-desc"]}>{description}</h4>
      {FormComponent && <FormComponent setCurrentStep={setCurrentStep} />}
      <div className={styles["next-container"]}>
        <Button
          className={styles["next"]}
          disabled={!isQuizNextButtonEnabled}
          onClick={goToNextStep}
          size="medium"
          color="primary"
        >
          다음
          <RightArrow
            alt=""
            width={20}
            height={20}
            stroke={isQuizNextButtonEnabled ? gray00 : gray60}
          />
        </Button>
      </div>
    </section>
  );
}
