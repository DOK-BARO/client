import styles from "./quiz_solving_form_layout.module.scss";
import Button from "@/components/atom/button/button";
// import { ArrowRight } from "@/svg/rightArrow";
import { gray60 } from "@/styles/abstracts/colors";
// import { useQuery } from "@tanstack/react-query";
// import { quizService } from "@/services/server/quizService";
import { useParams } from "react-router-dom";

export default function QuizSolvingFormLayout() {
  // const quizItemLength = 10;
  const { id } = useParams<{ id: string }>();
  if (!id) return;

  // const { data: quiz, isLoading: isQuizLoading } = useQuery({
  //   queryKey: quizKeys.quiz(),
  //   queryFn: () => quizService.fetchQuiz(id),
  // });

  return (
    <section className={styles.container}>
      {/* 프로그래스 바 */}
      {/* {quiz.title} */}
      {/* 퀴즈 타입(단수 정답 등) */}
      {/* 퀴즈 제목 */}
      {/* 퀴즈 선택 옵션 */}
      {/* <Button
        disabled
        size="medium"
        icon={<ArrowRight stroke={gray60} width={20} height={20} />}
      >
        체점하기
      </Button> */}
    </section>
  );
}
