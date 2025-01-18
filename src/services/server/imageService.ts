import { axiosInstance } from "@/config/axiosConfig";
import { ImageTargetType } from "@/types/UploadImageType";

// 이미지 업로드
class ImageService {
  uploadImage = async ({
    image,
    imageTarget,
  }: {
    image: File;
    imageTarget: ImageTargetType; //TODO: 이미지 타겟 생성
  }): Promise<string> => {
    const formData = new FormData();
    formData.append("file", image);

    try {
      const { data } = await axiosInstance.post(
        `/images/${imageTarget}`,
        formData,
      );
      console.log("data: %o", data);
      return data.url;
    } catch (error: unknown) {
      throw new Error(`파일(이미지) 업로드 실패: ${error}`);
    }
  };
}
export const imageService = new ImageService();
