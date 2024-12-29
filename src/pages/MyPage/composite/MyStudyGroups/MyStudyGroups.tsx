import styles from "./_my_study_groups.module.scss";
import Button from "@/components/atom/Button/Button";
import { Plus } from "@/svg/Plus";
import { primary } from "@/styles/abstracts/colors";
import StudyGroupItem from "../../components/StudyGroupItem/studyGroupItem";
import AddStudyGroupModal from "../../components/AddStudyGroupModal/addStudyGroupModal";
import useModal from "@/hooks/useModal";
import { useQuery } from "@tanstack/react-query";
import { studyGroupService } from "@/services/server/studyGroupService";
import { studyGroupKeys } from "@/data/queryKeys";
import { StudyGroupsFilterType, StudyGroupsSortType } from "@/types/FilterType";
import { myPageStudyGroupPaginationAtom } from "@/store/paginationAtom";
import { useAtom } from "jotai";
import { studyGroupFilterAtom } from "@/store/studyGroupAtom";
import useFilter from "@/hooks/useFilter";
import ListFilter, {
  FilterOptionType,
} from "@/components/composite/ListFilter/ListFilter";
import { useEffect } from "react";
import Pagination from "@/components/composite/Pagination/Pagination";
import { parseQueryParams } from "@/utils/parseQueryParams";
import { FetchStudyGroupsParams } from "@/types/ParamsType";

const filterOptions: FilterOptionType<StudyGroupsFilterType>[] = [
  {
    filter: {
      sort: "CREATED_AT",
      direction: "ASC",
    },
    label: "최신순",
  },
  {
    filter: {
      sort: "NAME",
      direction: "ASC",
    },
    label: "가나다순",
  },
];

export default function MyStudyGroups() {
  const { isModalOpen, openModal, closeModal } = useModal();

  const [filterCriteria, setFilterCriteria] = useAtom(studyGroupFilterAtom);
  useFilter<StudyGroupsFilterType>(setFilterCriteria);

  const [paginationState, setPaginationState] = useAtom(
    myPageStudyGroupPaginationAtom
  );
  const totalPagesLength = paginationState.totalPagesLength;

  const sort = filterCriteria.sort; // 기본값: 가나다
  const direction = filterCriteria.direction; // 기본값: ASC
  const page = paginationState.currentPage; // parseQueryParams함수 안에서 기본값 1로 설정
  const size = 4; // 한번에 불러올 최대 길이: 책 목록에서는 10 고정값.

  const { data: myStudyGroupsData } = useQuery({
    queryKey: studyGroupKeys.list(
      parseQueryParams<StudyGroupsSortType, FetchStudyGroupsParams>({
        sort,
        direction,
        page,
        size,
      })
    ),
    queryFn: () =>
      studyGroupService.fetchStudyGroups(
        parseQueryParams({ sort, direction, page, size })
      ),
  });

  const myStudyGroups = myStudyGroupsData?.data;
  const endPageNumber = myStudyGroupsData?.endPageNumber;

  // 마지막 페이지 번호 저장
  useEffect(() => {
    setPaginationState({
      ...paginationState,
      totalPagesLength: endPageNumber,
    });
  }, [endPageNumber]);

  const handleOptionClick = (filter: StudyGroupsFilterType) => {
    setFilterCriteria(filter);
    console.log(filter);
  };

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>내 스터디 그룹</h3>
        <Button
          size="xsmall"
          color="secondary"
          icon={<Plus stroke={primary} width={16} height={16} />}
          iconPosition="left"
          onClick={openModal}
        >
          스터디 그룹 추가
        </Button>
      </div>
      <div className={styles["filter-container"]}>
        <ListFilter
          handleOptionClick={handleOptionClick}
          sortFilter={filterCriteria}
          filterOptions={filterOptions}
        />
      </div>
      {myStudyGroups ? (
        <ol className={styles["study-list"]}>
          {/* 스터디 그룹 아이템과 부족한 공간 채우기 */}
          {[
            ...myStudyGroups,
            ...Array(size - (myStudyGroups.length % size || size)).fill(null),
          ].map((studyGroup, index) =>
            studyGroup ? (
              <StudyGroupItem key={studyGroup.id} studyGroup={studyGroup} />
            ) : (
              <li
                key={`empty-${index}`}
                className={styles["study-list-empty-item"]}
              />
            )
          )}
        </ol>
      ) : null}
      {isModalOpen ? <AddStudyGroupModal closeModal={closeModal} /> : null}
      {totalPagesLength ? (
        <Pagination
          type="state"
          paginationState={paginationState}
          setPaginationState={setPaginationState}
        />
      ) : null}
    </section>
  );
}
