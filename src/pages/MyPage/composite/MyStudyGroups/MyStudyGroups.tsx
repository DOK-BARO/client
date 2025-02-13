import styles from "./_my_study_groups.module.scss";
import StudyGroupItem from "../../components/StudyGroupItem/StudyGroupItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import { studyGroupService } from "@/services/server/studyGroupService";
import { studyGroupKeys } from "@/data/queryKeys";
import { StudyGroupsFilterType, StudyGroupsSortType } from "@/types/FilterType";
import { useAtom } from "jotai";
import useFilter from "@/hooks/useFilter";
import ListFilter, {
  FilterOptionType,
} from "@/components/composite/ListFilter/ListFilter";
import { useRef } from "react";
import { parseQueryParams } from "@/utils/parseQueryParams";
import { FetchStudyGroupsParams } from "@/types/ParamsType";
import { NoDataSection } from "@/components/composite/NoDataSection/NoDataSection";
import StudyGroupButton from "../../components/StudyGroupButton/StudyGroupButton";
import textBox from "/public/assets/svg/myPage/textBox.svg";
import pencilUnderline from "/public/assets/svg/myPage/pencilUnderline.svg";
import { useNavigate } from "react-router-dom";
import ROUTES from "@/data/routes";
import { myStudyGroupFilterAtom } from "@/store/filterAtom";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { StudyGroupType } from "@/types/StudyGroupType";
import { ErrorType } from "@/types/ErrorType";
import LoadingSpinner from "@/components/atom/LoadingSpinner/LoadingSpinner";

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

  const [filterCriteria, setFilterCriteria] = useAtom(myStudyGroupFilterAtom);
  // console.log("filterCriteria", filterCriteria);
  const observerRef = useRef<HTMLDivElement | null>(null);

  useFilter<StudyGroupsFilterType>(setFilterCriteria);

  const sort = filterCriteria.sort;
  const direction = filterCriteria.direction; // 기본값: ASC
  const page = 1; // parseQueryParams함수 안에서 기본값 1로 설정
  const size = 10; // 한번에 불러올 최대 길이 // 임의

  // console.log(sort, direction, size, page);
  const {
    data: myStudyGroupsData,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery<
    {
      endPageNumber: number;
      data: StudyGroupType[];
    },
    ErrorType,
    {
      pageParam: number[];
      pages: { endPageNumber: number; data: StudyGroupType[] }[];
    }
  >({
    queryKey: studyGroupKeys.list(
      parseQueryParams<StudyGroupsSortType, FetchStudyGroupsParams>({
        sort,
        direction,
        page,
        size,
      }),
    ),
    queryFn: async ({ pageParam }) => {
      const result = await studyGroupService.fetchStudyGroups(
        parseQueryParams({ sort, direction, page: pageParam as number, size }),
      );
      return result || { endPageNumber: 0, data: [] };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const currentPage = allPages.length;
      if (currentPage < lastPage.endPageNumber) {
        return currentPage + 1;
      }
      return undefined;
    },
  });

  const handleOptionClick = (filter: StudyGroupsFilterType) => {
    setFilterCriteria(filter);
    // console.log(filter);
  };

  // console.log(myStudyGroupsData);

  const handleStudyGroupJoinClick = () => {
    navigate(ROUTES.MY_STUDY_GROUPS_JOIN);
  };

  const handleStudyGroupCreateClick = () => {
    navigate(ROUTES.MY_STUDY_GROUPS_CREATE);
  };

  useInfiniteScroll({ hasNextPage, fetchNextPage, observerRef });

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
      {!myStudyGroupsData ? (
        <NoDataSection
          title="아직 내 스터디 그룹이 없어요 😔"
          buttonName="스터디 그룹 추가하기"
          onClick={() => {}}
        />
      ) : (
        myStudyGroupsData && (
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

            {myStudyGroupsData.pages
              .flatMap((page) => page.data)
              .map((studyGroup) => (
                <StudyGroupItem key={studyGroup.id} studyGroup={studyGroup} />
              ))}
          </ol>
        )
      )}

      {/* TODO: 무한 스크롤 */}
      <div ref={observerRef}>
        {isFetchingNextPage && (
          <LoadingSpinner className={styles["loading-spinner"]} width={42} />
        )}
      </div>
    </section>
  );
}
