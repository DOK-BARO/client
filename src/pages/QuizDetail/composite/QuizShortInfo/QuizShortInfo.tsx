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
import { useEffect, useRef, useState } from "react";
import Modal from "@/components/atom/Modal/Modal";
import Textarea from "@/components/atom/Textarea/Textarea";
import { useMutation } from "@tanstack/react-query";
import { ErrorType } from "@/types/ErrorType";
import toast from "react-hot-toast";
import { quizService } from "@/services/server/quizService";
import useOutsideClick from "@/hooks/useOutsideClick";
import useAutoResizeTextarea from "@/hooks/useAutoResizeTextArea";
import CheckBox from "@/components/atom/Checkbox/Checkbox";
import { useNavigate } from "react-router-dom";
import ROUTES from "@/data/routes";
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
  const navigate = useNavigate();
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

  const {
    isModalOpen: isReportConfirmModalOpen,
    openModal: openReportConfirmModal,
    closeModal: closeReportConfirmModal,
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

  // 기타 사유
  const {
    value: OtherGrounds,
    onChange: onOtherGroundsChange,
    textareaRef: OtherGroundsRef,
    resetTextarea: resetOtherGrounds,
  } = useAutoResizeTextarea("", 40, 3); // TODO: Textarea 미세한 높이 차이 22.5 -> 23
  const [selectedReportReason, setSelectedReportReason] = useState<string[]>(
    [],
  );

  const { mutate: reportReview } = useMutation<
    { id: number } | null,
    ErrorType,
    { questionId: number; contents: string[] }
  >({
    mutationFn: ({ questionId, contents }) =>
      quizService.reportQuiz({ questionId, contents }),
    onSuccess: (data) => {
      if (!data) {
        toast.error("퀴즈 신고에 실패했습니다.");
        return;
      }

      toast.success("퀴즈가 신고되었습니다.");
      closeReportModal();
      openReportConfirmModal();
    },
  });

  const handleReportReview = () => {
    const selectedReportReasonFiltered = selectedReportReason.map((reason) =>
      reason === "기타" ? OtherGrounds : reason,
    );
    reportReview({
      questionId: quizExplanation.id,
      contents: selectedReportReasonFiltered,
    });
  };

  const reportReasonList = [
    { id: 1, text: "비속어 또는 비방 내용이 포함되어 있어요.", checked: false },
    { id: 2, text: "도서와 무관한 퀴즈예요.", checked: false },
    { id: 3, text: "스팸/광고 내용이 포함되어 있어요.", checked: false },
    { id: 4, text: "기타", checked: false },
  ];

  const [reportReasons, setReportReasons] = useState<
    {
      id: number;
      text: string;
      checked: boolean;
    }[]
  >(reportReasonList);

  const handleSmallModalClick = () => {
    closeSmallModal();
    openReportModal();
    resetOtherGrounds();
  };

  useEffect(() => {
    resetOtherGrounds();
    setSelectedReportReason([]);
    setReportReasons(reportReasonList);
  }, [isReportModalOpen]);

  const handleGoBackToHome = () => {
    navigate(ROUTES.ROOT);
  };
  const handleGoBackToQuiz = () => {
    navigate(-1);
  };

  const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = e.target;

    setReportReasons(
      reportReasons.map((reason) =>
        reason.id === Number(id)
          ? { ...reason, checked: !reason.checked }
          : reason,
      ),
    );
  };

  useEffect(() => {
    const reportReasonTextList = reportReasons.filter(
      (reason) => reason.checked,
    );
    setSelectedReportReason(reportReasonTextList.map((item) => item.text));
  }, [reportReasons]);

  return (
    <section className={styles.container}>
      {isReportConfirmModalOpen ? (
        <Modal
          title="신고하기"
          closeModal={closeReportConfirmModal}
          contents={[{ title: "신고가 완료되었습니다.", content: <></> }]}
          bottomButtons={[
            {
              text: "홈으로 가기",
              color: "primary-border",
              onClick: handleGoBackToHome,
            },
            {
              text: "퀴즈로 돌아가기",
              color: "primary",
              onClick: handleGoBackToQuiz,
            },
          ]}
        />
      ) : null}
      {isReportModalOpen ? (
        <Modal
          title="신고하기"
          closeModal={closeReportModal}
          contents={[
            {
              title: `${quizExplanation.title} 신고 시, 검토 후 적절한 조치가 이루어질 예정입니다.`,
              content: (
                <div>
                  {reportReasons.map((reason) => (
                    <CheckBox
                      key={reason.id}
                      id={reason.id.toString()}
                      type="checkbox-black"
                      value={reason.text}
                      onChange={handleCheckBoxChange}
                      checked={reason.checked}
                    />
                  ))}
                  {/* TODO: 입력 전/후 높이 차이 */}
                  {/* 기타 선택했을 때만 보이게 */}
                  {selectedReportReason.some((reason) => reason === "기타") ? (
                    <div className={styles["textarea-container"]}>
                      <Textarea
                        placeholder="기타 사유를 작성해 주세요."
                        maxLengthShow
                        maxLength={500}
                        onChange={onOtherGroundsChange}
                        value={OtherGrounds}
                        id="report-content"
                        textAreaRef={OtherGroundsRef}
                        size="small"
                        rows={1}
                      />
                    </div>
                  ) : null}
                </div>
              ),
            },
          ]}
          // disabled: 하나 이상 선택했을 떄만 활성화되도록
          bottomButtons={[
            {
              text: "신고하기",
              color: "primary",
              onClick: handleReportReview,
              disabled:
                selectedReportReason.length < 1 ||
                selectedReportReason.some(
                  (reason) => reason === "기타" && OtherGrounds === "",
                ),
            },
          ]}
        />
      ) : null}
      {isSmallModalOpen ? (
        <div className={styles["small-modal-container"]} ref={modalRef}>
          <SmallModal
            label="퀴즈 신고하기"
            onLabelClick={handleSmallModalClick}
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
