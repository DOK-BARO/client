// import ListFilter from "@/components/composite/listFilter/listFilter";
import styles from "../studyGroupSetting/_study_group_setting.module.scss";
// import { StudyGroupsFilterType } from "@/types/FilterType";
import { useQuery } from "@tanstack/react-query";
import MemberItem from "../../components/memberItem/memberItem";
import LeaderItem from "../../components/leaderItem/leaderItem";
import { studyGroupKeys } from "@/data/queryKeys";
import { studyGroupService } from "@/services/server/studyGroupService";

export interface Prop {
  studyGroupId: number | undefined;
}
export default function StudyMemberList({ studyGroupId }: Prop) {
  const { data: studyGroupDetail } = useQuery({
    queryKey: studyGroupKeys.detail(studyGroupId),
    queryFn: () =>
      studyGroupId ? studyGroupService.fetchStudyGroup(studyGroupId) : null,
    enabled: !!studyGroupId,
  });
  //   // 마지막 페이지 번호 저장
  //   useEffect(() => {
  //     setPaginationState({
  //       ...paginationState,
  //       totalPagesLength: endPageNumber,
  //     });
  //   }, [endPageNumber]);

  console.log(studyGroupDetail);
  //   const handleOptionClick = (filter: StudyGroupsFilterType) => {
  //     // setFilterCriteria(filter);
  //   };
  return (
    <section className={styles.container}>
      <div className={styles["header-container"]}>
        <h3 className={styles.title}>스터디원 관리</h3>
        {/* <ListFilter
        handleOptionClick={handleOptionClick}
        sortFilter={filterCriteria}
        filterOptions={filterOptions}
      /> */}
      </div>
      <div>{/* 스터디장 */}</div>
      <ol className={styles["member-list"]}>
        {studyGroupDetail?.studyMembers?.map((member) =>
          member.role === "LEADER" ? (
            <LeaderItem member={member} />
          ) : (
            <MemberItem member={member} />
          )
        )}
      </ol>
    </section>
  );
}
