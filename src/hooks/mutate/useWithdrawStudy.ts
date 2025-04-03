import { studyGroupService } from "@/services/server/studyGroupService";
import { ErrorType } from "@/types/ErrorType";
import { StudyMemberType } from "@/types/StudyGroupType";
import { useMutation } from "@tanstack/react-query";

interface Props {
  studyGroupId: number;
  onSuccessCallback: () => void;
  onErrorCallback: (error: ErrorType) => void;
}
const useWithdrawStudy = ({
  studyGroupId,
  onSuccessCallback,
  onErrorCallback,
}: Props) => {
  const { mutate: withdrawStudy } = useMutation<
    void,
    ErrorType,
    { member: StudyMemberType }
  >({
    mutationFn: ({ member }) => {
      if (studyGroupId) {
        return studyGroupService.withdrawStudyGroupMember({
          studyGroupId,
          memberId: member.id,
        });
      }
      return Promise.reject(new Error("스터디가 존재하지 않습니다."));
    },
    onSuccess: () => {
      onSuccessCallback();
    },
    onError: (error) => {
      console.error(error);
      onErrorCallback(error);
    },
  });
  return { withdrawStudy };
};
export default useWithdrawStudy;
