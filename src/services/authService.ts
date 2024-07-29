import axios from "axios";

export const getKakaoAuthUrl = async (): Promise<string> => {
  console.log("get kakao auth url");
  try {
    const { data } = await axios.get("/auth/oauth2/authorize/KAKAO");
    console.log(data); // 응답 객체 출력
    return data.url; // 임시 임의 리턴값
  } catch (error) {
    throw new Error(`권한 부여 URL 가져오기 실패: ${error}`);
  }
};

export const getGoogleAuthUrl = async (): Promise<string> => {
  console.log("get kakao auth url");
  try {
    const { data } = await axios.get("/auth/oauth2/authorize/Google");
    console.log(data); // 응답 객체 출력
    return data.url; // 임시 임의 리턴값
  } catch (error) {
    throw new Error(`권한 부여 URL 가져오기 실패: ${error}`);
  }
};

interface signUpResponse{
  accessToken: string,
    refreshToken : string,
}
export const signupByKakao = async (token:string): Promise<signUpResponse> => {
  console.log("signup kakao");
  try {
    const postData = {
      "token" : token,
      "redirectUrl" : "http://localhost:5173/oauth2/redirected/kakao",
    };

    const { data } = await axios.post("/auth/oauth2/signup/KAKAO", postData);
    console.log(JSON.stringify(data)); // 응답 객체 출력
    return data; // 임시 임의 리턴값
  } catch (error) {
    throw new Error(`회원가입 실패: ${error}`);
  }
};

export const loginByKakao = async (token:string): Promise<string> => {
  console.log("login kakao");
  try {
    const postData = {
      "token" : token,
      "redirectUrl" : "http://localhost:5173/oauth2/redirected/kakao",
    };

    const { data } = await axios.post("/auth/oauth2/login/KAKAO", postData);
    console.log(data); // 응답 객체 출력
    return data.url; // 임시 임의 리턴값
  } catch (error) {
    throw new Error(`권한 부여 URL 가져오기 실패: ${error}`);
  }
};