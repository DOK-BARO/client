import { useMutation } from "@tanstack/react-query";
import { ErrorType } from "@/types/ErrorType";
import { UploadImageArgType } from "@/types/UploadImageType";
import { imageService } from "@/services/server/imageService";

function useUploadImageToStorage(callback: (imageUrl: string) => void) {
	const { mutate: uploadImage } = useMutation<
		string,
		ErrorType,
		UploadImageArgType
	>({
		mutationFn: (uploadImageArg) => imageService.uploadImage(uploadImageArg),
		onSuccess: (imageUrl) => {
			callback(imageUrl);
		},
	});
	return { uploadImage };

}
export default useUploadImageToStorage;