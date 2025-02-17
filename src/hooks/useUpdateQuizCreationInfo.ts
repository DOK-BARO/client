import { useAtom } from "jotai";
import { quizCreationInfoAtom } from "@/store/quizAtom";
import { QuizFormType } from "@/types/QuizType";

const useUpdateQuizCreationInfo = () => {
  const [quizCreationInfo, setQuizCreationInfo] =
    useAtom<QuizFormType>(quizCreationInfoAtom);

  const updateQuizCreationInfo = <T extends keyof QuizFormType, V>(
    field: T,
    value: V,
  ) => {
    setQuizCreationInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return { quizCreationInfo, updateQuizCreationInfo };
};

export default useUpdateQuizCreationInfo;
