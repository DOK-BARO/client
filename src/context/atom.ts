import { atom } from "recoil";
import { getCookie } from "../utils/cookieUtils.ts";

export const isLoggedInState = atom<boolean>({
  key: "isLoggedIn",
  default: getCookie("Authorization") ? true : false,
});