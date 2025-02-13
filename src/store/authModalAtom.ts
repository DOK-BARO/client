import { atom } from "jotai";

export const isEmailLoginPageAtom = atom<boolean>(false);
export const isLoginModalOpenAtom = atom<boolean>(false);

// navigate로 동작 (상대경로) // readwrite
export const loginRedirectUrlAtom = atom<string>("/");

// window.location.href 로 동작 (절대경로) // readonly (loginRedirectUrlAtom과 자동 동기화)
export const socialLoginRedirectUrlAtom = atom((get) => {
  const loginRedirectUrl = get(loginRedirectUrlAtom);
  const baseUrl = import.meta.env.VITE_DEFAULT_URL;

  return `${baseUrl}${loginRedirectUrl}`;
});

export const closeLoginModalAndNavigateToRootAtom = atom<boolean>(false);
