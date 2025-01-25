import { useMutation, useQuery } from "@tanstack/react-query";
import MemberItem from "../../components/MemberItem/MemberItem";
import LeaderItem from "../../components/LeaderItem/LeaderItem";
import { studyGroupKeys } from "@/data/queryKeys";
import { studyGroupService } from "@/services/server/studyGroupService";
import styles from "../StudyGroupSetting/_study_group_setting.module.scss";
import { ErrorType } from "@/types/ErrorType";
import toast from "react-hot-toast";
import { StudyMemberType } from "@/types/StudyGroupType";
import useModal from "@/hooks/useModal";
import Modal from "@/components/atom/Modal/Modal";
import { Fragment } from "react/jsx-runtime";

export interface Props {
  studyGroupId?: number;
  onDeleteStudyGroupClick: () => void;
}

export default function StudyMemberList({
  studyGroupId,
  onDeleteStudyGroupClick,
}: Props) {
  const {
    openModal: openChangeStudyGroupLeaderModal,
    closeModal: closeChangeStudyGroupLeaderModal,
    isModalOpen: isChangeStudyGroupLeaderModalOpen,
  } = useModal();
  const { data: studyGroupDetail } = useQuery({
    queryKey: studyGroupKeys.detail(studyGroupId),
    queryFn: () =>
      studyGroupId ? studyGroupService.fetchStudyGroup(studyGroupId) : null,
    enabled: !!studyGroupId,
  });

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
      return Promise.reject(new Error("스터디 그룹 없음"));
    },
    onSuccess: (_, { member }) => {
      toast.success(`스터디장이 ${member.nickname}에게 위임되었습니다.`);
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message || "스터디장 위임에 실패했습니다.");
    },
  });

  const {
    openModal: openWithdrawStudyGroupMemberModal,
    closeModal: closeWithdrawStudyGroupMemberModal,
    isModalOpen: isWithdrawStudyGroupMemberModalOpen,
  } = useModal();

  // 스터디원 내보내기 (탈퇴)
  const { mutate: withdrawMember } = useMutation<
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
      return Promise.reject(new Error("스터디 그룹 없음"));
    },
    onSuccess: (_, { member }) => {
      toast.success(`${member.nickname}을 내보냈습니다.`);
    },
    onError: (error, { member }) => {
      console.error(error);
      toast.error(
        error.message || `${member.nickname}을 내보내기에 실패했습니다.`,
      );
    },
  });

  return (
    <section className={styles.container}>
      <div className={styles["header-container"]}>
        <h3 className={styles.title}>스터디원 관리</h3>
      </div>
      <ol className={styles["member-list"]}>
        {studyGroupDetail?.studyMembers?.map((member) => (
          <Fragment key={member.id}>
            {/* 스터디장 위임 확인 모달 */}
            {isChangeStudyGroupLeaderModalOpen && (
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
                closeModal={closeChangeStudyGroupLeaderModal}
              />
            )}
            {/* 스터디원 내보내기 확인 모달 */}
            {isWithdrawStudyGroupMemberModalOpen && (
              <Modal
                title=""
                closeModal={closeWithdrawStudyGroupMemberModal}
                contents={[
                  {
                    title: `${member.nickname}님을 ${studyGroupDetail.name}에서 내보내시겠어요?`,
                    content: (
                      <p>내보낸 스터디원은 스터디 그룹에 재가입할 수 있어요.</p>
                    ),
                  },
                ]}
                bottomButtons={[
                  {
                    color: "primary",
                    text: "내보내기",
                    onClick: () => {
                      withdrawMember({ member });
                    },
                  },
                ]}
              />
            )}
            {member.role === "LEADER" ? (
              <LeaderItem
                member={member}
                onDeleteStudyGroupClick={onDeleteStudyGroupClick}
              />
            ) : (
              <MemberItem
                member={member}
                onChangeLeaderClick={openChangeStudyGroupLeaderModal}
                onWithdrawMemberClick={openWithdrawStudyGroupMemberModal}
              />
            )}
          </Fragment>
        ))}
      </ol>
    </section>
  );
}
