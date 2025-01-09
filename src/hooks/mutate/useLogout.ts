import { useMutation } from "@tanstack/react-query";
import { ErrorType } from "@/types/ErrorType";
import { authService } from "@/services/server/authService";
import { userKeys } from "@/data/queryKeys";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ROUTES from "@/data/routes";
import { useAtom } from "jotai";
import { currentUserAtom } from "@/store/userAtom";
import { useQueryClient } from "@tanstack/react-query";

function useLogout() {
	const [, setCurrentUser] = useAtom(currentUserAtom);
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { mutate: logout } = useMutation<void, ErrorType>({
		mutationFn: () => authService.logout(),
		onSuccess: () => {
			queryClient.setQueryData(userKeys.user(), null);
			toast.success("로그아웃 되었습니다.");
			navigate(ROUTES.ROOT);
			setCurrentUser(null);
		},
	});

	return { logout };
}

export default useLogout;