import { axiosInstance } from "@/config/axiosConfig";
import { StudyGroupsFetchType } from "@/types/ParamsType";
import {
  StudyGroupPostType as StudyGroupCreateType,
  StudyGroupDetailType as StudyGroupDetailFetchType,
  StudyGroupMySolvedQuizType,
  StudyGroupMyUnSolvedQuizType,
  StudyGroupType,
  QuizStudyGroupGradeResultType,
} from "@/types/StudyGroupType";
import { handleAxiosError } from "@/utils/errorHandler";

class StudyGroupService {
  // 스터디 그룹 상세 조회
  fetchStudyGroup = async (
    id: number,
  ): Promise<StudyGroupDetailFetchType | null> => {
    try {
      const { data } = await axiosInstance.get(`/study-groups/${id}`);
      return data;
    } catch (error) {
      // console.log(error);
      handleAxiosError(error);
      return null;
    }
  };

  // 내가 속한 스터디 그룹 조회
  fetchStudyGroups = async (
    params: StudyGroupsFetchType,
  ): Promise<{ data: StudyGroupType[]; endPageNumber: number } | null> => {
    const { page, size, sort, direction } = params;
    try {
      const { data } = await axiosInstance.get("/study-groups/my", {
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

  // 스터디 그룹 생성
  createStudyGroup = async (
    studyGroup: StudyGroupCreateType,
  ): Promise<{ id: number } | null> => {
    try {
      const { data } = await axiosInstance.post("/study-groups", studyGroup);
      return data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  };

  // 초대코드로 스터디 그룹 참여
  joinStudyGroup = async (inviteCode: string): Promise<void> => {
    console.log("입력된 초대코드", inviteCode);
    try {
      await axiosInstance.post("/study-groups/join", {
        inviteCode,
      });
      // console.log(response);
    } catch (error) {
      handleAxiosError(error);
    }
  };

  // 스터디 그룹 퀴즈 중 안 푼 문제 조회 (풀어야 할 퀴즈)
  fetchStudyGroupMyUnsolvedQuizzes = async (
    studyGroupId: number,
    params: StudyGroupsFetchType,
  ): Promise<{
    endPageNumber: number;
    data: StudyGroupMyUnSolvedQuizType[];
  } | null> => {
    const { page, size, sort, direction } = params;

    try {
      const response = await axiosInstance.get(
        `/book-quizzes/study-groups/${studyGroupId}/unsolved`,
        {
          params: {
            page,
            size,
            sort,
            direction,
          },
        },
      );
      // console.log(response);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  };

  // 스터디 그룹 퀴즈 중 내가 푼 문제 조회 (제출 한 퀴즈)
  fetchStudyGroupMySolvedQuizzes = async (
    studyGroupId: number,
    params: StudyGroupsFetchType,
  ): Promise<{
    endPageNumber: number;
    data: StudyGroupMySolvedQuizType[];
  } | null> => {
    const { page, size, sort, direction } = params;

    try {
      const response = await axiosInstance.get(
        `/solving-quiz/study-groups/${studyGroupId}/my`,
        {
          params: {
            page,
            size,
            sort,
            direction,
          },
        },
      );
      // console.log(response);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  };

  deleteStudyGroup = async (id: number): Promise<void> => {
    try {
      await axiosInstance.delete(`/study-groups/${id}`);
      // console.log(response);
    } catch (error) {
      handleAxiosError(error);
    }
  };

  updateStudyGroup = async ({
    id,
    studyGroup,
  }: {
    id: number;
    studyGroup: StudyGroupCreateType;
  }): Promise<void> => {
    try {
      await axiosInstance.put(`/study-groups/${id}`, studyGroup);
    } catch (error) {
      handleAxiosError(error);
    }
  };

  changeStudyGroupLeader = async ({
    studyGroupId,
    newLeaderId,
  }: {
    studyGroupId: number;
    newLeaderId: number;
  }): Promise<void> => {
    try {
      await axiosInstance.post(`/study-groups/${studyGroupId}/change-leader`, {
        newLeaderId,
      });
      // console.log(response);
    } catch (error) {
      handleAxiosError(error);
    }
  };

  // 스터디 그룹 탈퇴
  withdrawStudyGroupMember = async ({
    studyGroupId,
    memberId,
  }: {
    studyGroupId: number;
    memberId: number;
  }): Promise<void> => {
    try {
      await axiosInstance.post(`/study-groups/${studyGroupId}/withdraw`, {
        memberId,
      });
      // console.log(response);
    } catch (error) {
      handleAxiosError(error);
    }
  };

  // 스터디 그룹 내 랭킹 조회
  fetchQuizStudyGroupGradeResult = async ({
    studyGroupId,
    quizId,
  }: {
    studyGroupId: number;
    quizId: number;
  }): Promise<QuizStudyGroupGradeResultType | null> => {
    try {
      const response = await axiosInstance.get(
        "/solving-quiz/study-groups-grade-result",
        {
          params: {
            studyGroupId,
            quizId,
          },
        },
      );
      // console.log(response);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  };

  // 초대 코드를 통한 스터디 그룹 상세 조회
  fetchStudyGroupDetailByInviteCode = async (
    inviteCode: string,
  ): Promise<StudyGroupDetailFetchType | null> => {
    try {
      const { data } = await axiosInstance.get(
        `/study-groups/invite-code/${inviteCode}`,
      );
      return data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  };
}
export const studyGroupService = new StudyGroupService();
