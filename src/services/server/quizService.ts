import { QuizExplanationType, QuizRequestType } from "@/types/QuizType";
import { QuizType, SolvingQuizType } from "@/types/QuizType";
import { MyQuizType } from "@/types/QuizType";
import { axiosInstance } from "@/config/axiosConfig";
import { QuestionCheckedResult } from "@/types/QuizType";
import { handleAxiosError } from "@/utils/errorHandler";
import { FetchQuizzesParams } from "@/types/ParamsType";
import { SolvingQuizGradeReuslt } from "@/types/QuizType";
import { SolvingQuizStudyGroupGradeReuslt } from "@/types/QuizType";
import { FetchMyQuizzesParams } from "@/types/ParamsType";
class QuizService {
  fetchQuizzes = async (
    params: FetchQuizzesParams
  ): Promise<{ data: QuizType[]; endPageNumber: number } | null> => {
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
      handleAxiosError(error);
      return null;
    }
  };

  createQuiz = async (
    quiz: QuizRequestType
  ): Promise<{ id: number } | null> => {
    try {
      const { data } = await axiosInstance.post("/book-quizzes", quiz);
      console.log("data result: %o", data);
      return data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  };

  modifyQuiz = async ({editQuizId, quiz}:{editQuizId: string, quiz: QuizRequestType}) => {
    try {
      await axiosInstance.put(`book-quizzes/${editQuizId}`,quiz);
    } catch (error) {
      handleAxiosError(error);
    }
  }

  fetchMyMadeQuizzes = async (
    params: FetchMyQuizzesParams
  ): Promise<MyQuizType | null> => {
    try {
      const { page, size, sort, direction } = params;
      const { data } = await axiosInstance.get(
        `/book-quizzes/my?page=${page}&size=${size}&sort=${sort}&direction=${direction}`
      );
      return data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  };

  fetchMySolvedQuizzes = async (
    params: FetchMyQuizzesParams
  ): Promise<MyQuizType | null> => {
    try {
      const { page, size, sort, direction } = params;
      const { data } = await axiosInstance.get(
        `/solving-quiz/my?page=${page}&size=${size}&sort=${sort}&direction=${direction}`
      );
      return data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  };

  fetchQuiz = async (quizId: string): Promise<SolvingQuizType | null> => {
    try {
      const { data } = await axiosInstance.get(
        `/book-quizzes/${quizId}/questions`
      );
      return data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  };

  fetchQuizExplanation = async (
    id: string
  ): Promise<QuizExplanationType | null> => {
    try {
      const { data } = await axiosInstance.get(
        `/book-quizzes/${id}/explanation`
      );
      return data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  };

  // 북 퀴즈 풀기 시작 요청 함수. 백엔드 쪽에서 정답을 적을 omr카드 만드는 개념이라고 함..
  startSolvingQuiz = async (quizId: string) => {
    try {
      const { data } = await axiosInstance.post(`/solving-quiz/start`, {
        quizId: quizId,
      });
      return data;
    } catch (error) {
      throw new Error(`북 퀴즈 풀기 시작 실패: ${error}`);
    }
  };

  submitQuestion = async (
    solvingQuizId: string,
    questionId: number,
    answers: string[]
  ): Promise<QuestionCheckedResult> => {
    try {
      const { data } = await axiosInstance.post(
        `/solving-quiz/${solvingQuizId.toString()}/sheets`,
        {
          questionId: questionId,
          answers: answers,
        }
      );
      return data;
    } catch (error) {
      throw new Error(`북 퀴즈 문제 풀기 제출 실패: ${error}`);
    }
  };

  fetchGradeResult = async (
    solvingQuizId: string
  ): Promise<SolvingQuizGradeReuslt> => {
    try {
      const { data } = await axiosInstance.get(
        `/solving-quiz/${solvingQuizId}/grade-result`
      );
      return data;
    } catch (error) {
      throw new Error(`푼 퀴즈 결과 보기 조회 실패: ${error}`);
    }
  };

  fetchStudyGradeResult = async (
    studyGroupId: string,
    quizId: string
  ): Promise<SolvingQuizStudyGroupGradeReuslt> => {
    try {
      const { data } = await axiosInstance.get(
        `/solving-quiz/study-groups-grade-result?studyGroupId=${studyGroupId}&quizId=${quizId}`
      );
      return data;
    } catch (error) {
      throw new Error(`스터디 그룹 내 랭킹 조회 ${error}`);
    }
  };
  reportQuiz = async ({
    questionId,
    contents,
  }: {
    questionId: number;
    contents: string[];
  }): Promise<{ id: number } | null> => {
    console.log(questionId, contents);
    try {
      const response = await axiosInstance.post("/quiz-question-reports", {
        questionId,
        contents,
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      handleAxiosError(error);
      return null;
    }
  };

  deleteQuiz = async (quizId: string) => {
    try {
      await axiosInstance.delete(`/book-quizzes/${quizId}`);
    } catch (error) {
      handleAxiosError(error);
    }
  };

  // 퀴즈 수정 시 사용되는 퀴즈 상세조회 (정답, 정답 설명을 포함한 조회)
  fetchQuizzesDetail = async (quizId: string): Promise<QuizRequestType> => {
    try {
      const response = await axiosInstance.get(`/book-quizzes/${quizId}`);
      return response.data;

    } catch (error) {
      throw new Error(`퀴즈 수정용 데이터 가져오기 실패: ${error}`);
    }
  }
}

export const quizService = new QuizService();
