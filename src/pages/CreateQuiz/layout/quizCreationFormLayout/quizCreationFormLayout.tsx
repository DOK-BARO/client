import styles from "./_quiz_creation_form_layout.module.scss";
import { Step } from "@/pages/CreateQuiz";
import Button from "@/components/atom/button/button.tsx";
import RightArrow from "@/svg/rightArrow.tsx";
import { gray0, gray60 } from "@/styles/abstracts/colors.ts";
import { useAtom } from "jotai";
import {
  IsQuizNextButtonEnabledAtom,
  QuizCreationInfoAtom,
} from "@/store/quizAtom";
import { createQuiz } from "@/services/server/quizService";
import { QuizCreationType, QuizRequestType } from "@/types/QuizType";

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

  const getCurrentStep = (): Step => {
    const step = steps[currentStep];
    if (step) return step;

    const truncatedStep = Math.trunc(currentStep);
    return steps[truncatedStep]!.subSteps!.find(
      (subStep) => subStep.order === currentStep
    )!;
  };

  const goToNextStep = async () => {
    if (currentStep == endStep) {
      // TODO 퀴즈 생성 api요청

      //TOOD 이미지 서버로 업로드

      const quiz: QuizRequestType = {
        title: quizCreationInfo.title!,
        description: quizCreationInfo.description!,
        viewScope: quizCreationInfo.viewScope!,
        editScope: quizCreationInfo.editScope!,
        bookId: quizCreationInfo.book?.id!,
        studyGroupIds: quizCreationInfo.studyGroupId,
        questions: quizCreationInfo.questions!.map((question) => {
          const { id, ...rest } = question;
          return {
            ...rest,
            answerType:
              question.answerType === "CHECK_BOX"
                ? "MULTIPLE_CHOICE"
                : question.answerType,
            answerExplanationImages: [] as string[], // TODO: 이미지 업로드 구현 후 제거
            selectOptions: question.selectOptions.map(
              (option) => option.option
            ), // option 속성만 추출
          };
        }),
      };

      console.log("request: %O", quiz);
      // TODO: 제거필요 (테스트용 코드)
      const img : File = quizCreationInfo.questions!.map((question)=> {
        return question.answerExplanationImages[0];
      })[0];

      const formData = new FormData();
      formData.append('file', img);
      await uploadImg(formData);

      //await createQuiz(quiz);
      return;
    }

    const step = steps[currentStep];

    const isNotSubStep = Number.isInteger(currentStep);
    const hasNotSubStep = !step.subSteps;

    if (isNotSubStep && hasNotSubStep) {
      setCurrentStep((prev) => prev + 1);
      return;
    }

    const isLastSubStep =
      step.subSteps &&
      currentStep === step.subSteps[step.subSteps.length - 1].order;
    const isFirstSubStep = step.subSteps;

    if (isLastSubStep) {
      // 마지막 서브스텝인 경우 다음 단계로 이동
      setCurrentStep((prev) => Math.trunc(prev) + 1);
    } else {
      // 서브스텝이 있는 경우
      isFirstSubStep
        ? setCurrentStep((prev) => Math.trunc(prev) + 0.2)
        : setCurrentStep((prev) => Math.trunc(prev) + 0.1);
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
  const endStep = steps.length - 1;

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
        {/* TODO: 테스트용 코드. 지우기 */}
        {/* <button
          onClick={() => {
            setQuizCreationInfo({
              ...quizCreationInfo,
              bookId: 3,
            });
          }}
        >
          dd
        </button>
        <button onClick={() => console.log(quizCreationInfo)}>확인</button> */}
      </div>
    </section>
  );
}
