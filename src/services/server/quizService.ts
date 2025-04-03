import {
  QuizExplanationType as QuizExplanationFetchType,
  QuizCreateType,
} from "@/types/QuizType";
import { QuizType, SolvingQuizFetchType } from "@/types/QuizType";
import { MyQuizFetchType } from "@/types/QuizType";
import { axiosInstance } from "@/config/axiosConfig";
import { QuestionCheckedResultType } from "@/types/QuizType";
import { handleAxiosError } from "@/utils/errorHandler";
import { MySolvedQuizzesFetchType, QuizzesFetchType } from "@/types/ParamsType";
import { SolvingQuizGradeResultType as SolvingQuizGradeResultFetchType } from "@/types/QuizType";
import { SolvingQuizStudyGroupGradeResultType as SolvingQuizStudyGroupGradeResultFetchType } from "@/types/QuizType";
import { MyMadeQuizzesFetchType } from "@/types/ParamsType";
class QuizService {
  fetchQuizzes = async (
    params: QuizzesFetchType,
  ): Promise<{ data: QuizType[]; endPageNumber: number } | null> => {
    try {
      const { page, size, bookId, sort, direction } = params;

      const { data } = await axiosInstance.get("/book-quizzes", {
        params: { page, size, bookId, sort, direction },
      });
      return data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  };

  createQuiz = async (quiz: QuizCreateType): Promise<{ id: number } | null> => {
    try {
      const { data } = await axiosInstance.post("/book-quizzes", quiz);
      return data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  };

  modifyQuiz = async ({
    editQuizId,
    quiz,
  }: {
    editQuizId: number;
    quiz: QuizCreateType;
  }) => {
    try {
      await axiosInstance.put(`book-quizzes/${editQuizId}`, quiz);
    } catch (error) {
      handleAxiosError(error);
    }
  };

  fetchMyMadeQuizzes = async (
    params: MyMadeQuizzesFetchType,
  ): Promise<MyQuizFetchType | null> => {
    try {
      const { page, size, sort, direction, temporary, viewScope, studyGroup } =
        params;
      const { data } = await axiosInstance.get("/book-quizzes/my", {
        params: {
          page,
          size,
          sort,
          direction,
          temporary,
          viewScope,
          studyGroup,
        },
      });
      return data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  };

  fetchMySolvedQuizzes = async (
    params: MySolvedQuizzesFetchType,
  ): Promise<MyQuizFetchType | null> => {
    try {
      const { page, size, sort, direction } = params;
      const { data } = await axiosInstance.get("/solving-quiz/my", {
        params: {
          page,
          size,
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

  fetchQuiz = async (quizId: number): Promise<SolvingQuizFetchType | null> => {
    try {
      const { data } = await axiosInstance.get(
        `/book-quizzes/${quizId}/questions`,
      );
      return data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  };

  fetchQuizExplanation = async (
    id: number,
  ): Promise<QuizExplanationFetchType | null> => {
    try {
      const { data } = await axiosInstance.get(
        `/book-quizzes/${id}/explanation`,
      );
      return data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  };

  // 북 퀴즈 풀기 시작 요청 함수. 백엔드 쪽에서 정답을 적을 omr카드 만드는 개념이라고 함..
  startSolvingQuiz = async (quizId: number): Promise<{ id: number } | null> => {
    try {
      const { data } = await axiosInstance.post("/solving-quiz/start", {
        quizId: quizId,
      });
      return data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  };

  submitQuestion = async (
    solvingQuizId: number,
    questionId: number,
    answers: string[],
  ): Promise<QuestionCheckedResultType> => {
    try {
      const { data } = await axiosInstance.post(
        `/solving-quiz/${solvingQuizId.toString()}/sheets`,
        {
          questionId: questionId,
          answers: answers,
        },
      );
      return data;
    } catch (error) {
      throw new Error(`북 퀴즈 문제 풀기 제출 실패: ${error}`);
    }
  };

  fetchGradeResult = async (
    solvingQuizId: number,
  ): Promise<SolvingQuizGradeResultFetchType> => {
    try {
      const { data } = await axiosInstance.get(
        `/solving-quiz/${solvingQuizId}/grade-result`,
      );
      return data;
    } catch (error) {
      throw new Error(`푼 퀴즈 결과 보기 조회 실패: ${error}`);
    }
  };

  fetchStudyGradeResult = async (
    studyGroupId: number,
    quizId: number,
  ): Promise<SolvingQuizStudyGroupGradeResultFetchType> => {
    try {
      const { data } = await axiosInstance.get(
        `/solving-quiz/study-groups-grade-result?studyGroupId=${studyGroupId}&quizId=${quizId}`,
      );
      return data;
    } catch (error) {
      throw new Error(`스터디 내 랭킹 조회 ${error}`);
    }
  };

  reportQuiz = async () => {
    // console.log("준비중인 기능입니다.");
  };

  // 퀴즈 개별 신고하기
  reportQuizQuestion = async ({
    questionId,
    contents,
  }: {
    questionId: number;
    contents: string[];
  }): Promise<{ id: number } | null> => {
    try {
      const response = await axiosInstance.post("/quiz-question-reports", {
        questionId,
        contents,
      });
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  };

  deleteQuiz = async (quizId: number) => {
    try {
      await axiosInstance.delete(`/book-quizzes/${quizId}`);
    } catch (error) {
      handleAxiosError(error);
    }
  };

  // 퀴즈 수정 시 사용되는 퀴즈 상세조회 (정답, 정답 설명을 포함한 조회)
  fetchQuizzesDetail = async (quizId: number): Promise<QuizCreateType> => {
    try {
      const response = await axiosInstance.get(`/book-quizzes/${quizId}`);
      return response.data;
    } catch (error) {
      throw new Error(`퀴즈 수정용 데이터 가져오기 실패: ${error}`);
    }
  };
}

export const quizService = new QuizService();
