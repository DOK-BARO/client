import styles from "./_quiz_creation_form_layout.module.scss";
import { Step } from "@/types/StepType";
import Button from "@/components/atom/Button/Button";
import RightArrow from "@/svg/RightArrow";
import { gray0, gray60 } from "@/styles/abstracts/colors.ts";
import { useAtom } from "jotai";
import {
  createdQuizIdAtom,
  isQuizNextButtonEnabledAtom,
  quizCreationInfoAtom,
} from "@/store/quizAtom";
import {
  QuizCreationType,
  QuizQuestionRequestApiType,
  QuizRequestType,
} from "@/types/QuizType";
import { imageService } from "@/services/server/imageService";
import { errorModalTitleAtom, openErrorModalAtom } from "@/store/quizAtom";
import { quizService } from "@/services/server/quizService";
import { useMutation } from "@tanstack/react-query";
import { ErrorType } from "@/types/ErrorType";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ROUTES from "@/data/routes";
import { invalidQuestionFormIdAtom } from "@/store/quizAtom";
import React from "react";
import { queryClient } from "@/services/server/queryClient";
import { studyGroupKeys } from "@/data/queryKeys";

export default function QuizCreationFormLayout({
  isEditMode,
  editQuizId,
  steps,
  currentStep,
  setCurrentStep,
}: {
  isEditMode: boolean;
  editQuizId?: string;
  steps: Step[];
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const navigate = useNavigate();
  const [isQuizNextButtonEnabled, setIsQuizNextButtonEnabled] =
    useAtom<boolean>(isQuizNextButtonEnabledAtom);
  const [quizCreationInfo] = useAtom<QuizCreationType>(quizCreationInfoAtom);
  const [, setErrorModalTitle] = useAtom(errorModalTitleAtom);
  const [openModal] = useAtom(openErrorModalAtom);
  const [, setInvalidQuestionFormId] = useAtom(invalidQuestionFormIdAtom);

  useEffect(() => {
    if (!quizCreationInfo?.questions?.length) {
      setIsQuizNextButtonEnabled(false);
    } else {
      setIsQuizNextButtonEnabled(true);
    }
  }, [quizCreationInfo.questions?.length, currentStep]);

  const getCurrentStep = (): Step => {
    const step = steps[currentStep];
    if (step) return step;

    const truncatedStep = Math.trunc(currentStep);
    return steps[truncatedStep]!.subSteps!.find(
      (subStep) => subStep.order === currentStep,
    )!;
  };

  // const getScopeKeyByTranslation = (translation: string): ViewScope | null => {
  //   const entry = Object.entries(scopeTranslations).find(
  //     ([, value]) => value === translation,
  //   );
  //   return entry ? (entry[0] as ViewScope) : null;
  // };

  const requestUploadExplanationImages = async (
    uploadTargetImgs: File[],
  ): Promise<string[]> => {
    const promiseImgList = uploadTargetImgs.map(async (img) => {
      const paramObj: {
        image: File;
        imageTarget:
          | "MEMBER_PROFILE"
          | "STUDY_GROUP_PROFILE"
          | "BOOK_QUIZ_ANSWER";
      } = {
        image: img,
        imageTarget: "BOOK_QUIZ_ANSWER",
      };
      return await imageService.uploadImage(paramObj);
    });
    const uploadedImgUrl: string[] = await Promise.all(promiseImgList);
    return uploadedImgUrl;
  };

  const setRequestQuestion = async (): Promise<
    QuizQuestionRequestApiType[]
  > => {
    const uploadedImgQuestions = quizCreationInfo.questions!.map(
      async (question) => {
        const { id, ...rest } = question;

        return {
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
    QuizRequestType
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
      // 완료 페이지로 이동
      navigate(ROUTES.CREATE_QUIZ_COMPLETE);
    },
  });

  const { mutate: requestModifyQuiz } = useMutation<
    void,
    ErrorType,
    { editQuizId: string; quiz: QuizRequestType }
  >({
    mutationFn: ({ editQuizId, quiz }) =>
      quizService.modifyQuiz({ editQuizId, quiz }),
    onSuccess: () => {
      //navigate(ROUTES.ROOT);
    },
  });

  const requestQuiz = async () => {
    if (
      quizCreationInfo.viewScope === null
      //|| quizCreationInfo.editScope === null
    ) {
      return;
    }

    // // 한글을 영어로 바꾸는 함수. 결과가 null이면 viewScope 값 그대로 사용
    // const viewScopeKey: ViewScope =
    //   getScopeKeyByTranslation(quizCreationInfo.viewScope) ??
    //   quizCreationInfo.viewScope;

    if (
      quizCreationInfo.title === null ||
      quizCreationInfo.description === null ||
      quizCreationInfo.book === null ||
      quizCreationInfo.viewScope === null ||
      quizCreationInfo.questions === null
    ) {
      return;
    }

    const quiz: QuizRequestType = {
      title: quizCreationInfo.title,
      description: quizCreationInfo.description,
      viewScope: quizCreationInfo.viewScope,
      editScope: "CREATOR",
      bookId: quizCreationInfo.book.id,
      studyGroupId: quizCreationInfo.studyGroup?.id || undefined,
      questions: await setRequestQuestion(),
    };
    console.log("quiz!!", quiz);

    isEditMode
      ? requestModifyQuiz({ editQuizId: editQuizId!, quiz })
      : createQuiz(quiz);
    return;
  };
  const endStep = steps.length - 1;

  const goToNextStep = async () => {
    if (currentStep === 2.2) {
      for (const question of quizCreationInfo.questions ?? []) {
        if (!question.answers?.length) {
          setErrorModalTitle("답안이 선택되었는지 확인하세요.");
          openModal!();
          setInvalidQuestionFormId(question.id);
          return;
        }
        if (question.answerType === "MULTIPLE_CHOICE_MULTIPLE_ANSWER") {
          if (question.answers.length <= 1) {
            setErrorModalTitle("복수정답은 답안을 2개이상 선택해야 합니다");
            setInvalidQuestionFormId(question.id);
            openModal!();
            return;
          }
        }
        setInvalidQuestionFormId(undefined);
      }
    } else if (currentStep == endStep) {
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
            alt="다음 버튼"
            width={20}
            height={20}
            stroke={isQuizNextButtonEnabled ? gray0 : gray60}
          />
        </Button>
      </div>
    </section>
  );
}
