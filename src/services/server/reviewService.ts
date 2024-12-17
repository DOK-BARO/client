import { axiosInstance } from "@/config/axiosConfig";
import { ReviewsTotalScore, ReviewType } from "@/types/ReviewType";
import { handleAxiosError } from "@/utils/errorHandler";

class ReviewService {
  // 퀴즈 요약 목록 조회
  fetchReviews = async (quizId: number): Promise<ReviewType[] | null> => {
    try {
      const { data } = await axiosInstance.get("/quiz-reviews/total-score", {
        params: {
          quizId,
        },
      });
      return data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  };

  // 퀴즈 리뷰 총평 (별점, 난이도) 조회
  fetchReviewsTotalScore = async (
    quizId: number
  ): Promise<ReviewsTotalScore | null> => {
    try {
      const { data } = await axiosInstance.get("/quiz-reviews/total-score", {
        params: {
          quizId,
        },
      });
      return data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  };
}
export const reviewService = new ReviewService();
