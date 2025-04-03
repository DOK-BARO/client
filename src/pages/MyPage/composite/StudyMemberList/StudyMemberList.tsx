import styles from "../StudyGroupSetting/_study_group_setting.module.scss";
import { useQuery } from "@tanstack/react-query";
import MemberItem from "../../components/MemberItem/MemberItem";
import LeaderItem from "../../components/LeaderItem/LeaderItem";
import { studyGroupKeys } from "@/data/queryKeys";
import { studyGroupService } from "@/services/server/studyGroupService";
import useModal from "@/hooks/useModal";
import { Fragment } from "react/jsx-runtime";
import { useAtom } from "jotai";
import { isLoggedInAtom } from "@/store/userAtom";
import ChangeStudyLeaderModal from "../../components/ChangeStudyLeaderModal/ChangeStudyLeaderModal";
import RemoveStudyMemberModal from "../../components/RemoveStudyMemberModal/RemoveStudyMemberModal";
import LeaveStudyModal from "../../components/LeaveStudyModal/LeaveStudyModal";

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
  const [isLoggedIn] = useAtom(isLoggedInAtom);

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

  const {
    openModal: openChangeStudyLeaderModal,
    closeModal: closeChangeStudyLeaderModal,
    isModalOpen: isChangeStudyLeaderModalOpen,
  } = useModal();

  const {
    openModal: openRemoveStudyMemberModal,
    closeModal: closeRemoveStudyMemberModal,
    isModalOpen: isRemoveStudyMemberModalOpen,
  } = useModal();

  const {
    openModal: openLeaveStudyModal,
    closeModal: closeLeaveStudyModal,
    isModalOpen: isLeaveStudyModalOpen,
  } = useModal();

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
              {isChangeStudyLeaderModalOpen && (
                <ChangeStudyLeaderModal
                  closeChangeStudyLeaderModal={closeChangeStudyLeaderModal}
                  member={member}
                  studyGroupId={studyGroupId}
                  studyGroupDetail={studyGroupDetail}
                />
              )}
              {/* 스터디원 내보내기 확인 모달 */}
              {isRemoveStudyMemberModalOpen && (
                <RemoveStudyMemberModal
                  member={member}
                  studyGroupDetail={studyGroupDetail}
                  closeRemoveStudyMemberModal={closeRemoveStudyMemberModal}
                />
              )}
              {/* 스터디 탈퇴하기 확인 모달 */}
              {isLeaveStudyModalOpen && (
                <LeaveStudyModal
                  studyGroupDetail={studyGroupDetail}
                  closeLeaveStudyModal={closeLeaveStudyModal}
                  member={member}
                />
              )}

              <MemberItem
                member={member}
                onChangeLeaderClick={openChangeStudyLeaderModal}
                onRemoveStudyMemberClick={openRemoveStudyMemberModal}
                onLeaveStudyClick={openLeaveStudyModal}
                isStudyGroupLeader={isStudyGroupLeader}
              />
            </Fragment>
          ))}
        </ol>
      ) : null}
    </section>
  );
}
