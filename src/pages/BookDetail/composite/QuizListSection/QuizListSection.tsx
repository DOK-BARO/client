import styles from "./_quiz_list_section.module.scss";
import QuizItem from "../QuizItem/QuizItem.tsx";
import { useQuery } from "@tanstack/react-query";
import { bookKeys } from "@/data/queryKeys.ts";
import { bookService } from "@/services/server/bookService.ts";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "@/components/composite/Pagination/Pagination.tsx";
import { FilterOptionType } from "@/components/composite/ListFilter/ListFilter.tsx";
import { useAtom } from "jotai";
import useFilter from "@/hooks/useFilter.ts";
import useNavigateWithParams from "@/hooks/useNavigateWithParams.ts";
import ListFilter from "@/components/composite/ListFilter/ListFilter.tsx";
import { NoDataSection } from "@/components/composite/NoDataSection/NoDataSection.tsx";
import { paginationAtom } from "@/store/paginationAtom.ts";
import { useEffect, useMemo } from "react";
import ROUTES from "@/data/routes.ts";
import { quizzesLengthAtom } from "@/store/quizAtom.ts";
import useLoginAction from "@/hooks/useLoginAction.ts";
import { quizzesFilterAtom } from "@/store/filterAtom.ts";
import { QuizzesFetchType } from "@/types/ParamsType.ts";
import { QuizzesFilterType } from "@/types/FilterType.ts";
import LoadingSpinner from "@/components/atom/LoadingSpinner/LoadingSpinner.tsx";
interface Props {
  bookId: string;
}
export default function QuizListSection({ bookId }: Props) {
  const { search, pathname } = useLocation();
  const queryParams = new URLSearchParams(search);
  const navigate = useNavigate();

  const [filterCriteria, setFilterCriteria] = useAtom(quizzesFilterAtom);
  useFilter<QuizzesFilterType>(setFilterCriteria);
  const titleWhenNoData = "아직 만들어진 퀴즈가 없어요 😔";
  const { handleAuthenticatedAction } = useLoginAction(pathname);
  const [, setQuizLength] = useAtom(quizzesLengthAtom);

  const [paginationState, setPaginationState] = useAtom(paginationAtom);
  const totalPagesLength = paginationState.totalPagesLength;

  const sort = queryParams.get("sort");
  const direction = queryParams.get("direction");
  const page = queryParams.get("page");
  const pageSize = "6";

  const params: QuizzesFetchType = {
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

  useEffect(() => {
    setQuizLength(quizzes?.data.length ?? 0);
  }, [quizzes?.data.length]);

  const endPageNumber = quizzes?.endPageNumber;
  useEffect(() => {
    if (endPageNumber) {
      setPaginationState({
        ...paginationState,
        totalPagesLength: endPageNumber,
      });
    }
  }, [endPageNumber]);

  const { navigateWithParams } = useNavigateWithParams("book");
  const handleOptionClick = (filter: QuizzesFilterType) => {
    handleAuthenticatedAction(() =>
      navigateWithParams({
        filter: filter,
        parentPage: "book",
        itemId: Number(bookId),
        excludeParams: ["page"],
      }),
    );
  };
  const filterOptions: FilterOptionType<QuizzesFilterType>[] = [
    {
      filter: {
        sort: "STAR_RATING",
        direction: "DESC",
      },
      label: "별점순",
    },
    {
      filter: {
        sort: "CREATED_AT",
        direction: "DESC",
      },
      label: "최신순",
    },
  ];

  const handleGoToQuizDetail = (quizId: number) => {
    handleAuthenticatedAction(() => navigate(ROUTES.QUIZ_DETAIL(quizId)));
  };
  const shouldRenderPagination = useMemo(() => {
    return (totalPagesLength ?? 0) > 0;
  }, [totalPagesLength]);

  if (isLoading) {
    return <LoadingSpinner width={40} pageCenter />;
  }

  return (
    <section className={styles["container"]}>
      <h3 className={styles["quiz-list-header"]}>퀴즈 목록</h3>
      <div className={styles["filter-list"]}>
        <div className={styles["filter-button-area"]}>
          <ListFilter
            onOptionClick={handleOptionClick}
            sortFilter={filterCriteria}
            filterOptions={filterOptions}
          />
        </div>
      </div>

      {!quizzes ||
        (!quizzes.data?.length && <NoDataSection title={titleWhenNoData} />)}
      <div className={styles["list-container"]}>
        {quizzes &&
          quizzes?.data.map((quiz) => (
            <QuizItem
              key={quiz.id}
              quiz={quiz}
              onClick={() => handleGoToQuizDetail(quiz.id)}
            />
          ))}
      </div>
      {shouldRenderPagination ? (
        <Pagination
          type="queryString"
          parentPage="book"
          itemId={Number(bookId)}
          paginationState={paginationState}
          setPaginationState={setPaginationState}
        />
      ) : null}
    </section>
  );
}
