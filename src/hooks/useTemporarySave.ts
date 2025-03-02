import { useEffect, useRef, useState } from "react";
import { QuizFormType } from "@/types/QuizType";

interface Props {
  quizCreationInfo: QuizFormType;
  quizCreationInfoRef: React.MutableRefObject<QuizFormType>;
  prevQuizCreationInfoRef: React.MutableRefObject<QuizFormType | null>;
  isQuizCreationInfoUpdated: boolean;
  validateAndRequestQuiz: ({
    quizCreationInfo,
    isTemporary,
    isAutoSave,
  }: {
    quizCreationInfo: QuizFormType;
    isTemporary: boolean;
    isAutoSave?: boolean;
  }) => Promise<boolean>;
}
// 퀴즈 임시저장
const useTemporarySave = ({
  quizCreationInfo,
  quizCreationInfoRef,
  prevQuizCreationInfoRef,
  isQuizCreationInfoUpdated,
  validateAndRequestQuiz,
}: Props) => {
  const intervalRef = useRef<number | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const [lastTemporarySavedTime, setLastTemporarySavedTime] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (
      !isInitialized &&
      quizCreationInfo.book !== null &&
      quizCreationInfo.book.title !== ""
    ) {
      prevQuizCreationInfoRef.current = JSON.parse(
        JSON.stringify(quizCreationInfoRef.current),
      );

      setIsInitialized(true);
    }
  }, [quizCreationInfo]);

  useEffect(() => {
    let validationCheckInterval: number | null = null;

    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (!isInitialized) {
      return;
    }

    const startAutoSaveTimer = () => {
      intervalRef.current = window.setInterval(async () => {
        if (!isQuizCreationInfoUpdated) {
          return;
        }

        const canProceed = await validateAndRequestQuiz({
          quizCreationInfo: quizCreationInfoRef.current,
          isTemporary: true,
          isAutoSave: true,
        });

        if (!canProceed && intervalRef.current) {
          // 타이머 중지
          clearInterval(intervalRef.current);
          intervalRef.current = null;

          if (!validationCheckInterval) {
            // 이때부터 5초마다 유효성 체크 시작
            validationCheckInterval = window.setInterval(async () => {
              // console.log("5초마다 유효성 체크중");
              const nowValid = await validateAndRequestQuiz({
                quizCreationInfo: quizCreationInfoRef.current,
                isTemporary: true,
                isAutoSave: true,
              });

              // 5초마다 유효성 검사했을 때 통과할 경우
              if (nowValid && validationCheckInterval) {
                // console.log("5초마다 유효성 체크 통과");

                clearInterval(validationCheckInterval); // 5초 유효성 검사 타이머 중지
                validationCheckInterval = null;
                updateLastSavedTime();
                startAutoSaveTimer(); // 30초 타이머 다시 시작
              }
            }, 5000);
          }
        } else {
          updateLastSavedTime();
        }
      }, 30000);
    };

    const updateLastSavedTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const period = hours < 12 ? "오전" : "오후";
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      const formattedTime = `${period} ${formattedHours}시 ${formattedMinutes}분`;

      setLastTemporarySavedTime(formattedTime);
    };

    startAutoSaveTimer();

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
      if (validationCheckInterval !== null) {
        clearInterval(validationCheckInterval);
      }
    };
  }, [isInitialized]);

  return {
    lastTemporarySavedTime,
  };
};

export default useTemporarySave;
