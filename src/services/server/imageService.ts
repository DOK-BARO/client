import axios from "axios";

class ImageService {
  async uploadImage(formData: FormData): Promise<string> {
    // TODO: cors에러
    try {
      const { data } = await axios.post("/images/MEMBER_PROFILE", formData);
      return data;
    }catch(error){
      throw new Error(`이미지 서버에 업로드 실패: ${error}`);
    }
  }
}

export const imageService = new ImageService();