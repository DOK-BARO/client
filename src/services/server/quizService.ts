import { QuizType } from "@/types/BookQuizType";
import axios from "axios";

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
