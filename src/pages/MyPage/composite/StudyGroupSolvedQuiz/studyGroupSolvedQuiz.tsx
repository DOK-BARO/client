import { useEffect } from "react";
import styles from "../StudyGroup/_study_group.module.scss";
import {
  MyStudySolvedQuizzesFilterType,
  MyStudySolvedQuizzesSortType,
} from "@/types/FilterType";
import { parseQueryParams } from "@/utils/parseQueryParams";
import { FetchStudyGroupsParams } from "@/types/ParamsType";
import { useAtom } from "jotai";
import { mySolvedQuizPaginationAtom } from "@/store/paginationAtom";
import { myStudySolvedQuizFilterAtom } from "@/store/filterAtom";
import useFilter from "@/hooks/useFilter";
import { useQuery } from "@tanstack/react-query";
import { studyGroupKeys } from "@/data/queryKeys";
import { studyGroupService } from "@/services/server/studyGroupService";
import ListFilter, {
  FilterOptionType,
} from "@/components/composite/ListFilter/ListFilter";
import QuizItem from "../../components/QuizItem/QuizItem";
import Pagination from "@/components/composite/Pagination/Pagination";
import { NoDataSection } from "@/components/composite/NoDataSection/NoDataSection";

const filterOptions: FilterOptionType<MyStudySolvedQuizzesFilterType>[] = [
  {
    filter: {
      sort: "CREATED_AT",
      direction: "DESC",
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

interface Props {
  studyGroupId: number | undefined;
}
export default function StudyGroupSolvedQuiz({ studyGroupId }: Props) {
  const [filterCriteria, setFilterCriteria] = useAtom(
    myStudySolvedQuizFilterAtom,
  );
  useFilter<MyStudySolvedQuizzesFilterType>(setFilterCriteria);

  const [paginationState, setPaginationState] = useAtom(
    mySolvedQuizPaginationAtom,
  );

  const totalPagesLength = paginationState.totalPagesLength;

  const sort = filterCriteria.sort; // 기본값: 최신순
  const direction = filterCriteria.direction; // 기본값: ASC
  const page = paginationState.currentPage; // parseQueryParams함수 안에서 기본값 1로 설정
  const size = 4; // 한번에 불러올 최대 길이: 책 목록에서는 10 고정값.

  const { data: solvedQuizData } = useQuery({
    queryKey: studyGroupKeys.mySolvedQuizList(
      studyGroupId,
      parseQueryParams<MyStudySolvedQuizzesSortType, FetchStudyGroupsParams>({
        sort,
        direction,
        page,
        size,
      }),
    ),
    queryFn: () =>
      studyGroupId
        ? studyGroupService.fetchStudyGroupMySolvedQuizzes(
            studyGroupId,
            parseQueryParams<
              MyStudySolvedQuizzesSortType,
              FetchStudyGroupsParams
            >({
              sort,
              direction,
              page,
              size,
            }),
          )
        : null,
    enabled: !!studyGroupId,
  });
  const solvedQuizzes = solvedQuizData?.data;
  const endPageNumber = solvedQuizData?.endPageNumber;
  const isQuizzesExist = solvedQuizzes && solvedQuizzes.length > 0;

  // 마지막 페이지 번호 저장
  useEffect(() => {
    setPaginationState({
      ...paginationState,
      totalPagesLength: endPageNumber,
    });
  }, [endPageNumber]);

  const handleOptionClick = (filter: MyStudySolvedQuizzesFilterType) => {
    setPaginationState({
      ...paginationState,
      currentPage: 1,
    });
    setFilterCriteria(filter);
  };

  return (
    <section className={styles.section}>
      <div className={styles["filter-container"]}>
        <h3 className={styles.title}>제출한 퀴즈</h3>
        {isQuizzesExist ? (
          <ListFilter
            onOptionClick={handleOptionClick}
            sortFilter={filterCriteria}
            filterOptions={filterOptions}
          />
        ) : null}
      </div>
      {isQuizzesExist ? (
        <ol className={styles["quiz-list"]}>
          {solvedQuizzes?.map((quizData) => (
            <QuizItem
              key={quizData.id}
              isSolved
              quizData={quizData}
              studyGroupId={studyGroupId}
            />
          ))}
        </ol>
      ) : (
        <NoDataSection title="아직 제출한 퀴즈가 없어요 😔" />
      )}
      {totalPagesLength && isQuizzesExist ? (
        <Pagination
          type="state"
          paginationState={paginationState}
          setPaginationState={setPaginationState}
        />
      ) : null}
    </section>
  );
}
