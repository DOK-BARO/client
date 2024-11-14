import { RegisterInfoType } from "@/types/UserType";
import { atom } from "jotai";

// 사용자 회원가입 로직에서 사용되는 전역변수
export const RegisterInfoAtom = atom<RegisterInfoType>({
  id: 0,
  email: "",
  password: "",
  nickName: "",
  profileImage: null,
  termsAgreements: [],
});
