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
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { isLoggedInAtom } from "@/store/userAtom";
import ROUTES from "@/data/routes";

export interface Props {
  studyGroupId?: number;
  onDeleteStudyGroupClick: () => void;
  isStudyGroupLeader: boolean;
}

export default function StudyMemberList({
  studyGroupId,
  onDeleteStudyGroupClick,
  isStudyGroupLeader,
}: Props) {
  const navigate = useNavigate();
  const [isLoggedIn] = useAtom(isLoggedInAtom);
  const {
    openModal: openChangeStudyGroupLeaderModal,
    closeModal: closeChangeStudyGroupLeaderModal,
    isModalOpen: isChangeStudyGroupLeaderModalOpen,
  } = useModal();
  const { data: studyGroupDetail } = useQuery({
    queryKey: studyGroupKeys.detail(studyGroupId),
    queryFn: () =>
      studyGroupId ? studyGroupService.fetchStudyGroup(studyGroupId) : null,
    enabled: isLoggedIn && !!studyGroupId,
  });

  const leader = studyGroupDetail?.studyMembers?.find(
    (member) => member.role === "LEADER",
  );
  const memberList = studyGroupDetail
    ? studyGroupDetail.studyMembers?.filter(
        (member) => member.role !== "LEADER",
      )
    : [];

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

  const {
    openModal: openWithdrawStudyGroupMemberModal,
    closeModal: closeWithdrawStudyGroupMemberModal,
    isModalOpen: isWithdrawStudyGroupMemberModalOpen,
  } = useModal();

  const {
    openModal: openWithdrawStudyModal,
    closeModal: closeWithdrawStudyModal,
    isModalOpen: isWithdrawStudyModalOpen,
  } = useModal();

  // 스터디원 내보내기 (탈퇴)
  const { mutate: withdrawMember } = useMutation<
    void,
    ErrorType,
    { member: StudyMemberType; closeModal: () => void }
  >({
    mutationFn: ({ member }) => {
      if (studyGroupId) {
        return studyGroupService.withdrawStudyGroupMember({
          studyGroupId,
          memberId: member.id,
        });
      }
      return Promise.reject(new Error("스터디 없음"));
    },
    onSuccess: (_, { member, closeModal }) => {
      toast.success(`${member.nickname}님이 탈퇴 처리되었습니다.`);
      closeModal();
    },
    onError: (error, { member }) => {
      console.error(error);
      toast.error(
        error.message || `${member.nickname}님의 탈퇴 처리에 실패했습니다.`,
      );
    },
  });

  return (
    <section className={styles.container}>
      <div className={styles["header-container"]}>
        <h3 className={styles.title}>
          스터디원 {isStudyGroupLeader ? "관리" : "목록"}
        </h3>
      </div>
      {studyGroupDetail && leader ? (
        <ol className={styles["member-list"]}>
          <LeaderItem
            isStudyGroupLeader={isStudyGroupLeader}
            member={leader}
            onDeleteStudyGroupClick={onDeleteStudyGroupClick}
          />
          {memberList?.map((member) => (
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
                        <p>내보낸 스터디원은 스터디에 재가입할 수 있어요.</p>
                      ),
                    },
                  ]}
                  bottomButtons={[
                    {
                      color: "primary",
                      text: "내보내기",
                      onClick: () => {
                        withdrawMember({
                          member,
                          closeModal: closeWithdrawStudyGroupMemberModal,
                        });
                      },
                    },
                  ]}
                />
              )}
              {/* 스터디 탈퇴하기 확인 모달 */}
              {isWithdrawStudyModalOpen && (
                <Modal
                  title=""
                  closeModal={closeWithdrawStudyModal}
                  contents={[
                    {
                      title: `${studyGroupDetail.name} 스터디를 탈퇴하시겠어요?`,
                      content: (
                        <p>
                          탈퇴 시, 스터디에서 푼 퀴즈는 더 이상 확인할 수
                          없습니다.
                        </p>
                      ),
                    },
                  ]}
                  bottomButtons={[
                    {
                      color: "primary",
                      text: "탈퇴하기",
                      onClick: () => {
                        withdrawMember({
                          member,
                          closeModal: () => {
                            closeWithdrawStudyModal();
                            navigate(
                              `${ROUTES.MY_PAGE}/${ROUTES.MY_STUDY_GROUPS}`,
                            );
                          },
                        });
                      },
                    },
                  ]}
                />
              )}

              <MemberItem
                member={member}
                onChangeLeaderClick={openChangeStudyGroupLeaderModal}
                onWithdrawMemberClick={openWithdrawStudyGroupMemberModal}
                onWithdrawMeClick={openWithdrawStudyModal}
                isStudyGroupLeader={isStudyGroupLeader}
              />
            </Fragment>
          ))}
        </ol>
      ) : null}
    </section>
  );
}
