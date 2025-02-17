import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/server/authService";
import { ErrorType } from "@/types/ErrorType";
import toast from "react-hot-toast";
import { UserUpdateType } from "@/types/ParamsType";
import { useAtom } from "jotai";
import { currentUserAtom } from "@/store/userAtom";
import { queryClient } from "@/services/server/queryClient";
import { userKeys } from "@/data/queryKeys";

const useUpdateUser = () => {
  const [, setCurrentUser] = useAtom(currentUserAtom);
  const { mutate: updateUser } = useMutation<
    { toastMessage: string; needToInvalidateQuery?: boolean },
    ErrorType,
    { user: UserUpdateType; toastMessage: string; needToReload?: boolean }
  >({
    mutationFn: async ({ user, toastMessage, needToReload }) => {
      await authService.updateUser(user);
      return { toastMessage, needToInvalidateQuery: needToReload };
    },
    onSuccess: async ({ toastMessage, needToInvalidateQuery }) => {
      const currentUser = await authService.fetchUser();
      setCurrentUser(currentUser);
      toast.success(toastMessage);

      if (needToInvalidateQuery) {
        queryClient.invalidateQueries({
          queryKey: userKeys.user(),
        });
        window.location.reload();
      }
    },
  });

  return { updateUser };
};

export default useUpdateUser;
