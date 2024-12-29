import { axiosInstance } from "@/config/axiosConfig";
import { FetchStudyGroupsParams } from "@/types/ParamsType";
import {
  StudyGroupCreationType,
  StudyGroupDetailType,
  StudyGroupMyUnSolvedQuizType,
  StudyGroupType,
} from "@/types/StudyGroupType";
import { handleAxiosError } from "@/utils/errorHandler";

class StudyGroupService {
  // 스터디 그룹 상세 조회
  fetchStudyGroup = async (
    id: number
  ): Promise<StudyGroupDetailType | null> => {
    try {
      const { data } = await axiosInstance.get(`/study-groups/${id}`);
      return data;
    } catch (error) {
      console.log(error);
      handleAxiosError(error);
      return null;
    }
  };

  // 내가 속한 스터디 그룹 조회
  fetchStudyGroups = async (
    params: FetchStudyGroupsParams
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
    studyGroup: StudyGroupCreationType
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
    try {
      const response = await axiosInstance.post("/study-groups/join", {
        inviteCode,
      });
      console.log(response);
    } catch (error) {
      handleAxiosError(error);
    }
  };

  // 스터디 그룹 퀴즈 중 안 푼 문제 조회 (풀어야 할 퀴즈)
  fetchStudyGroupMyUnsolvedQuizzes = async (
    studyGroupId: number,
    params: FetchStudyGroupsParams
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
        }
      );
      console.log(response);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  };
}
export const studyGroupService = new StudyGroupService();
