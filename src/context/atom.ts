import { atom } from "jotai";

export const isLoggedInState = atom<boolean>(
  localStorage.getItem("certificationId") ? true : false,
);
