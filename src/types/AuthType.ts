export const AuthType = {
  SIGNUP: "SIGNUP",
  LOGIN: "LOGIN",
} as const;

export type AuthType = (typeof AuthType)[keyof typeof AuthType];
