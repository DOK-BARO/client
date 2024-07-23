import axios from "axios";

const baseUrl = "https://dev.dokbaro.kro.kr/api";

export const getKakaoAuthUrl = async (): Promise<string> => {
  console.log("get kakao auth url");
  try {
    const response = await axios.get(`${baseUrl}/auth/oauth2/authorize/KAKAO`);
    console.log(response.data.url);
    return response.data.url;
  } catch (error) {
    throw new Error(`권한 부여 URL 가져오기 실패: ${error}`);
  }
};
