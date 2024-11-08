import axios from "axios";

// 스터디 그룹 생성
export const createStudyGroup = async (
  studyName: string
): Promise<{ id: string }> => {
  try {
    const { data } = await axios.post("/study-groups", { studyName });
    console.log(data);
    return data;
  } catch (error) {
    throw new Error(`스터디 그룹 생성 실패: ${error}`);
  }
};
