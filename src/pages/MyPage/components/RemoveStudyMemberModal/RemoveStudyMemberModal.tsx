import Modal from "@/components/atom/Modal/Modal";
import { studyGroupKeys } from "@/data/queryKeys";
import useWithdrawStudy from "@/hooks/mutate/useWithdrawStudy";
import { queryClient } from "@/services/server/queryClient";
import { StudyGroupDetailType, StudyMemberType } from "@/types/StudyGroupType";
import toast from "react-hot-toast";

interface Props {
  closeRemoveStudyMemberModal: () => void;
  member: StudyMemberType;
  studyGroupDetail: StudyGroupDetailType;
}
export default function RemoveStudyMemberModal({
  closeRemoveStudyMemberModal,
  member,
  studyGroupDetail,
}: Props) {
  const { withdrawStudy } = useWithdrawStudy({
    studyGroupId: studyGroupDetail.id,
    onSuccessCallback: () => {
      closeRemoveStudyMemberModal();
      toast.success(`${member.nickname}님이 탈퇴 처리되었습니다.`);
      queryClient.invalidateQueries({
        queryKey: studyGroupKeys.detail(studyGroupDetail.id),
      });
    },
    onErrorCallback: (error) => {
      toast.error(
        error.message || `${member.nickname}님의 탈퇴 처리에 실패했습니다.`,
      );
    },
  });
  return (
    <Modal
      title=""
      closeModal={closeRemoveStudyMemberModal}
      contents={[
        {
          title: `${member.nickname}님을 ${studyGroupDetail.name}에서 내보내시겠어요?`,
          content: <p>내보낸 스터디원은 스터디에 재가입할 수 있어요.</p>,
        },
      ]}
      bottomButtons={[
        {
          color: "primary",
          text: "내보내기",
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
