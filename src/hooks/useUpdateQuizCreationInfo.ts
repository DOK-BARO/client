import { useAtom } from 'jotai';
import { QuizCreationInfoAtom } from '@/store/quizAtom';
import { QuizCreationType } from '@/types/QuizType';

const useUpdateQuizCreationInfo = () => {
    const [quizCreationInfo, setQuizCreationInfo] = useAtom<QuizCreationType>(QuizCreationInfoAtom);

    const updateQuizCreationInfo = <T extends keyof QuizCreationType, V>(field: T, value: V) => {
        setQuizCreationInfo((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return { quizCreationInfo, updateQuizCreationInfo };
};

export default useUpdateQuizCreationInfo;
