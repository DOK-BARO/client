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
import { StudyGroupsFilterType } from "@/types/FilterType";
import { useLocation } from "react-router-dom";
import { paginationAtom } from "@/store/paginationAtom";
import { useAtom } from "jotai";
import { studyGroupFilterAtom } from "@/store/studyGroupAtom";
import useFilter from "@/hooks/useBookFilter";
import useNavigateWithParams from "@/hooks/useNavigateWithParams";
import ListFilter, {
  FilterOptionType,
} from "@/components/composite/listFilter/listFilter";
import { useEffect } from "react";
import Pagination from "@/components/composite/pagination/pagination";

export default function MyStudy() {
  const { isModalOpen, openModal, closeModal } = useModal();

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const [, setFilterCriteria] = useAtom(studyGroupFilterAtom);
  useFilter<StudyGroupsFilterType>(setFilterCriteria);

  const [paginationState, setPaginationState] = useAtom(paginationAtom);
  const totalPagesLength = paginationState.totalPagesLength;

  const sort = queryParams.get("sort");
  const direction = queryParams.get("direction");
  const page = queryParams.get("page");

  const { data: myStudiesData } = useQuery({
    queryKey: studyGroupKeys.list({
      page: page ? Number(page) : undefined,
      size: 10,
      direction: direction
        ? (direction as StudyGroupsFilterType["direction"])
        : undefined,
      sort: sort ? (sort as StudyGroupsFilterType["sort"]) : undefined,
    }),
    queryFn: () =>
      studyGroupService.fetchStudyGroups({
        page: page ? Number(page) : undefined,
        size: 10,
        direction: direction as StudyGroupsFilterType["direction"],
        sort: sort as StudyGroupsFilterType["sort"],
      }),
  });

  const myStudies = myStudiesData?.data;
  const endPageNumber = myStudiesData?.endPageNumber;

  // 마지막 페이지 번호 저장
  useEffect(() => {
    setPaginationState({
      ...paginationState,
      totalPagesLength: endPageNumber,
    });
  }, [endPageNumber]);

  console.log(myStudiesData);

  const { navigateWithParams } = useNavigateWithParams();
  const [filterCriteria] = useAtom(studyGroupFilterAtom);

  const handleOptionClick = (filter: StudyGroupsFilterType) => {
    navigateWithParams({ filter: filter, parentComponentType: "MY" });
  };
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
      <ListFilter
        handleOptionClick={handleOptionClick}
        sortFilter={filterCriteria}
        filterOptions={filterOptions}
      />
      {myStudies ? (
        <ol className={styles["study-list"]}>
          {myStudies?.map((study) => (
            <StudyGroupItem key={study.id} study={study} />
          ))}
        </ol>
      ) : null}
      {isModalOpen ? <AddStudyGroupModal closeModal={closeModal} /> : null}
      {totalPagesLength ? <Pagination parentComponent="MY" /> : null}
    </section>
  );
}
