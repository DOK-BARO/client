// 비밀번호 검증
//대소문자, 숫자, 특수문자, 8-20자 이내

// interface PasswordValidationResult {
//   hasUpperCase: boolean;
//   hasLowerCase: boolean;
//   hasNumber: boolean;
//   hasSpecialChar: boolean;
//   isValidLength: boolean;
// }

// const passwordRegex =
//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;

// export const isValidPassword = (password: string): PasswordValidationResult => {

// };
export const passwordValidation = [
  { rule: (val: string) => /[A-Za-z]/.test(val), message: "대소문자" },
  { rule: (val: string) => /\d/.test(val), message: "숫자" },
  { rule: (val: string) => /[!@#$%^&*]/.test(val), message: "특수문자" },
  {
    rule: (val: string) => val.length >= 8 && val.length <= 20,
    message: "8-20자 이내",
  },
];
