import {loginByKakao} from "../services/authService.ts";

export const useKakaoLogin = async () => {
  const authToken:string = localStorage.getItem("authCode") ?? "error";
  const  token = await loginByKakao(authToken);
  localStorage.setItem("token", token);
  // useEffect(() => {

  // }, [token]);
};