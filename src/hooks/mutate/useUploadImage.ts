import { useMutation } from "@tanstack/react-query";
import { ErrorType } from "@/types/ErrorType";
import { UploadImageArgType } from "@/types/UploadImageType";
import { imageService } from "@/services/server/imageService";
import toast from "react-hot-toast";

// TODO: props 객체로 받는걸로 바꾸기
const useUploadImageToStorage = (
  onSuccessCallback: (imageUrl: string) => void,
  onErrorCallback?: () => void,
) => {
  const { mutate: uploadImage, isPending } = useMutation<
    string,
    ErrorType,
    UploadImageArgType
  >({
    mutationFn: (uploadImageArg) => imageService.uploadImage(uploadImageArg),
    onSuccess: (imageUrl) => {
      onSuccessCallback(imageUrl);
    },
    onError: () => {
      toast.error("사진을 업로드할 수 없습니다. 다른 사진를 선택해 주세요.");
      onErrorCallback?.(); // 실패 시 콜백 (기존 사진로 복구)
    },
  });
  return { uploadImage, isPending };
};
export default useUploadImageToStorage;
