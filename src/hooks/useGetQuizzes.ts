import { fetchQuizzes } from "@/services/server/quizService";
import { QuizType } from "@/types/QuizType";
import { useEffect, useState } from "react";

// 퀴즈 목록들을 불러오는 훅
export const useGetQuizzes = (params: {
  page?: number;
  size?: number;
  bookId: string;
  sort?: "CREATED_AT" | "STAR_RATING";
  direction?: "ASC" | "DESC";
}) => {
  const [quizzes, setQuizzes] = useState<QuizType[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getQuizzes = async () => {
    setIsLoading(true);
    const { data } = await fetchQuizzes(params);
    if (data) {
      setQuizzes(data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getQuizzes();
  }, []);

  return { quizzes, isLoading };
};
