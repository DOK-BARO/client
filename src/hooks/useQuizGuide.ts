import { isFirstVisitAtom, quizGuideStepAtom } from "@/store/quizAtom";
import { useAtom } from "jotai";
import { useEffect } from "react";
import useUpdateQuizCreationInfo from "./useUpdateQuizCreationInfo";

const useQuizGuide = (isEditMode: boolean) => {
  // 퀴즈 작성 가이드를 위한 첫 방문 확인
  const { updateQuizCreationInfo } = useUpdateQuizCreationInfo();
  const [isFirstVisit, setIsFirstVisit] = useAtom(isFirstVisitAtom);

  useEffect(() => {
    const firstVisit = localStorage.getItem("firstVisit");
    if (firstVisit === undefined) {
      setIsFirstVisit(true);
    } else if (firstVisit && firstVisit === "false") {
      setIsFirstVisit(false);
      updateQuizCreationInfo("questions", null);
    }
  }, [isFirstVisit, isEditMode]);

  // 퀴즈 문제 작성 가이드 스텝 초기화
  const [, setQuizGuideStepAtom] = useAtom(quizGuideStepAtom);
  useEffect(() => {
    if (isFirstVisit) {
      setQuizGuideStepAtom(1);
    }
  }, [isFirstVisit]);
};
export default useQuizGuide;
