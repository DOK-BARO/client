import { useEffect, useState } from "react";
import QuestionForm from "./QuestionForm";
import useUpdateQuizCreationInfo from "@/hooks/useUpdateQuizCreationInfo";
import { AnswerType, QuestionFormType } from "@/types/QuizType";

export default function QuizWriteGuideForm() {
  const { quizCreationInfo, updateQuizCreationInfo } =
    useUpdateQuizCreationInfo();
  const defaultAnswerType: AnswerType = "MULTIPLE_CHOICE_SINGLE_ANSWER";
  const [questionForms, setQuestionForms] = useState<QuestionFormType[]>([]);
  const [isInitialized, setIsInitialized] = useState(false); // 초기화 여부 확인

  useEffect(() => {
    updateQuizCreationInfo("questions", [
      {
        id: -1,
        content:
          "다음 중 CPU 레지스터에 대한 설명으로 옳지 않은 것을 고르시오.",
        answers: ["1"],
        answerType: defaultAnswerType,
        selectOptions: [
          {
            id: 0,
            value: "0",
            option:
              "프로그램 카운터(PC)는 메모리에서 다음으로 읽어 들일 명령의 주소를 저장한다.",
          },
          {
            id: 1,
            value: "1",
            option:
              "인터럽트 발생 시 레지스터 내 모든 내용을 메모리 내 힙에 백업한다.",
          },
        ],
      },
    ]);
  }, []);

  useEffect(() => {
    if (!quizCreationInfo.questions || isInitialized) return;
    const quizWriteForms: QuestionFormType[] = quizCreationInfo.questions.map(
      (question) =>
        ({
          id: question.id,
          answerType: question.answerType,
          component: (
            <QuestionForm
              questionFormId={question.id!}
              deleteQuestion={() => {}}
              onUpdateQuestionFormsWithAnswerType={() => {}}
              answerType={question.answerType}
            />
          ),
        }) as QuestionFormType,
    );
    setQuestionForms(quizWriteForms);
    setIsInitialized(true); // 초기화 완료 설정
  }, [quizCreationInfo, isInitialized]);

  return isInitialized
    ? questionForms.map((item) => <div key={item.id}>{item.component}</div>)
    : null;
}
