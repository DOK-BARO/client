import { atom } from "jotai";

export const isEmailLoginPageAtom = atom<boolean>(false);
export const isLoginModalOpenAtom = atom<boolean>(false);

// navigate로 동작 (상대경로)
export const loginRedirectUrlAtom = atom<string>("/");

// readonly
// window.location.href 로 동작 (절대경로)
export const socialLoginRedirectUrlAtom = atom((get) => {
  const loginRedirectUrl = get(loginRedirectUrlAtom);
  const baseUrl = import.meta.env.VITE_DEFAULT_URL;

  return `${baseUrl}${loginRedirectUrl}`;
});
