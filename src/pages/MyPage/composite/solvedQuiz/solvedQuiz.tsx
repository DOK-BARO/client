
import { fetchMyMadeQuizzes } from "@/services/server/quizService";
import { useQuery } from "@tanstack/react-query";
import { quizKey } from "@/data/queryKeys";
import QuizListLayout from "../../layout/quizListLayout/quizListLayout";
//import { useNavigate } from "react-router-dom";

export default function SolvedQuiz() {

  const { isLoading, data: myQuizzes } = useQuery({
    queryKey: quizKey.myQuiz(),
    queryFn: async () => await fetchMyMadeQuizzes(),
  });
  //const navigate = useNavigate();
  const onClickBtnWhenNoData = (_: React.MouseEvent<HTMLButtonElement>) => {
    //navigate("/create-quiz");
  }

  if (isLoading) {
    return <>로딩</>;
  }

  return (
    <QuizListLayout
      quizzes={myQuizzes!}
      titleWhenNoData="아직 내가 푼 퀴즈가 없어요. 😞"
      buttonNameWhenNoData="퀴즈 풀러 가기"
      onClickBtnWhenNoData={onClickBtnWhenNoData}
    />
  );
}
