export interface UserBaseType {
  id: number;
  email: string;
  nickname: string;
  profileImage?: string | undefined | null;
}

export type UserRoleType = "USER" | "ADMIN";

// (아마도) 전체에서만 사용될 유저 타입
export interface UserType extends UserBaseType {
  certificationId: string;
  role: UserRoleType[];
}
// 회원가입에서만 사용되는 타입
export interface RegisterInfoType extends UserBaseType {
  password: string;
  termsAgreements: number[]; // 이메일 회원가입인 경우만 사용
}

// 유저 데이터 가져올 때 쓰일 타입
export type UserProfileType = UserBaseType & {
  certificationId: string;
  roles: string[];
  profileImage: string;
};

export type SolvingQuizStudyGroupUser = UserBaseType & {
	email?:string;
}