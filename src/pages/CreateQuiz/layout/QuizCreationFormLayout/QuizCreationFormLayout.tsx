import styles from "./_quiz_creation_form_layout.module.scss";
import { Step } from "@/types/StepType";
import Button from "@/components/atom/Button/Button";
import RightArrow from "@/svg/RightArrow";
import { gray00, gray60 } from "@/styles/abstracts/colors.ts";
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
import { SelectOptionType } from "@/types/QuizType";

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

  // localStorage에 임시저장
  useEffect(() => {
    // const intervalId = setInterval(() => {
    //   localStorage.setItem(
    //     "quizCreationInfo",
    //     JSON.stringify(quizCreationInfo),
    //   );
    // }, 5000); // 5초마다 실행
    // return () => clearInterval(intervalId);
    if (quizCreationInfo.questions) {
      localStorage.setItem(
        "quizCreationInfo",
        JSON.stringify(quizCreationInfo),
      );
    }
  }, [quizCreationInfo.questions]);

  // 퀴즈 불러오기
  useEffect(() => {}, []);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     requestQuiz();
  //   }, 60000);
  //   return () => clearInterval(intervalId);
  // }, []);

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
      localStorage.removeItem("quizCreationInfo");
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
      localStorage.removeItem("quizCreationInfo");
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

    const quiz: QuizRequestType = {
      title: quizCreationInfo.title,
      description: quizCreationInfo.description,
      viewScope: quizCreationInfo.viewScope,
      editScope: "CREATOR",
      bookId: quizCreationInfo.book.id,
      studyGroupId: quizCreationInfo.studyGroup?.id || undefined,
      questions: await setRequestQuestion(),
      // temporary: isTemporary,
    };
    console.log("quiz!!", quiz);

    isEditMode
      ? requestModifyQuiz({ editQuizId: editQuizId!, quiz })
      : createQuiz(quiz);

    return;
  };

  const endStep = steps.length - 1;

  const hasDuplicate = (arr: SelectOptionType[]) => {
    const options: string[] = arr.map(({ option }) => option);
    return new Set(options).size !== options.length;
  };

  const goToNextStep = async () => {
    if (currentStep === 2.2) {
      for (const question of quizCreationInfo.questions ?? []) {
        // - 질문 입력 안 했을 때: 질문을 입력해 주세요.
        if (question.content.length === 0) {
          setErrorModalTitle("질문을 입력해 주세요");
          setInvalidQuestionFormId(question.id);
          openModal!();
          return;
        }

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
        // - 옵션 하나도 없을 때: 선택지를 1개 이상 추가해 주세요.
        if (
          question.answerType !== "OX" &&
          question.selectOptions.length === 0
        ) {
          setErrorModalTitle("선택지를 1개 이상 추가해 주세요");
          setInvalidQuestionFormId(question.id);
          openModal!();
          return;
        }

        // -  중복된 옵션이 있을 때: 중복된 옵션입니다. 다시 입력해 주세요.
        const selectOptions: SelectOptionType[] = question.selectOptions;
        const duplicated: boolean = hasDuplicate(selectOptions);
        if (duplicated) {
          setErrorModalTitle("중복된 옵션입니다. 다시 입력해 주세요.");
          setInvalidQuestionFormId(question.id);
          openModal!();
          return;
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
            stroke={isQuizNextButtonEnabled ? gray00 : gray60}
          />
        </Button>
      </div>
    </section>
  );
}
