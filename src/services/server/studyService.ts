import { StudyGroupType } from "@/types/StudyGroupType";
import axios from "axios";

// 스터디 그룹 생성
export const createStudyGroup = async (
  studyInfo: Omit<StudyGroupType, "id">
) => {
  try {
    const response = await axios.post("/study-groups", studyInfo);
    console.log(response);
  } catch (error) {
    console.error(`스터디 그룹 생성 실패: ${error}`);
  }
};
