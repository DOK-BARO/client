import toast from "react-hot-toast";

// 텍스트 복사하기
export const copyText = (
  text: string,
  toastMessage?: (text: string) => string,
) => {
  navigator.clipboard.writeText(text).then(() => {
    const message = toastMessage ? toastMessage(text) : "복사되었습니다.";
    toast.success(message);
  });
};
