import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/server/authService";
import { ErrorType } from "@/types/ErrorType";
import toast from "react-hot-toast";
import { UpdateUserParams } from "@/types/ParamsType";
import { useAtom } from "jotai";
import { currentUserAtom } from "@/store/userAtom";

function useUpdateUser() {
	const [, setCurrentUser] = useAtom(currentUserAtom);
	const { mutate: updateUser } = useMutation<
	{ toastMessage: string; needToReload?: boolean },
		ErrorType,
		{ user: UpdateUserParams, toastMessage: string, needToReload?:boolean }
	>({
		mutationFn: async ({ user, toastMessage,needToReload }) => {
			await authService.updateUser(user);
			return {toastMessage,needToReload};
		},
		onSuccess: async ({toastMessage,needToReload}) => {
			const currentUser = await authService.fetchUser();
			setCurrentUser(currentUser);
			toast.success(toastMessage);

			if(needToReload){
				window.location.reload();
			}
		
		}
	});

	return { updateUser };

}

export default useUpdateUser;