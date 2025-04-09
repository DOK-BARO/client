import styles from "./_study_code_share_modal.module.scss";
import Button from "@/components/atom/Button/Button";
import Modal from "@/components/atom/Modal/Modal";
import { studyGroupKeys } from "@/data/queryKeys";
import { studyGroupService } from "@/services/server/studyGroupService";
import { isLoggedInAtom } from "@/store/userAtom";
import { primary } from "@/styles/abstracts/colors";
import { Copy } from "@/svg/Copy";
import { copyText } from "@/utils/copyText";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";

interface Props {
  closeModal: () => void;
  studyGroupId: number;
  title: string;
}

export default function StudyCodeShareModal({
  closeModal,
  studyGroupId,
  title,
}: Props) {
  const navigate = useNavigate();
  const [isLoggedIn] = useAtom(isLoggedInAtom);

  // 스터디 생성 후 초대 코드를 가져오기 위함
  const { data: studyGroupDetail } = useQuery({
    queryKey: studyGroupKeys.detail(studyGroupId),
    queryFn: () =>
      studyGroupId ? studyGroupService.fetchStudyGroup(studyGroupId) : null,
    enabled: isLoggedIn && !!studyGroupId,
  });

  const handleClickCopyCode = (e: React.MouseEvent<HTMLButtonElement>) => {
    const buttonText =
      e.currentTarget.querySelector("#invite-code")?.textContent;
    if (buttonText) {
      copyText(buttonText);
    }
  };

  const handleDoneClick = () => {
    closeModal();
    navigate(-1);
  };

  return (
    <Modal
      closeModal={closeModal}
      title={title}
      contents={[
        {
          title: "스터디 초대코드를 초대하고 싶은 친구에게 보내세요.",
          content: (
            <Button
              ariaLabel="초대 코드 복사하기"
              fullWidth
              className={styles["new-study-invite-code"]}
              icon={<Copy stroke={primary} width={20} height={20} alt="" />}
              iconPosition="right"
              onClick={handleClickCopyCode}
            >
              <span id="invite-code" aria-label="스터디 초대 코드">
                {studyGroupDetail?.inviteCode}
              </span>
            </Button>
          ),
        },
      ]}
      bottomButtons={[
        {
          text: "완료",
          color: "primary",
          onClick: handleDoneClick,
        },
      ]}
    />
  );
}
