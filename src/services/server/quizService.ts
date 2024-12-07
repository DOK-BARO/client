import { QuizRequestType } from "@/types/QuizType";
import { QuizType, SolvingQuizType } from "@/types/QuizType";
import { MyQuizType } from "@/types/QuizType";
import { axiosInstance } from "@/config/axiosConfig";
import { QuestionCheckedResult } from "@/types/QuizType";

class QuizService {
	fetchQuizzes = async (params: {
		page?: number;
		size?: number;
		bookId: string;
		sort?: "CREATED_AT" | "STAR_RATING";
		direction?: "ASC" | "DESC";
	}): Promise<{ data: QuizType[]; endPageNumber: number }> => {
		try {
			const {
				page = 0,
				size = 10,
				bookId,
				sort = "CREATED_AT",
				direction = "ASC",
			} = params;

			const { data } = await axiosInstance.get("/book-quizzes", {
				params: { page, size, bookId, sort, direction },
			});

			console.log(data);
			return data;
		} catch (error) {
			throw new Error(`스터디 그룹 생성 실패: ${error}`);
		}
	};

	createQuiz = async (quiz: QuizRequestType) => {
		try {
			const { data } = await axiosInstance.post("/book-quizzes", quiz);
			console.log("data result: %o", data);
			return data;
		} catch (error) {
			throw new Error(`Unexpected error: ${error}`);
		}
	};

	fetchMyMadeQuizzes = async (): Promise<MyQuizType[]> => {
		try {
			const { data } = await axiosInstance.get("/book-quizzes/my");
			console.log("quizzes: %o", data);
			return data;
		} catch (error) {
			throw new Error(`내가 만든 퀴즈 가져오기 실패: ${error}`);
		}
	};
	fetchQuiz = async (quizId: string): Promise<SolvingQuizType> => {
		try {
			const { data } = await axiosInstance.get(`/book-quizzes/${quizId}/questions`);
			return data;
		} catch (error) {
			throw new Error(`풀이할 퀴즈 가져오기 실패: ${error}`);
		}
	}

	// 북 퀴즈 풀기 시작 요청 함수. 백엔드 쪽에서 정답을 적을 omr카드 만드는 개념이라고 함..
	startSolvingQuiz = async (quizId: string) => {
		try {
			const { data } = await axiosInstance.post(`/solving-quiz/start`, {
				"quizId": quizId,
			});
			return data;
		} catch (error) {
			throw new Error(`북 퀴즈 풀기 시작 실패: ${error}`);
		}
	}

	submitQuestion = async (solvingQuizId:string, questionId: number, answers: string[]): Promise<QuestionCheckedResult> => {
		try {
			const { data } = await axiosInstance.post(`/solving-quiz/${solvingQuizId.toString()}/sheets`, {
				"questionId": questionId,
				"answers": answers,
			});
			return data;
		} catch (error) {
			throw new Error(`북 퀴즈 문제 풀기 제출 실패: ${error}`)
		}
	}

}

export const quizService = new QuizService();
