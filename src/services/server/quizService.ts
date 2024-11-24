import { QuizRequestType } from "@/types/QuizType";
import axios, { AxiosError } from "axios";
import { QuizType } from "@/types/QuizType";
import { MyQuizType } from "@/types/QuizType";
//TODO: 클래스화
// 퀴즈 목록 조회
// TODO: fetchQuizzes
export const fetchQuizzes = async (params: {
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

    const { data } = await axios.get("/book-quizzes", {
      params: { page, size, bookId, sort, direction },
    });

    console.log(data);
    return data;
  } catch (error) {
    throw new Error(`스터디 그룹 생성 실패: ${error}`);
  }
};


export const createQuiz = async (quiz: QuizRequestType) => {
    try {
        const { data } = await axios.post("/book-quizzes",quiz);
        console.log("data result: %o",data);
        return data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            if (axiosError.response?.status === 404) {
                throw error;
            }
            throw new Error(`퀴즈 생성 요청 실패: ${error}`);
        } else {
            throw new Error(`Unexpected error: ${error}`);
        }
    }
};

export const fetchMyMadeQuizzes = async ():Promise<MyQuizType[]> => {
  try {
    const {data} = await axios.get("/book-quizzes/my");
    console.log("quizzes: %o",data);
    return data;
  }catch  (error: unknown) {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 404) {
            throw error;
        }
        throw new Error(`내가 만든 퀴즈 가져오기 실패: ${error}`);
    } else {
        throw new Error(`Unexpected error: ${error}`);
    }
}
}

