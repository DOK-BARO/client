
import { fetchMyMadeQuizzes } from "@/services/server/quizService";
import { useQuery } from "@tanstack/react-query";
import { quizKey } from "@/data/queryKeys";
import QuizListLayout from "../../layout/quizListLayout/quizListLayout";
import { useNavigate } from "react-router-dom";

export default function MyMadeQuiz() {

  const { isLoading, data: myQuizzes } = useQuery({
    queryKey: quizKey.myQuiz(),
    queryFn: async () => await fetchMyMadeQuizzes(),
  });
  const navigate = useNavigate();
  const handleClickWhenNoData = (_: React.MouseEvent<HTMLButtonElement>) => {
    navigate("/create-quiz");
  }

  if (isLoading) {
    return <>로딩</>;
  }

  return (
    <QuizListLayout
      title="내가 만든 퀴즈"
      quizzes={myQuizzes!}
      titleWhenNoData="아직 내가 만든 퀴즈가 없어요. 😞"
      buttonNameWhenNoData="퀴즈 만들러 가기"
      onClickBtnWhenNoData={handleClickWhenNoData}
    />
  );
}
