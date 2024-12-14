import { axiosInstance } from "@/config/axiosConfig";
import { StudyGroupDetailType } from "@/types/StudyGroupType";
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
  fetchStudyGroups = async () => {
    try {
      const { data } = await axiosInstance.get("/study-groups/my");
      return data;
    } catch (error) {
      handleAxiosError(error);
    }
  };

  // 스터디 그룹 생성
  createStudyGroup = async (
    studyName: string
  ): Promise<{ id: number } | null> => {
    console.log(studyName);
    try {
      const { data } = await axiosInstance.post("/study-groups", {
        name: studyName,
      });
      return data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  };

  // 초대코드로 스터디 그룹 참여
  joinStudyGroup = async (inviteCode: string) => {
    try {
      const response = await axiosInstance.post("/study-groups/join", {
        inviteCode,
      });
      console.log(response);
    } catch (error) {
      throw new Error(`스터디 그룹 초대코드로 참여 실패: ${error}`);
    }
  };
}
export const studyGroupService = new StudyGroupService();
