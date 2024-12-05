import { QuizRequestType } from "@/types/QuizType";
import { QuizType } from "@/types/QuizType";
import { MyQuizType } from "@/types/QuizType";
import { axiosInstance } from "@/config/axiosConfig";

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
}

export const quizService = new QuizService();
