import axios, { AxiosError } from "axios";
import { AuthResponse } from "../../types/AuthResponse.ts";
import { SocialLoginType } from "../../types/SocialLoginType.ts";
import localApi from "../local/LocalApi.ts";
import { TermsOfServiceType } from "@/types/TermsOfServiceType.ts";
import { UserProfileType } from "@/types/UserType.ts";
import { axiosInstance } from "@/config/axiosConfig.ts";

class AuthService {
	constructor(
		private readonly redirectedUrl = import.meta.env.VITE_AUTH_REDIRECTED_URL
	) {
		this.redirectedUrl = redirectedUrl;
	}

	fetchAuthUrl = async (socialLoginType: SocialLoginType): Promise<string> => {
		try {
			const { data } = await axiosInstance.get(
				`/auth/oauth2/authorize/${socialLoginType}?redirectUrl=${this.redirectedUrl
				}/${socialLoginType.toLowerCase()}`
			);
			return data.url; // 임시 임의 리턴값
		} catch (error) {
			throw new Error(`권한 부여 URL 가져오기 실패: ${error}`);
		}
	};

	socialLogin = async (
		socialType: SocialLoginType,
		token: string
	): Promise<AuthResponse> => {
		const postData = {
			token,
			redirectUrl: `${this.redirectedUrl}/${socialType.toLocaleLowerCase()}`,
		};
		console.log(postData.redirectUrl);
		try {
			const { data } = await axiosInstance.post(
				`/auth/oauth2/login/${socialType}`,
				postData
			);
			return data;
		} catch (error) {
			throw new Error(`Unexpected error: ${error}`);
		}
	};

	// 소셜 회원가입
	socialSignup = async (
		socialType: SocialLoginType,
		token: string
	): Promise<AuthResponse> => {
		try {
			const postData = {
				token,
				redirectUrl: `${this.redirectedUrl}/${socialType.toLocaleLowerCase()}`,
			};
			const { data } = await axiosInstance.post(
				`/auth/oauth2/signup/${socialType}`,
				postData
			);
			return data; // 임시 임의 리턴값
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const axiosError = error as AxiosError;
				if (axiosError.response?.status === 400) {
					throw error;
				}
			}
			throw new Error(`Unexpected error: ${error}`);
		}
	};

	// 이메일 회원가입
	emailSignup = async (userInfo: {
		email: string;
		password: string;
		nickname: string;
		profileImage?: string | null;
	}) => {
		try {
			console.log(userInfo);
			const response = await axiosInstance.post("/auth/email/signup", userInfo);
			console.log("이메일 회원가입 post 응답", response);
			return response;
		} catch (error) {
			throw new Error(`이메일 회원가입 실패: ${error}`);
		}
	};

	// 문서 상에는 'modify login member' 로 명시되어 있음.
	updateUser = async (userInfo: {
		nickname: string;
		email: string;
		profileImage?: string | null; // TODO: 필수인가?
	}) => {
		try {
			const response = await axiosInstance.put("/members/login-user", userInfo);
			console.log(response);
		} catch (error) {
			throw new Error(`로그인 유저 실패: ${error}`);
		}
	};

	fetchUser = async (): Promise<UserProfileType> => {
		try {
			const { data } = await axiosInstance.get("/members/login-user");
			return data;
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				throw new Error(`로그인 요청: ${error}`);
			} else {
				throw new Error(`Unexpected error: ${error}`);
			}
		}
	};

	getUserIfAuthenticated = async (): Promise<UserProfileType | null> => {
		const certificationId = !!localApi.getUserCertificationId();

		if (!certificationId) {
			return null;
		}

		return await this.fetchUser();
	};

	logout = () => {
		localApi.removeCertification();
	}

	// 이용약관 조회
	fetchTerms = async (): Promise<TermsOfServiceType[] | null> => {
		try {
			const { data } = await axiosInstance.get("/terms-of-services");
			return data;
		} catch (error) {
			throw new Error(`이용약관 가져오기 실패: ${error}`);
		}
	};

	// 이용약관 상세 내용 조회
	fetchTermDetail = async (id: number): Promise<string | undefined> => {
		try {
			const { data } = await axiosInstance.get(
				`/terms-of-services/${id}/detail`
			);
			return data.value;
		} catch (error) {
			console.error(error);
			throw new Error(`이용약관 상세 내용 가져오기 실패: ${error}`);
		}
	};

	// 이용약관 동의 요청
	sendTermsAgreement = async (items: number[]) => {
		console.log(items);
		try {
			const response = await axiosInstance.post("/terms-of-services/agree", {
				items,
			});
			console.log(response);
		} catch (error) {
			throw new Error(`이용약관 동의 실패: ${error}}`);
		}
	};

	// 이메일로 인증코드 보내기
	sendEmailCode = async (email: string) => {
		try {
			const response = await axiosInstance.post("/email-authentications", {
				email: email,
			});
			if (response.status === 201) {
				console.log(response);
			}
		} catch (error) {
			throw new Error(`이메일로 인증코드 보내기 실패: ${error}`);
		}
	};

	matchEmailCode = async ({ email, code }: { email: string; code: string }) => {
		try {
			const { data } = await axiosInstance.post(
				"/email-authentications/match-code",
				{
					email: email,
					code: code,
				}
			);
			// axios 타입으로 바꾸기
			return data;
		} catch (error) {
			// 인증코드가 일치하지 않을 경우
			// TODO: 상세한 에러 처리 필요
			throw new Error(`인증코드 일치 실패: ${error}`);
		}
	};
}

export const authService = new AuthService();
