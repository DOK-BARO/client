// 이메일 검증
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const emailValidation = [
  { rule: (val: string) => emailRegex.test(val), message: "이메일 형식" },
];
