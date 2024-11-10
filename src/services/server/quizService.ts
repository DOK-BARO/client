import { BookQuizType } from "@/types/BookQuizType";
import axios, { AxiosError } from "axios";

export const createQuiz = async (quiz: BookQuizType) => {
    try {
        const { data } = await axios.post("/book-quizzes", {
            quiz
        });
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

