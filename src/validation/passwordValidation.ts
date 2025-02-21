// 비밀번호 검증
export const passwordValidation = [
  {
    rule: (val: string) => /[A-Z]/.test(val) && /[a-z]/.test(val),
    message: "대소문자",
  },
  { rule: (val: string) => /\d/.test(val), message: "숫자" },
  { rule: (val: string) => /[!@#$%^&*]/.test(val), message: "특수문자" },
  {
    rule: (val: string) => val.length >= 8 && val.length <= 20,
    message: "8-20자 이내",
  },
];
