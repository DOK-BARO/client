// import Button from "@/components/atom/button/button";
import ListFilter from "@/components/composite/listFilter/listFilter";
import styles from "../studyGroupSetting/_study_group_setting.module.scss";
import { StudyGroupsFilterType } from "@/types/FilterType";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import MemberItem from "../../components/memberItem/memberItem";
import LeaderItem from "../../components/leaderItem/leaderItem";

export default function StudyMemberList() {
  //   const { data: unsolvedQuizData } = useQuery({
  //     queryKey: studyGroupKeys.myUnsolvedQuizList(
  //       studyGroupId,
  //       parseQueryParams<StudyGroupsSortType, FetchStudyGroupsParams>({
  //         sort,
  //         direction,
  //         page,
  //         size,
  //       })
  //     ),
  //     queryFn: () =>
  //       studyGroupId
  //         ? studyGroupService.fetchStudyGroupMyUnsolvedQuizzes(
  //             studyGroupId,
  //             parseQueryParams<StudyGroupsSortType, FetchStudyGroupsParams>({
  //               sort,
  //               direction,
  //               page,
  //               size,
  //             })
  //           )
  //         : null,
  //     enabled: !!studyGroupId,
  //   });
  //   const unsolvedQuizzes = unsolvedQuizData?.data;
  //   const endPageNumber = unsolvedQuizData?.endPageNumber;
  //   console.log(unsolvedQuizzes);
  //   // 마지막 페이지 번호 저장
  //   useEffect(() => {
  //     setPaginationState({
  //       ...paginationState,
  //       totalPagesLength: endPageNumber,
  //     });
  //   }, [endPageNumber]);
  //   const handleOptionClick = (filter: StudyGroupsFilterType) => {
  //     setFilterCriteria(filter);
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
        <LeaderItem />
        <MemberItem />
      </ol>
    </section>
  );
}
