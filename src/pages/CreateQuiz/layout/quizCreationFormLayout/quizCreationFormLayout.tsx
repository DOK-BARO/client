import styles from "./_quiz_creation_form_layout.module.scss";
import { Step } from "@/types/StepType";
import Button from "@/components/atom/button/button.tsx";
import RightArrow from "@/svg/rightArrow.tsx";
import { gray0, gray60 } from "@/styles/abstracts/colors.ts";
import { useAtom } from "jotai";
import {
  IsQuizNextButtonEnabledAtom,
  QuizCreationInfoAtom,
} from "@/store/quizAtom";
import { QuizCreationType, QuizQuestionRequestApiType, QuizRequestType } from "@/types/QuizType";
import useUpdateQuizCreationInfo from "@/hooks/useUpdateQuizCreationInfo";
import { createQuiz } from "@/services/server/quizService";
import { ViewScope, EditScope, scopeTranslations } from "@/types/QuizType";
import { uploadImage } from "@/services/server/imageService";
import { errorModalTitleAtom, openErrorModalAtom } from "@/store/quizAtom";

export default function QuizCreationFormLayout({
  steps,
  currentStep,
  setCurrentStep,
}: {
  steps: Step[];
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [isQuizNextButtonEnabled, setIsQuizNextButtonEnabled] =
    useAtom<boolean>(IsQuizNextButtonEnabledAtom);
  const [quizCreationInfo] = useAtom<QuizCreationType>(QuizCreationInfoAtom);
  const [, setErrorModalTitle] = useAtom(errorModalTitleAtom);
  const [openModal] = useAtom(openErrorModalAtom);

  const getCurrentStep = (): Step => {
    const step = steps[currentStep];
    if (step) return step;

    const truncatedStep = Math.trunc(currentStep);
    return steps[truncatedStep]!.subSteps!.find(
      (subStep) => subStep.order === currentStep
    )!;
  };

  const getScopeKeyByTranslation = (translation: string): ViewScope | EditScope | undefined => {
    const entry = Object.entries(scopeTranslations).find(([_, value]) => value === translation);
    return entry ? entry[0] as ViewScope : undefined;
  }

  const requestUploadExplanationImages = async (uploadTargetImgs: File[]): Promise<string[]> => {
    const promiseImgList = uploadTargetImgs.map(async (img) => {
      const paramObj: {
        image: File,
        imageTarget: "MEMBER_PROFILE" | "STUDY_GROUP_PROFILE" | "BOOK_QUIZ_ANSWER"
      } = {
        image: img,
        imageTarget: "BOOK_QUIZ_ANSWER"
      }
      return await uploadImage(paramObj);
    });
    const uploadedImgUrl: string[] = await Promise.all(promiseImgList);
    return uploadedImgUrl;
  }

  const setRequestQuestion = async (): Promise<QuizQuestionRequestApiType[]> => {

    const uploadedImgQuestions = quizCreationInfo.questions!.map(async (question) => {
      const { id, ...rest } = question;
      return {
        ...rest,
        answerType:
          question.answerType === "CHECK_BOX"
            ? "MULTIPLE_CHOICE"
            : question.answerType,
        answerExplanationImages: await requestUploadExplanationImages(question.answerExplanationImages),
        selectOptions: question.selectOptions.map((option) => option.option),
      };
    })
    return await Promise.all(uploadedImgQuestions);
  }


  const requestCreateQuiz = async () => {
    const quiz: QuizRequestType = {
      title: quizCreationInfo.title!,
      description: quizCreationInfo.description!,
      viewScope: getScopeKeyByTranslation(quizCreationInfo.viewScope!)!,
      editScope: getScopeKeyByTranslation(quizCreationInfo.editScope!)!,
      bookId: quizCreationInfo.book!.id,
      studyGroupIds: quizCreationInfo.studyGroup?.id || undefined,
      questions: await setRequestQuestion(),
    };

    console.log("request: %O", quiz);
    await createQuiz(quiz);
    return;
  };
  const endStep = steps.length - 1;
  const { updateQuizCreationInfo } = useUpdateQuizCreationInfo();


  const goToNextStep = async () => {
    if (currentStep === 0) {
      updateQuizCreationInfo("studyGroup", undefined);
    } else if (currentStep === 2.2) {
      console.log("validation check!");
      //TODO: 질문이 하나도 없을 때 버튼 다시 disable 필요
      
      // - 정답 선택 안 했을 때: 답안이 선택되었는지 확인하세요. 
      for (const question of quizCreationInfo.questions ?? []) {
        if (!question.answers?.length) {
          setErrorModalTitle("답안이 선택되었는지 확인하세요.");
          openModal!();
          return;
        }
      }

    } else if (currentStep == endStep) {
      await requestCreateQuiz();
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

    // 새로운 단계(페이지) 넘어갈때 button 상태 다시 disabled로 변경.
    setIsQuizNextButtonEnabled(false);
  };

  const step: Step = getCurrentStep();
  console.log("step: %o", step);

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
          {currentStep === endStep ? "완료" : "다음"}
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
