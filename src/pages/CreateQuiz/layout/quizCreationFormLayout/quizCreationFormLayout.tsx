import styles from "./_quiz_creation_form_layout.module.scss";
import { Step } from "@/pages/CreateQuiz";
import Button from "@/components/atom/button/button.tsx";
import RightArrow from "@/svg/rightArrow.tsx";
import { gray0, gray60 } from "@/styles/abstracts/colors.ts";
import { useAtom } from "jotai";
import { IsQuizNextButtonEnabledAtom, QuizCreationInfoAtom } from "@/store/quizAtom";
import { createQuiz } from "@/services/server/quizService";
import { BookQuizType,BookQuizRequestType } from "@/types/BookQuizType";
import { uploadImg } from "@/services/server/imageService";

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
  const [quizCreationInfo] = useAtom<BookQuizType>(QuizCreationInfoAtom);

  const getCurrentStep = (): Step => {
    const step = steps[currentStep];
    if (step) return step;

    // const mainStep = Math.trunc(currentStep);
    return steps[mainStep]!.subSteps!.find(
      (subStep) => subStep.order === currentStep
    )!;
  };

  const goToNextStep = async () => {
    if (currentStep == endStep) {
      // TODO 퀴즈 생성 api요청

      const quiz: BookQuizRequestType = {
        ...quizCreationInfo,
        bookId: 41,//TODO: bookId 전역관리 구현 후 제거
        questions: quizCreationInfo.questions.map((question) => {
          const { id, ...rest } = question; // id를 제외한 나머지 속성들
          return {
            ...rest, // 나머지 속성들
            answerExplanationImages: [], // TODO: 이미지 업로드 구현 후 제거
            selectOptions: question.selectOptions.map(option => option.option) // option 속성만 추출
          };
        }),
      };


      console.log("request: %O",quiz);
        // TODO: 제거필요 (테스트용 코드)
      // const img : File = quiz.questions.map((question)=> {
      //   return question.answerExplanationImages[0];
      // })[0];

      // const formData = new FormData();
      // formData.append('file', img);
      // await uploadImg(formData);

      await createQuiz(quiz);
      return;
    }

    const hasSubSteps = !!stepItem.subSteps; // 서브스텝이 있는지
    const isSubStep = !Number.isInteger(currentStep); // 2.1, 2.2와 같은 서브스텝일 경우
    const isLastSubStep =
      hasSubSteps &&
      currentStep === stepItem.subSteps![stepItem.subSteps!.length - 1].order; // 마지막 서브스텝일 경우

    if (!isSubStep && !hasSubSteps) {
      // 서브스텝도 아니고 서브스텝을 가지고있는 (메인)스텝도 아닐 경우
      setCurrentStep((prev) => prev + 1); // 그냥 다음 단계 이동
    } else if (isLastSubStep) {
      // 마지막 서브스텝일 경우
      setCurrentStep(mainStep + 1); // 다음 단계로 이동
    } else {
      // 마지막이 아닌 (처음~마지막 전) 서브 스텝일 경우
      setCurrentStep((prev) => prev + 0.1); // 다음 서브스텝으로 이동
    }

    // 새로운 단계(페이지) 넘어갈때 button 상태 다시 disabled로 변경.
    setIsQuizNextButtonEnabled(false);
  };

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
