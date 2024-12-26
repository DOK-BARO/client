import { useLocation, useParams } from "react-router-dom";
import styles from "./_study_group.module.scss";
import { useQuery } from "@tanstack/react-query";
import { studyGroupKeys } from "@/data/queryKeys";
import { studyGroupService } from "@/services/server/studyGroupService";
import { parseQueryParams } from "@/utils/parseQueryParams";
import { FetchStudyGroupsParams } from "@/types/ParamsType";
import { StudyGroupsFilterType, StudyGroupsSortType } from "@/types/FilterType";
import QuizItem from "../../components/quizItem/quizItem";
import ListFilter, {
  FilterOptionType,
} from "@/components/composite/listFilter/listFilter";
import { useEffect } from "react";
import { studyGroupFilterAtom } from "@/store/studyGroupAtom";
import { useAtom } from "jotai";
import useFilter from "@/hooks/useFilter";
import { paginationAtom } from "@/store/paginationAtom";
import useNavigateWithParams from "@/hooks/useNavigateWithParams";
import Pagination from "@/components/composite/pagination/pagination";

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

export default function StudyGroup() {
  const { studyGroupId } = useParams();
  const id = studyGroupId ? Number(studyGroupId) : undefined;
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const [, setFilterCriteria] = useAtom(studyGroupFilterAtom);
  useFilter<StudyGroupsFilterType>(setFilterCriteria);

  const [paginationState, setPaginationState] = useAtom(paginationAtom);
  const totalPagesLength = paginationState.totalPagesLength;

  const sort = queryParams.get("sort") || "CREATED_AT"; // 기본값: 최신순
  const direction = queryParams.get("direction") || "ASC"; // 기본값: ASC
  const page = queryParams.get("page") || undefined; // parseQueryParams함수 안에서 기본값 1로 설정
  const size = 10; // 한번에 불러올 최대 길이: 책 목록에서는 10 고정값.

  const { data: unsolvedQuizData, isLoading: isUnsolvedQuizDataLoading } =
    useQuery({
      queryKey: studyGroupKeys.myUnsolvedQuizList(
        id,
        parseQueryParams<StudyGroupsSortType, FetchStudyGroupsParams>({
          sort,
          direction,
          page,
          size,
        })
      ),
      queryFn: () =>
        id
          ? studyGroupService.fetchStudyGroupMyUnsolvedQuizzes(
              id,
              parseQueryParams<StudyGroupsSortType, FetchStudyGroupsParams>({
                sort,
                direction,
                page,
                size,
              })
            )
          : null,
      enabled: !!id,
    });
  const unsolvedQuiz = unsolvedQuizData?.data;
  const endPageNumber = unsolvedQuizData?.endPageNumber;

  // 마지막 페이지 번호 저장
  useEffect(() => {
    setPaginationState({
      ...paginationState,
      totalPagesLength: endPageNumber,
    });
  }, [endPageNumber]);

  const { navigateWithParams } = useNavigateWithParams(`MY/STUDY-GROUPS/${id}`);
  const [filterCriteria] = useAtom(studyGroupFilterAtom);

  const handleOptionClick = (filter: StudyGroupsFilterType) => {
    navigateWithParams({
      filter: filter,
      parentComponentType: `MY/STUDY-GROUPS/${id}`,
    });
  };

  console.log(unsolvedQuiz, isUnsolvedQuizDataLoading);
  return (
    <section className={styles.container}>
      <div className={styles["filter-container"]}>
        <h3 className={styles.title}>풀어야 할 퀴즈</h3>
        <ListFilter
          handleOptionClick={handleOptionClick}
          sortFilter={filterCriteria}
          filterOptions={filterOptions}
        />
      </div>
      <ol className={styles["quiz-list"]}>
        <QuizItem key={1} />
        <QuizItem key={2} />
        <QuizItem key={3} />
      </ol>
      {totalPagesLength ? (
        <Pagination parentComponent={`MY/STUDY-GROUPS/${id}`} />
      ) : null}
    </section>
  );
}
