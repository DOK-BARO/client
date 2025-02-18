import { ErrorType } from "@/types/ErrorType";
import { useMutation } from "@tanstack/react-query";
import { quizService } from "@/services/server/quizService";
import { QuizCreateType } from "@/types/QuizType";

interface Props {
  // TODO: editQuizId -> number
  onSuccessCallback: (editQuizId: string) => void;
  isTemporary: boolean;
}

const useModifyQuiz = ({
  onSuccessCallback,
  isTemporary, // 임시저장 여부
}: Props) => {
  const { mutate: modifyQuiz } = useMutation<
    void,
    ErrorType,
    { editQuizId: string; quiz: Omit<QuizCreateType, "temporary"> }
  >({
    mutationFn: ({ editQuizId, quiz }) =>
      quizService.modifyQuiz({
        editQuizId,
        quiz: { ...quiz, temporary: isTemporary },
      }),
    onSuccess: (_, variables) => {
      onSuccessCallback(variables.editQuizId);
    },
  });

  return { modifyQuiz };
};

export default useModifyQuiz;
