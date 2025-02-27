// import localApi from "../local/LocalApi.ts";
import { TermsOfServiceType as TermsOfServiceFetchType } from "@/types/TermsOfServiceType.ts";
import { UserType } from "@/types/UserType.ts";
import { axiosInstance } from "@/config/axiosConfig.ts";
import { handleAxiosError } from "@/utils/errorHandler.ts";
import { SocialLoginType } from "@/types/SocialLoginType.ts";
import { UserUpdateType } from "@/types/ParamsType";

class AuthService {
  // 소셜 회원가입
  socialSignupOrLogin = ({
    socialType,
    redirectUrl,
  }: {
    socialType: SocialLoginType;
    redirectUrl: string;
  }): void => {
    window.location.href = `${
      import.meta.env.VITE_API_URL
    }/auth/login/oauth2/${socialType.toLocaleLowerCase()}?redirect-url=${redirectUrl}
    `;
  };

  // 필수 동의 여부 전체 동의 여부 조회
  fetchIsTermsAgreed = async (): Promise<{ agreeAll: boolean } | null> => {
    try {
      const {
        data: { agreeAll },
      } = await axiosInstance.get("/terms-of-services/member-agree/required");
      return agreeAll;
    } catch (error) {
      return null;
    }
  };

  // 이메일 회원가입
  emailSignup = async (userInfo: {
    email: string;
    nickname: string;
    password: string;
    profileImage?: string | null;
  }): Promise<void> => {
    try {
      await axiosInstance.post("/accounts/email", userInfo);
    } catch (error) {
      handleAxiosError(error);
    }
  };

  // 이메일 로그인
  emailLogin = async (loginInfo: {
    email: string;
    password: string;
  }): Promise<void> => {
    const formData = new URLSearchParams();

    Object.entries(loginInfo).forEach(([key, value]) => {
      formData.append(key, value);
    });
    try {
      await axiosInstance.post("/auth/login/email", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
    } catch (error) {
      handleAxiosError(error);
    }
  };

  // 문서 상에는 'modify login member' 로 명시되어 있음.
  updateUser = async (userInfo: UserUpdateType): Promise<void> => {
    try {
      await axiosInstance.put("/members/login-user", userInfo);
    } catch (error) {
      handleAxiosError(error);
    }
  };

  // 유저 정보 가져오기
  fetchUser = async (isMainPage: boolean = false): Promise<UserType | null> => {
    try {
      const { data } = await axiosInstance.get("/members/login-user");
      return data;
    } catch (error) {
      if (isMainPage) {
        return null;
      } else {
        handleAxiosError(error);
      }
    }
    return null;
  };

  logout = async (): Promise<void> => {
    try {
      await axiosInstance.post("/auth/logout");
    } catch (error) {
      handleAxiosError(error);
    }
  };

  // 이용약관 조회
  fetchTerms = async (): Promise<TermsOfServiceFetchType[] | null> => {
    try {
      const { data } = await axiosInstance.get("/terms-of-services");
      return data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  };

  // 이용약관 상세 내용 조회
  fetchTermDetail = async (id: number): Promise<string | null> => {
    try {
      const { data } = await axiosInstance.get(
        `/terms-of-services/${id}/detail`,
      );
      return data.value;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  };

  // 이용약관 동의 요청
  sendTermsAgreement = async (items: number[]): Promise<void> => {
    try {
      await axiosInstance.post("/terms-of-services/agree", {
        items,
      });
    } catch (error) {
      handleAxiosError(error);
    }
  };

  // 이메일로 인증코드 보내기
  sendEmailCode = async (email: string): Promise<void> => {
    try {
      await axiosInstance.post("/email-authentications", {
        email: email,
      });
    } catch (error) {
      handleAxiosError(error);
    }
  };

  resendEmailCode = async (email: string): Promise<void> => {
    try {
      await axiosInstance.post("/email-authentications/recreate", {
        email: email,
      });
    } catch (error) {
      handleAxiosError(error);
    }
  };

  matchEmailCode = async ({
    email,
    code,
  }: {
    email: string;
    code: string;
  }): Promise<{ result: boolean } | null> => {
    try {
      const { data } = await axiosInstance.post(
        "/email-authentications/match-code",
        {
          email: email,
          code: code,
        },
      );
      return data;
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  };

  // 임시 비밀번호 발급
  issueTempPassword = async (email: string): Promise<void> => {
    try {
      await axiosInstance.post("/accounts/email/issue-temporary-password", {
        email: email,
      });
    } catch (error) {
      handleAxiosError(error);
    }
  };

  changePassword = async ({
    oldPassword,
    newPassword,
  }: {
    oldPassword: string;
    newPassword: string;
  }) => {
    try {
      await axiosInstance.put("/accounts/email/password", {
        oldPassword: oldPassword,
        newPassword: newPassword,
      });
    } catch (error) {
      handleAxiosError(error);
    }
  };

  withdrawMember = async () => {
    try {
      await axiosInstance.post("/members/withdraw");
    } catch (error) {
      handleAxiosError(error);
    }
  };
}

export const authService = new AuthService();
