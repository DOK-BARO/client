import { axiosInstance } from "@/config/axiosConfig";
import { FetchReviewsParams } from "@/types/ParamsType";
import { ReviewsTotalScoreType, ReviewType } from "@/types/ReviewType";
import { handleAxiosError } from "@/utils/errorHandler";
import { CreateReviewParams } from "@/types/ParamsType";

class ReviewService {
  // 퀴즈 요약 목록 조회
  fetchReviews = async (
    params: FetchReviewsParams
  ): Promise<{ endPageNumber: number; data: ReviewType[] } | null> => {
    const { page = 1, size = 10, quizId, sort, direction } = params;
    console.log(params);
    try {
      const { data } = await axiosInstance.get("/quiz-reviews", {
        params: {
          page,
          size,
          quizId,
          sort,
          direction,
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
  ): Promise<ReviewsTotalScoreType | null> => {
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

	createQuizReview = async (params:CreateReviewParams) => {
		try{
			const { data } = await axiosInstance.post(`/quiz-reviews`,params);
			return data;
		}catch(error){
			throw new Error(`퀴즈 리뷰 생성 실패: ${error}`)
		}
	}
}
export const reviewService = new ReviewService();
