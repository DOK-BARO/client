import ProgressBar from "./progressBar";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { quizKeys } from "@/data/queryKeys";
import { quizService } from "@/services/server/quizService";
export default function SolvingQuiz() {
		//TODO: 퀴즈 풀러가기 버튼 핸들러 구현 지점에서 사용될 hook으로 만들어도 될듯
	// await quizService.startSolvingQuiz(bookDetailContent.id.toString());
	// navigate(`/quiz/${bookDetailContent.id}`);
	const { quizId } = useParams<{ quizId: string }>();
	if (!quizId) return;

	const { data: quiz, isLoading: isQuizLoading } = useQuery({
		queryKey: quizKeys.detail(quizId),
		queryFn: () => quizService.fetchQuiz(quizId),
	});

	// TODO 에러처리 필요
	if (!quiz) {
		return <div>퀴즈 없음</div>
	}
	if (isQuizLoading) {
		return <>로딩</>
	}
	return (
		<ProgressBar
		questions={quiz.questions}
	/>
	);
	
}

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