import axios from "axios";

export const getKakaoAuthUrl = async (): Promise<string> => {
  console.log("get kakao auth url");
  try {
    const response = await axios.get("/auth/oauth2/authorize/KAKAO");
    console.log(response.config.url);
    console.log("response.url", response);
    return response.config.url as string;
  } catch (error) {
    throw new Error(`권한 부여 URL 가져오기 실패: ${error}`);
  }
};
