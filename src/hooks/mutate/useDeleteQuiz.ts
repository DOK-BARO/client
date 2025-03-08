import { ErrorType } from "@/types/ErrorType";
import { useMutation } from "@tanstack/react-query";
import { quizService } from "@/services/server/quizService";
import toast from "react-hot-toast";
import { queryClient } from "@/services/server/queryClient";
import { quizKeys } from "@/data/queryKeys";

const useDeleteQuiz = () => {
  const { mutate: deleteQuiz } = useMutation<void, ErrorType, number>({
    mutationFn: (quizId: number) => quizService.deleteQuiz(quizId),
    onSuccess: () => {
      toast.success("퀴즈가 삭제되었습니다.");
      queryClient.invalidateQueries({
        queryKey: quizKeys.myQuiz({
          page: "1",
        }),
      });
    },
  });

  return { deleteQuiz };
};

export default useDeleteQuiz;
