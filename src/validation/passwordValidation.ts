// 비밀번호 검증
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;

export const isValidPassword = (password: string): boolean => {
  return passwordRegex.test(password);
};
