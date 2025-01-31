import toast from "react-hot-toast";

// 텍스트 복사하기
export const copyText = (text: string) => {
  navigator.clipboard.writeText(text).then(() => {
    toast.success("복사되었습니다.");
  });
};
