import { atom } from "jotai";

export const isEmailLoginPageAtom = atom<boolean>(false);
export const isLoginModalOpenAtom = atom<boolean>(false);

export const socialLoginRedirectUrlAtom = atom<string>(
  import.meta.env.VITE_DEFAULT_URL as string,
);
