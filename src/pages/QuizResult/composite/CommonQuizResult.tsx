import styles from "../_quiz_result.module.scss";
import Lottie from "lottie-react";
import confetti from "@/animation/confetti.json";
import { useQuery } from "@tanstack/react-query";
import { quizService } from "@/services/server/quizService";
import { quizKeys } from "@/data/queryKeys";
import solvingQuizCompleteImage from "/public/assets/image/solving-quiz-complete.png";
import LoadingSpinner from "@/components/atom/LoadingSpinner/LoadingSpinner";
interface Props {
  solvingQuizId: string;
}

export default function CommonQuizResult({ solvingQuizId }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: quizKeys.result(solvingQuizId),
    queryFn: () => quizService.fetchGradeResult(solvingQuizId),
  });

  if (isLoading) {
    return <LoadingSpinner pageCenter width={40} />;
  }

  return (
    <section className={styles["common-quiz-container"]}>
      <p className={styles["title"]}>
        {data?.questionCount}문제 중에 <span>{data?.correctCount}</span>문제를
        맞혔어요!
      </p>
      <div className={styles["result-img"]}>
        <img src={solvingQuizCompleteImage} width={492} height={420} alt="" />
        <Lottie className={styles["confetti"]} animationData={confetti} />
      </div>
    </section>
  );
}
