interface UserBaseType {
  id: number;
  email: string;
  nickname: string;
  profileImage: string;
}

// (아마도) 전체에서만 사용될 유저 타입
export interface UserType extends UserBaseType {
  certificationId: string;
  roles: string[];
}

// 회원가입에서만 사용되는 타입
export interface RegisterInfoType extends UserBaseType {
  id: number;
  password: string;
}
