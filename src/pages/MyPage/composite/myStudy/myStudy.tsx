import styles from "./_my_study.module.scss";
import Button from "@/components/atom/button/button";
import { Plus } from "@/svg/plus";
import { primary } from "@/styles/abstracts/colors";
import StudyGroupItem from "../../components/studyGroupItem/studyGroupItem";
import AddStudyGroupModal from "../../components/addStudyGroupModal/addStudyGroupModal";
import useModal from "@/hooks/useModal";
import { useQuery } from "@tanstack/react-query";
import { studyGroupService } from "@/services/server/studyGroupService";
import { studyGroupKeys } from "@/data/queryKeys";
import { StudyGroupsFilterType, StudyGroupsSortType } from "@/types/FilterType";
import { useLocation } from "react-router-dom";
import { paginationAtom } from "@/store/paginationAtom";
import { useAtom } from "jotai";
import { studyGroupFilterAtom } from "@/store/studyGroupAtom";
import useFilter from "@/hooks/useFilter";
import useNavigateWithParams from "@/hooks/useNavigateWithParams";
import ListFilter, {
  FilterOptionType,
} from "@/components/composite/listFilter/listFilter";
import { useEffect } from "react";
import Pagination from "@/components/composite/pagination/pagination";
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
      sort: "TITLE",
      direction: "ASC",
    },
    label: "가나다순",
  },
];

export default function MyStudy() {
  const { isModalOpen, openModal, closeModal } = useModal();

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const [, setFilterCriteria] = useAtom(studyGroupFilterAtom);
  useFilter<StudyGroupsFilterType>(setFilterCriteria);

  const [paginationState, setPaginationState] = useAtom(paginationAtom);
  const totalPagesLength = paginationState.totalPagesLength;

  const sort = queryParams.get("sort") || "CREATED_AT"; // 기본값: 가나다
  const direction = queryParams.get("direction") || "ASC"; // 기본값: ASC
  const page = queryParams.get("page") || undefined; // parseQueryParams함수 안에서 기본값 1로 설정
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

  const { navigateWithParams } = useNavigateWithParams("MY");
  const [filterCriteria] = useAtom(studyGroupFilterAtom);

  const handleOptionClick = (filter: StudyGroupsFilterType) => {
    navigateWithParams({ filter: filter, parentComponentType: "MY" });
  };

  // const myStudyGroupList =
  //   myStudyGroups.length < 4
  //     ? [...myStudyGroups, ...Array(4 - myStudyGroups.length).fill(null)]
  //     : myStudyGroups;

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
      {totalPagesLength ? <Pagination parentComponent="MY" /> : null}
    </section>
  );
}
