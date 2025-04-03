import Modal from "@/components/atom/Modal/Modal";
import { studyGroupService } from "@/services/server/studyGroupService";
import { ErrorType } from "@/types/ErrorType";
import { StudyGroupDetailType, StudyMemberType } from "@/types/StudyGroupType";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface Props {
  closeChangeStudyLeaderModal: () => void;
  studyGroupId: number | undefined;
  member: StudyMemberType;
  studyGroupDetail: StudyGroupDetailType;
}
export default function ChangeStudyLeaderModal({
  closeChangeStudyLeaderModal,
  studyGroupId,
  member,
  studyGroupDetail,
}: Props) {
  const navigate = useNavigate();
  // 스터디장 위임
  const { mutate: changeLeader } = useMutation<
    void,
    ErrorType,
    { member: StudyMemberType }
  >({
    mutationFn: ({ member }) => {
      if (studyGroupId) {
        return studyGroupService.changeStudyGroupLeader({
          studyGroupId,
          newLeaderId: member.id,
        });
      }
      return Promise.reject(new Error("스터디 없음"));
    },
    onSuccess: (_, { member }) => {
      toast.success(`스터디장이 ${member.nickname}에게 위임되었습니다.`);
      navigate(-1);
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message || "스터디장 위임에 실패했습니다.");
    },
  });
  return (
    <Modal
      title=""
      contents={[
        {
          title: `${member.nickname}님을 ${studyGroupDetail.name} 스터디장으로 위임하시겠어요?`,
          content: (
            <p>
              위임 후{" "}
              {
                studyGroupDetail.studyMembers?.find(
                  (member) => member.role === "LEADER",
                )?.nickname
              }
              님의 스터디장 권한이 없어집니다.
            </p>
          ),
        },
      ]}
      bottomButtons={[
        {
          color: "primary",
          text: "위임하기",
          onClick: () => changeLeader({ member }),
        },
      ]}
      closeModal={closeChangeStudyLeaderModal}
    />
  );
}
