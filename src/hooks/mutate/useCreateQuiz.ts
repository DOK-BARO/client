import { ErrorType } from "@/types/ErrorType";
import { useMutation } from "@tanstack/react-query";
import { quizService } from "@/services/server/quizService";
import { QuizCreateType } from "@/types/QuizType";

interface Props {
  onSuccessCallback: (id: number) => void;
  isTemporary: boolean;
}

const useCreateQuiz = ({
  onSuccessCallback,
  isTemporary, // 임시저장 여부
}: Props) => {
  const { mutate: createQuiz } = useMutation<
    { id: number } | null,
    ErrorType,
    Omit<QuizCreateType, "temporary">
  >({
    mutationFn: (quiz) =>
      quizService.createQuiz({ ...quiz, temporary: isTemporary }),
    onSuccess: (data) => {
      if (!data) {
        return;
      }
      onSuccessCallback(data.id);
    },
  });

  return { createQuiz };
};

export default useCreateQuiz;
