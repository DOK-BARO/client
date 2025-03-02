import Modal from "@/components/atom/Modal/Modal";
import ROUTES from "@/data/routes";
import { preventLeaveModalAtom } from "@/store/quizAtom";
import { currentUserAtom } from "@/store/userAtom";
import { useAtom } from "jotai";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useBlocker, useNavigate } from "react-router-dom";

interface Props {
  isQuizCreationInfoUpdated: boolean;
  hasReachedQuizBasicInfoStep: boolean;
  isComplete: boolean;
  setIsComplete: Dispatch<SetStateAction<boolean>>;
  validateAndRequestQuiz: () => Promise<boolean>;
}
export default function QuizCreationModal({
  isQuizCreationInfoUpdated,
  hasReachedQuizBasicInfoStep,
  isComplete,
  setIsComplete,
  validateAndRequestQuiz,
}: Props) {
  const [currentUser] = useAtom(currentUserAtom);

  const navigate = useNavigate();
  const [preventLeaveModal, setPreventLeaveModal] = useAtom(
    preventLeaveModalAtom,
  );

  const blocker = useBlocker(() => {
    if (isQuizCreationInfoUpdated) {
      return true; // 이동 차단
    }
    return false; // 허용
  });
  useEffect(() => {
    // TODO: 페이지 이탈을 막는 모달을 예외처리하는 로직이 이상함
    if (isComplete) {
      navigate(ROUTES.CREATE_QUIZ_COMPLETE);
      if (blocker.proceed && blocker.state === "blocked") {
        blocker.proceed();
        setIsComplete(false);
        setPreventLeaveModal(true);
      }
    }
  }, [blocker, isComplete]);

  useEffect(() => {
    if (!currentUser) {
      navigate(ROUTES.ROOT);
      if (blocker.proceed) {
        blocker.proceed();
      }
    }
  }, [currentUser]);

  const isQuizCreationModalOpen =
    currentUser &&
    preventLeaveModal &&
    blocker.state === "blocked" &&
    isQuizCreationInfoUpdated;

  return isQuizCreationModalOpen ? (
    <Modal
      contents={[
        {
          title: hasReachedQuizBasicInfoStep
            ? "이 페이지를 벗어나면 변경사항이 저장되지 않을 수 있어요. 임시 저장을 하시겠습니까?"
            : "정말 페이지를 나가시겠어요?",
          content: <></>,
        },
      ]}
      closeModal={() => {
        blocker.reset();
      }}
      showHeaderCloseButton={true}
      bottomButtons={
        hasReachedQuizBasicInfoStep
          ? [
              {
                text: "아니오",
                color: "primary-border",
                onClick: () => {
                  // 임시저장 하지 않고 나가기
                  blocker.proceed();
                },
                width: 76,
              },
              {
                text: "네",
                color: "primary",
                onClick: async () => {
                  // 임시저장 하고 나가기
                  const canProceed = await validateAndRequestQuiz();
                  if (canProceed) {
                    blocker.proceed();
                  }
                },
                width: 76,
              },
            ]
          : [
              {
                text: "네",
                color: "primary",
                onClick: () => {
                  blocker.proceed();
                },
                width: 76,
              },
            ]
      }
    />
  ) : null;
}
