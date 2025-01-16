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
import { useEffect } from "react";
import ROUTES from "@/data/routes.ts";
import { quizzesLengthAtom } from "@/store/quizAtom.ts";
import useLoginAction from "@/hooks/useLoginAction.ts";
import { quizzesFilterAtom } from "@/store/filterAtom.ts";
import { FetchQuizzesParams } from "@/types/ParamsType.ts";
import { QuizzesFilterType } from "@/types/FilterType.ts";

export default function QuizListSection({
  bookId,
  onGoToMakeQuiz,
}: {
  bookId: string;
  onGoToMakeQuiz: () => void;
}) {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const navigator = useNavigate();

  const [filterCriteria, setFilterCriteria] = useAtom(quizzesFilterAtom);
  useFilter<QuizzesFilterType>(setFilterCriteria);
  const titleWhenNoData = "아직 만들어진 퀴즈가 없어요 😔";
  const buttonNameWhenNoData = "퀴즈 만들기";
  const { handleAuthenticatedAction } = useLoginAction();
  const [, setQuizLength] = useAtom(quizzesLengthAtom);

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
      })
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
    handleAuthenticatedAction(() => navigator(ROUTES.QUIZ_DETAIL(quizId)));
  };

  if (isLoading) {
    return <div>loading</div>;
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
        (!quizzes.data?.length && (
          <NoDataSection
            title={titleWhenNoData}
            buttonName={buttonNameWhenNoData}
            onClick={() => handleAuthenticatedAction(onGoToMakeQuiz)}
          />
        ))}
      <div className={styles["list-container"]}>
        {quizzes &&
          quizzes?.data.map((quiz) => (
            <a
              key={quiz.id}
              href="#"
              onClick={() => handleGoToQuizDetail(quiz.id)}
            >
              <QuizItem key={quiz.id} quiz={quiz} />
            </a>
          ))}
      </div>
      {totalPagesLength && totalPagesLength > 0 && (
        <Pagination
          type="queryString"
          parentPage="book"
          itemId={Number(bookId)}
          paginationState={paginationState}
          setPaginationState={setPaginationState}
        />
      )}
    </section>
  );
}
