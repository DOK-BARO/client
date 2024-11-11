import axios, { AxiosError } from "axios";

export const uploadImg = async (img: FormData) => {
    try {
        const { data } = await axios.post("/images/MEMBER_PROFILE", img);
        console.log("img: %O", data);
        return data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            if (axiosError.response?.status === 404) {
                throw error;
            }
            throw new Error(`이미지 업로드 실패: ${error}`);
        } else {
            throw new Error(`Unexpected error: ${error}`);
        }
    }
};


// 이미지 업로드
export const uploadImage = async ({
    image,
    imageTarget,
}: {
    image: File;
    imageTarget: "MEMBER_PROFILE" | "STUDY_GROUP_PROFILE";
}): Promise<string> => {
    const formData = new FormData();
    formData.append("file", image);

    try {
        const { data } = await axios.post(`/images/${imageTarget}`, formData);
        console.log(data);
        return data.url;
    } catch (error) {
        throw new Error(`파일(이미지) 업로드 실패: ${error}`);
    }
};
