import { ErrorType } from "@/types/ErrorType";
import { useMutation } from "@tanstack/react-query";
import { quizService } from "@/services/server/quizService";
import { QuizCreateType } from "@/types/QuizType";

interface Props {
  onTemporarySuccess?: (
    quizId: number,
    options?: { showToast?: boolean },
  ) => void;
  onPermanentSuccess?: (quizId: number) => void;
}

const useCreateQuiz = ({ onTemporarySuccess, onPermanentSuccess }: Props) => {
  const { mutate: createQuiz } = useMutation<
    { id: number } | null,
    ErrorType,
    {
      quiz: Omit<QuizCreateType, "temporary">;
      isTemporary: boolean;
      showToast?: boolean;
    }
  >({
    mutationFn: ({ quiz, isTemporary }) =>
      quizService.createQuiz({ ...quiz, temporary: isTemporary }),
    onSuccess: (data, variables) => {
      if (!data) {
        return;
      }

      if (variables.isTemporary) {
        onTemporarySuccess?.(data.id, { showToast: variables.showToast });
      } else {
        onPermanentSuccess?.(data.id);
      }
    },
  });

  return { createQuiz };
};

export default useCreateQuiz;
