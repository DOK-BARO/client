import styles from "./_quiz_list_section.module.scss";
import QuizItem from "../QuizItem/QuizItem.tsx";
import { useQuery } from "@tanstack/react-query";
import { bookKeys } from "@/data/queryKeys.ts";
import { bookService } from "@/services/server/bookService.ts";
import { useLocation } from "react-router-dom";
import { FetchQuizzesParams } from "@/types/BookType.ts";
import Pagination from "@/components/composite/Pagination/Pagination.tsx";
import { BookQuizzesFilterType } from "@/types/BookType.ts";
import { FilterOptionType } from "@/components/composite/ListFilter/ListFilter.tsx";
import { bookQuizzesFilterAtom } from "@/store/bookAtom.ts";
import { useAtom } from "jotai";
import useFilter from "@/hooks/useFilter.ts";
import useNavigateWithParams from "@/hooks/useNavigateWithParams.ts";
import ListFilter from "@/components/composite/ListFilter/ListFilter.tsx";
import { NoDataSection } from "@/components/composite/NoDataSection/NoDataSection.tsx";
import { paginationAtom } from "@/store/paginationAtom.ts";
import { useEffect } from "react";

export default function QuizListSection({
  bookId,
  handleGoToMakeQuiz,
}: {
  bookId: string;
  handleGoToMakeQuiz: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const [filterCriteria, setFilterCriteria] = useAtom(bookQuizzesFilterAtom);
  useFilter<BookQuizzesFilterType>(setFilterCriteria);
  const titleWhenNoData = "아직 만들어진 퀴즈가 없어요 😔";
  const buttonNameWhenNoData = "퀴즈 만들기";
  const onClickBtnWhenNoData = handleGoToMakeQuiz;

  const [paginationState, setPaginationState] = useAtom(paginationAtom);
  const totalPagesLength = paginationState.totalPagesLength;

  const sort = queryParams.get("sort");
  const direction = queryParams.get("direction");
  const page = queryParams.get("page");
  const pageSize = "6";

  const params: FetchQuizzesParams = {
    page: page ?? "1",
    bookId: bookId,
    sort: sort ?? "CREATED_AT",
    direction: direction ?? "DESC",
    size: pageSize,
  };

  const { data: quizzes, isLoading } = useQuery({
    queryKey: bookKeys.quizList(params),
    queryFn: () => bookService.fetchBookQuizzes(params),
  });

  const endPageNumber = quizzes?.endPageNumber;
  useEffect(() => {
    if (endPageNumber) {
      setPaginationState({
        ...paginationState,
        totalPagesLength: endPageNumber,
      });
    }
  }, [endPageNumber]);

  const { navigateWithParams } = useNavigateWithParams(
    `book/${Number(bookId)}`
  );

  const handleOptionClick = (filter: BookQuizzesFilterType) => {
    navigateWithParams({
      filter: filter,
      parentPage: `book/${Number(bookId)}`,
      itemId: parseInt(bookId),
    });
  };
  const filterOptions: FilterOptionType<BookQuizzesFilterType>[] = [
    {
      filter: {
        sort: "STAR_RATING",
        direction: "DESC",
      },
      label: "인기순",
    },
    {
      filter: {
        sort: "CREATED_AT",
        direction: "DESC",
      },
      label: "최신순",
    },
  ];

  if (isLoading) {
    return <div>loading</div>;
  }

  return (
    <section className={styles["container"]}>
      <h3 className={styles["quiz-list-header"]}>퀴즈 목록</h3>
      <div className={styles["filter-list"]}>
        <span className={styles["filter-title"]}>정렬기준</span>
        <div className={styles["filter-button-area"]}>
          <ListFilter
            handleOptionClick={handleOptionClick}
            sortFilter={filterCriteria}
            filterOptions={filterOptions}
          />
        </div>
      </div>

      {!quizzes ||
        (!quizzes.data?.length && (
          <NoDataSection
            title={titleWhenNoData}
            buttonName={buttonNameWhenNoData}
            onClick={onClickBtnWhenNoData}
          />
        ))}
      <div className={styles["list-container"]}>
        {quizzes &&
          quizzes?.data.map((quiz) => (
            <a 
						key={quiz.id}
						href={`/quiz/${quiz.id}`}>
              <QuizItem key={quiz.id} quiz={quiz} />
            </a>
          ))}
      </div>
      {totalPagesLength && totalPagesLength > 0 && (
        <Pagination
          type="queryString"
          parentPage={`book/${Number(bookId)}`}
          paginationState={paginationState}
          setPaginationState={setPaginationState}
        />
      )}
    </section>
  );
}
