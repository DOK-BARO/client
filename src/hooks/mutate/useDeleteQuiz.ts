import { ErrorType } from "@/types/ErrorType";
import { useMutation } from "@tanstack/react-query";
import { quizService } from "@/services/server/quizService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useDeleteQuiz = () => {
  const navigate = useNavigate();
  const { mutate: deleteQuiz } = useMutation<void, ErrorType, string>({
    mutationFn: (quizId: string) => quizService.deleteQuiz(quizId),
    onSuccess: () => {
      toast.success("퀴즈가 삭제되었습니다.");
      navigate(0);
    }
  });

  return { deleteQuiz };
}

export default useDeleteQuiz;