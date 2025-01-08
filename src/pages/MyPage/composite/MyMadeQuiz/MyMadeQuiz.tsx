import { useQuery } from "@tanstack/react-query";
import { quizKeys } from "@/data/queryKeys";
import QuizListLayout from "../../layout/QuizListLayout/QuizListLayout";
import { useNavigate } from "react-router-dom";
import { quizService } from "@/services/server/quizService";
import ROUTES from "@/data/routes";

export default function MyMadeQuiz() {
  const { isLoading, data: myQuizzesData } = useQuery({
    queryKey: quizKeys.myQuiz(),
    queryFn: async () => await quizService.fetchMyMadeQuizzes(),
  });
  const navigate = useNavigate();
  const handleClickWhenNoData = () => {
    navigate(ROUTES.CREATE_QUIZ);
  };

  const myQuizzes = myQuizzesData?.data;

  if (isLoading || !myQuizzes) {
    return <>로딩</>;
  }

  return (
    <QuizListLayout
      title="내가 만든 퀴즈"
      quizzes={myQuizzes}
      titleWhenNoData="아직 내가 만든 퀴즈가 없어요. 😞"
      buttonNameWhenNoData="퀴즈 만들러 가기"
      onClickBtnWhenNoData={handleClickWhenNoData}
    />
  );
}
