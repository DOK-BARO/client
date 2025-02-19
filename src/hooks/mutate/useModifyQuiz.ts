import { ErrorType } from "@/types/ErrorType";
import { useMutation } from "@tanstack/react-query";
import { quizService } from "@/services/server/quizService";
import { QuizCreateType } from "@/types/QuizType";

interface Props {
  // TODO: editQuizId -> number
  onTemporarySuccess?: (
    editQuizId: string,
    options?: { showToast?: boolean },
  ) => void;
  onPermanentSuccess?: (editQuizId: string) => void;
}

const useModifyQuiz = ({ onTemporarySuccess, onPermanentSuccess }: Props) => {
  const { mutate: modifyQuiz } = useMutation<
    void,
    ErrorType,
    {
      editQuizId: string;
      quiz: Omit<QuizCreateType, "temporary">;
      isTemporary: boolean;
      showToast?: boolean;
    }
  >({
    mutationFn: ({ editQuizId, quiz, isTemporary }) =>
      quizService.modifyQuiz({
        editQuizId,
        quiz: { ...quiz, temporary: isTemporary },
      }),
    onSuccess: (_, variables) => {
      if (variables.isTemporary) {
        onTemporarySuccess?.(variables.editQuizId, {
          showToast: variables.showToast,
        });
      } else {
        onPermanentSuccess?.(variables.editQuizId);
      }
    },
  });

  return { modifyQuiz };
};

export default useModifyQuiz;
