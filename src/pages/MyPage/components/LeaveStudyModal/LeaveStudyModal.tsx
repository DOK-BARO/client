import Modal from "@/components/atom/Modal/Modal";
import ROUTES from "@/data/routes";
import useWithdrawStudy from "@/hooks/mutate/useWithdrawStudy";
import { StudyGroupDetailType, StudyMemberType } from "@/types/StudyGroupType";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface Props {
  studyGroupDetail: StudyGroupDetailType;
  closeLeaveStudyModal: () => void;
  member: StudyMemberType;
}
export default function LeaveStudyModal({
  studyGroupDetail,
  closeLeaveStudyModal,
  member,
}: Props) {
  const navigate = useNavigate();
  const { withdrawStudy } = useWithdrawStudy({
    studyGroupId: studyGroupDetail.id,
    onSuccessCallback: () => {
      closeLeaveStudyModal();
      toast.success("탈퇴 처리되었습니다.");
      navigate(`${ROUTES.MY_PAGE}/${ROUTES.MY_STUDY_GROUPS}`);
    },
    onErrorCallback: (error) => {
      toast.error(error.message ?? "탈퇴 처리에 실패했습니다.");
    },
  });
  return (
    <Modal
      title=""
      closeModal={closeLeaveStudyModal}
      contents={[
        {
          title: `${studyGroupDetail.name} 스터디를 탈퇴하시겠어요?`,
          content: (
            <p>탈퇴 시, 스터디에서 푼 퀴즈는 더 이상 확인할 수 없습니다.</p>
          ),
        },
      ]}
      bottomButtons={[
        {
          color: "primary",
          text: "탈퇴하기",
          onClick: () => {
            withdrawStudy({
              member,
            });
          },
        },
      ]}
    />
  );
}
