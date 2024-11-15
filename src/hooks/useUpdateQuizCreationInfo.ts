import { useAtom } from 'jotai';
import { QuizCreationInfoAtom } from '@/store/quizAtom';
import { BookQuizType } from '@/types/BookQuizType';

const useUpdateQuizCreationInfo = () => {
    const [quizCreationInfo, setQuizCreationInfo] = useAtom<BookQuizType>(QuizCreationInfoAtom);

    const updateQuizCreationInfo = <T extends keyof BookQuizType, V>(field: T, value: V) => {
        setQuizCreationInfo((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return { quizCreationInfo, updateQuizCreationInfo };
};

export default useUpdateQuizCreationInfo;
