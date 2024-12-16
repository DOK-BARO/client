import { RegisterInfoType, UserType } from "@/types/UserType";
import { atom } from "jotai";

// 사용자 회원가입 로직에서 사용되는 전역변수
export const registerInfoAtom = atom<RegisterInfoType>({
  id: 0,
  email: "",
  password: "",
  nickname: "",
  profileImage: null,
  termsAgreements: [],
});

// 현재 로그인한 사용자
export const currentUserAtom = atom<UserType | null>(null);

// 로그인 여부
export const isLoggedInAtom = atom((get) => {
  const currentUser = get(currentUserAtom);
  return currentUser !== null;
});
