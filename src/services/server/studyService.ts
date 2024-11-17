import axios from "axios";

// 스터디 그룹 생성
export const createStudyGroup = async (
  studyName: string
): Promise<{ id: string }> => {
  try {
    const { data } = await axios.post("/study-groups", { name: studyName });
    console.log(data);
    return data;
  } catch (error) {
    throw new Error(`스터디 그룹 생성 실패: ${error}`);
  }
};

// 초대코드로 스터디 그룹 참여
export const joinStudyGroup = async (inviteCode: string) => {
  try {
    const response = await axios.post("/study-groups/join", { inviteCode });
    console.log(response);
  } catch (error) {
    throw new Error(`스터디 그룹 초대코드로 참여 실패: ${error}`);
  }
};
