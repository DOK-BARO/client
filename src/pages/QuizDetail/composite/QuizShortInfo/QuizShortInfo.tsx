import { QuizExplanationType } from "@/types/QuizType";
import styles from "./_quiz_short_info.module.scss";
import IconTextLabel from "../../../../components/composite/IconTextLabel/IconTextLabel";
import { systemWarning } from "@/styles/abstracts/colors";
import { BarChart } from "@/svg/BarChart";
import { StarFilled } from "@/svg/StarFilled";
import {
  levelMapping,
  LevelType,
} from "../../components/DifficultyLevelItem/DifficultyLevelItem";
import threeDots from "/public/assets/svg/myPage/three-dot.svg";
import Button from "@/components/atom/Button/Button";
import useModal from "@/hooks/useModal";
import SmallModal from "@/components/atom/SmallModal/SmallModal";
import noticeCircle from "/public/assets/svg/myPage/notice-circle.svg";
import { useRef } from "react";
import Modal from "@/components/atom/Modal/Modal";
import Textarea from "@/components/atom/Textarea/Textarea";
import { useMutation } from "@tanstack/react-query";
import useTextarea from "@/hooks/useTextarea";
import { ErrorType } from "@/types/ErrorType";
import toast from "react-hot-toast";
import { quizService } from "@/services/server/quizService";
import useOutsideClick from "@/hooks/useOutsideClick";
interface Props {
  quizExplanation: QuizExplanationType;
  reviewCount: number;
  roundedAverageRating: number;
  averageDifficulty: number;
}

export default function QuizShortInfo({
  quizExplanation,
  reviewCount,
  roundedAverageRating,
  averageDifficulty,
}: Props) {
  const averageDifficultyLabel =
    levelMapping[averageDifficulty.toString() as LevelType];

  const {
    isModalOpen: isSmallModalOpen,
    openModal: openSmallModal,
    closeModal: closeSmallModal,
  } = useModal();

  const {
    isModalOpen: isReportModalOpen,
    openModal: openReportModal,
    closeModal: closeReportModal,
  } = useModal();

  // 작은 모달 토글
  const handleToggle = () => {
    if (isSmallModalOpen) {
      closeSmallModal();
    } else {
      openSmallModal();
    }
  };
  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  useOutsideClick([modalRef, buttonRef], closeSmallModal);

  const { value: reportContent, onChange: onReportContentChange } =
    useTextarea("");
  const { mutate: reportReview } = useMutation<
    { id: number } | null,
    ErrorType,
    { questionId: number; content: string }
  >({
    mutationFn: ({ questionId, content }) =>
      quizService.reportQuiz({ questionId, content }),
    onSuccess: (data) => {
      if (!data) {
        toast.error("퀴즈 신고에 실패했습니다.");
        return;
      }

      toast.success("퀴즈가 신고되었습니다.");
      closeReportModal();
    },
  });

  const handleReportReview = () => {
    reportReview({ questionId: quizExplanation.id, content: reportContent });
  };

  return (
    <section className={styles.container}>
      {isReportModalOpen ? (
        <Modal
          closeModal={closeReportModal}
          contents={[
            {
              title: `${quizExplanation.title}를 신고하시겠어요?`,
              content: (
                <div>
                  <p className={styles["report-text"]}>
                    신고된 퀴즈는 검토 후 삭제됩니다.
                  </p>
                  <Textarea
                    maxLengthShow
                    maxLength={200}
                    onChange={onReportContentChange}
                    value={reportContent}
                    id="report-content"
                    rows={5}
                    size="small"
                  />
                </div>
              ),
            },
          ]}
          bottomButtons={[
            { text: "신고하기", color: "primary", onClick: handleReportReview },
          ]}
        />
      ) : null}
      {isSmallModalOpen ? (
        <div className={styles["small-modal-container"]} ref={modalRef}>
          <SmallModal
            label="퀴즈 신고하기"
            onLabelClick={openReportModal}
            icon={<img src={noticeCircle} width={20} height={20} />}
          />
        </div>
      ) : null}
      <span className={styles["title-container"]}>
        <h2 className={styles.title}>{quizExplanation.title}</h2>
        <Button
          iconOnly
          icon={
            <img src={threeDots} width={16} height={16} alt="퀴즈 신고하기" />
          }
          onClick={handleToggle}
          ref={buttonRef}
        />
      </span>
      <span className={styles["iconTextLabel-container"]}>
        <IconTextLabel
          icon={<StarFilled width={20} height={20} fill={systemWarning} />}
          labelText={
            <p className={styles["rating-text"]}>
              {roundedAverageRating}
              <b>/5 ({reviewCount}개의 후기)</b>
            </p>
          }
        />
        <span className={styles.divider} />
        <IconTextLabel
          icon={<BarChart alt="어려움 레벨" level={averageDifficulty} />}
          labelText={averageDifficultyLabel}
        />
        <span className={styles.divider} />
        <IconTextLabel
          icon={
            <div className={styles["creator-profile-image"]}>
              <img
                src={quizExplanation.creator.profileImageUrl}
                width={26}
                height={26}
              />
            </div>
          }
          labelText={quizExplanation.creator.nickname}
        />
      </span>
      <p className={styles.description}>{quizExplanation.description}</p>
    </section>
  );
}
