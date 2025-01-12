import { useEffect } from "react";
import styles from "../StudyGroup/_study_group.module.scss";
import { parseQueryParams } from "@/utils/parseQueryParams";
import { FetchStudyGroupsParams } from "@/types/ParamsType";
import { useAtom } from "jotai";
import { myStudyUnsolvedQuizPaginationAtom } from "@/store/paginationAtom";
import { myStudyUnsolvedQuizFilterAtom } from "@/store/filterAtom";
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
import {
  MyStudyUnSolvedQuizzesFilterType,
  MyStudyUnSolvedQuizzesSortType,
} from "@/types/FilterType";

const filterOptions: FilterOptionType<MyStudyUnSolvedQuizzesFilterType>[] = [
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

interface Prop {
  studyGroupId: number | undefined;
}
export default function StudyGroupUnsolvedQuiz({ studyGroupId }: Prop) {
  const [filterCriteria, setFilterCriteria] = useAtom(
    myStudyUnsolvedQuizFilterAtom
  );
  useFilter<MyStudyUnSolvedQuizzesFilterType>(setFilterCriteria);

  const [paginationState, setPaginationState] = useAtom(
    myStudyUnsolvedQuizPaginationAtom
  );

  const totalPagesLength = paginationState.totalPagesLength;

  const sort = filterCriteria.sort; // 기본값: 최신순
  const direction = filterCriteria.direction; // 기본값: ASC
  const page = paginationState.currentPage; // parseQueryParams함수 안에서 기본값 1로 설정
  const size = 4; // 한번에 불러올 최대 길이: 책 목록에서는 10 고정값.

  const { data: unsolvedQuizData } = useQuery({
    queryKey: studyGroupKeys.myUnsolvedQuizList(
      studyGroupId,
      parseQueryParams<MyStudyUnSolvedQuizzesSortType, FetchStudyGroupsParams>({
        sort,
        direction,
        page,
        size,
      })
    ),
    queryFn: () =>
      studyGroupId
        ? studyGroupService.fetchStudyGroupMyUnsolvedQuizzes(
            studyGroupId,
            parseQueryParams<
              MyStudyUnSolvedQuizzesSortType,
              FetchStudyGroupsParams
            >({
              sort,
              direction,
              page,
              size,
            })
          )
        : null,
    enabled: !!studyGroupId,
  });
  const unsolvedQuizzes = unsolvedQuizData?.data;
  const endPageNumber = unsolvedQuizData?.endPageNumber;
  console.log(unsolvedQuizzes);

  // 마지막 페이지 번호 저장
  useEffect(() => {
    setPaginationState({
      ...paginationState,
      totalPagesLength: endPageNumber,
    });
  }, [endPageNumber]);

  const handleOptionClick = (filter: MyStudyUnSolvedQuizzesFilterType) => {
    setFilterCriteria(filter);
  };

  const isQuizzesExist = unsolvedQuizzes && unsolvedQuizzes.length > 0;
  return (
    <section>
      <div className={styles["filter-container"]}>
        <h3 className={styles.title}>풀어야 할 퀴즈</h3>
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
          {unsolvedQuizzes.map((quizData) => (
            <QuizItem
              key={quizData.quiz.id}
              isSolved={false}
              quizData={quizData}
              studyGroupId={studyGroupId}
            />
          ))}
        </ol>
      ) : (
        <NoDataSection
          title="아직 풀어야 할 퀴즈가 없어요 😔"
          buttonName="퀴즈 만들기"
          // TODO:
          onClick={() => {}}
        />
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
