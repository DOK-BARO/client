import styles from "./_my_study_groups.module.scss";
import StudyGroupItem from "../../components/StudyGroupItem/StudyGroupItem";
import { useQuery } from "@tanstack/react-query";
import { studyGroupService } from "@/services/server/studyGroupService";
import { studyGroupKeys } from "@/data/queryKeys";
import { StudyGroupsFilterType, StudyGroupsSortType } from "@/types/FilterType";
import { myPageStudyGroupPaginationAtom } from "@/store/paginationAtom";
import { useAtom } from "jotai";
import useFilter from "@/hooks/useFilter";
import ListFilter, {
  FilterOptionType,
} from "@/components/composite/ListFilter/ListFilter";
import { useEffect } from "react";
import Pagination from "@/components/composite/Pagination/Pagination";
import { parseQueryParams } from "@/utils/parseQueryParams";
import { FetchStudyGroupsParams } from "@/types/ParamsType";
import { NoDataSection } from "@/components/composite/NoDataSection/NoDataSection";
import StudyGroupButton from "../../components/StudyGroupButton/StudyGroupButton";
import textBox from "/public/assets/svg/myPage/text-box.svg";
import pencilUnderline from "/public/assets/svg/myPage/pencil-underline.svg";
import { useNavigate } from "react-router-dom";
import ROUTES from "@/data/routes";
import { myPageStudyGroupFilterAtom } from "@/store/filterAtom";

const filterOptions: FilterOptionType<StudyGroupsFilterType>[] = [
  {
    filter: {
      sort: "CREATED_AT",
      direction: "DESC",
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
  const navigate = useNavigate();

  const [filterCriteria, setFilterCriteria] = useAtom(
    myPageStudyGroupFilterAtom
  );
  console.log("filterCriteria", filterCriteria);

  useFilter<StudyGroupsFilterType>(setFilterCriteria);

  const [paginationState, setPaginationState] = useAtom(
    myPageStudyGroupPaginationAtom
  );
  const totalPagesLength = paginationState.totalPagesLength;

  const sort = filterCriteria.sort;
  const direction = filterCriteria.direction; // 기본값: ASC
  const page = paginationState.currentPage; // parseQueryParams함수 안에서 기본값 1로 설정
  const size = 5; // 한번에 불러올 최대 길이

  console.log(sort, direction, size, page);
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

  console.log(myStudyGroups);

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

  console.log(myStudyGroupsData);

  const handleStudyGroupJoinClick = () => {
    navigate(ROUTES.MY_STUDY_GROUPS_JOIN);
  };

  const handleStudyGroupCreateClick = () => {
    navigate(ROUTES.MY_STUDY_GROUPS_CREATE);
  };

  return (
    <section className={styles.container}>
      <h3 className={styles["sub-title"]}>내 스터디 그룹</h3>
      <div className={styles["filter-container"]}>
        <ListFilter
          onOptionClick={handleOptionClick}
          sortFilter={filterCriteria}
          filterOptions={filterOptions}
        />
      </div>
      {myStudyGroups && myStudyGroups.length === 0 && page === 1 ? (
        <NoDataSection
          title="아직 내 스터디 그룹이 없어요 😔"
          buttonName="스터디 그룹 추가하기"
          onClick={() => {}}
        />
      ) : (
        myStudyGroups && (
          <ol className={styles["study-list"]}>
            <li className={styles["button-container"]}>
              <StudyGroupButton
                label="코드로 가입하기"
                icon={
                  <img
                    src={textBox}
                    width={24}
                    height={24}
                    alt="코드로 가입하기"
                  />
                }
                onClick={handleStudyGroupJoinClick}
              />
              <StudyGroupButton
                label="내가 만들기"
                icon={
                  <img
                    src={pencilUnderline}
                    width={24}
                    height={24}
                    alt="내가 만들기"
                  />
                }
                onClick={handleStudyGroupCreateClick}
              />
            </li>

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
        )
      )}

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
