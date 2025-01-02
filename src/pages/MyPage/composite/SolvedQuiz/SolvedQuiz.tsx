import { useQuery } from "@tanstack/react-query";
import { quizKeys } from "@/data/queryKeys";
import QuizListLayout from "../../layout/QuizListLayout/QuizListLayout";
import { quizService } from "@/services/server/quizService";
//import { useNavigate } from "react-router-dom";

export default function SolvedQuiz() {
  const { isLoading, data: myQuizzesData } = useQuery({
    queryKey: quizKeys.myQuiz(),
    queryFn: async () => await quizService.fetchMyMadeQuizzes(),
  });
  //const navigate = useNavigate();
  const onClickBtnWhenNoData = () => {
    //navigate("/create-quiz");
  };
  const myQuizzes = myQuizzesData?.data;
  if (isLoading || !myQuizzes) {
    return <>로딩</>;
  }

  return (
    <QuizListLayout
      title="내가 푼 퀴즈"
      quizzes={myQuizzes}
      titleWhenNoData="아직 내가 푼 퀴즈가 없어요. 😞"
      buttonNameWhenNoData="퀴즈 풀러 가기"
      onClickBtnWhenNoData={onClickBtnWhenNoData}
    />
  );
}
