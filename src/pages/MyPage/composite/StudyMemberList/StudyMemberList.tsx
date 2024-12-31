import { useMutation, useQuery } from "@tanstack/react-query";
import MemberItem from "../../components/MemberItem/MemberItem";
import LeaderItem from "../../components/LeaderItem/LeaderItem";
import { studyGroupKeys } from "@/data/queryKeys";
import { studyGroupService } from "@/services/server/studyGroupService";
import styles from "../StudyGroupSetting/_study_group_setting.module.scss";
import { ErrorType } from "@/types/ErrorType";
import toast from "react-hot-toast";
import { StudyMemberType } from "@/types/StudyGroupType";

export interface Prop {
  studyGroupId?: number;
}

export default function StudyMemberList({ studyGroupId }: Prop) {
  const { data: studyGroupDetail } = useQuery({
    queryKey: studyGroupKeys.detail(studyGroupId),
    queryFn: () =>
      studyGroupId ? studyGroupService.fetchStudyGroup(studyGroupId) : null,
    enabled: !!studyGroupId,
  });

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

  return (
    <section className={styles.container}>
      <div className={styles["header-container"]}>
        <h3 className={styles.title}>스터디원 관리</h3>
      </div>
      {/* 스터디장 */}
      <ol className={styles["member-list"]}>
        {studyGroupDetail?.studyMembers?.map((member) =>
          member.role === "LEADER" ? (
            <LeaderItem member={member} />
          ) : (
            <MemberItem
              member={member}
              handleChangeLeader={() => changeLeader({ member })}
            />
          )
        )}
      </ol>
    </section>
  );
}
