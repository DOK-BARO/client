import { axiosInstance } from "@/config/axiosConfig";
import { ReviewsFetchType } from "@/types/ParamsType";
import {
  MyReviewType as MyReviewFetchType,
  ReviewCreateType,
  ReviewsTotalScoreType,
  ReviewType,
} from "@/types/ReviewType";
import { handleAxiosError } from "@/utils/errorHandler";

class ReviewService {
  // 퀴즈 요약 목록 조회
  fetchReviews = async (
    params: ReviewsFetchType,
  ): Promise<{ endPageNumber: number; data: ReviewType[] } | null> => {
    const { page = 1, size = 10, quizId, sort, direction } = params;
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
    quizId: number,
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

  // 내가 작성한 퀴즈 리뷰 조회
  fetchMyReview = async (quizId: number): Promise<MyReviewFetchType | null> => {
    try {
      const { data } = await axiosInstance.get("/quiz-reviews/my", {
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

  createQuizReview = async (
    review: ReviewCreateType,
  ): Promise<{ id: number } | null> => {
    try {
      const { data } = await axiosInstance.post("/quiz-reviews", review);
      return data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  };

  deleteQuizReview = async (id: number): Promise<void> => {
    try {
      await axiosInstance.delete(`/quiz-reviews/${id}`);
    } catch (error) {
      handleAxiosError(error);
    }
  };

  updateQuizReview = async ({
    id,
    review,
  }: {
    id: number;
    review: ReviewCreateType;
  }): Promise<void> => {
    try {
      await axiosInstance.put(`/quiz-reviews/${id}`, review);
    } catch (error) {
      handleAxiosError(error);
    }
  };

  // 신고하기
  reportQuizReview = async ({
    quizReviewId,
    content,
  }: {
    quizReviewId: number;
    content: string;
  }): Promise<{ id: number } | null> => {
    try {
      const response = await axiosInstance.post("/quiz-review-reports", {
        quizReviewId,
        content,
      });
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  };
}
export const reviewService = new ReviewService();
