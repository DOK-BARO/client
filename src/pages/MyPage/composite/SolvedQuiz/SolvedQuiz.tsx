import { useQuery } from "@tanstack/react-query";
import { quizKeys } from "@/data/queryKeys";
import QuizListLayout from "../../layout/QuizListLayout/QuizListLayout";
import { quizService } from "@/services/server/quizService";
import { useLocation, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import useFilter from "@/hooks/useFilter";
import { paginationAtom } from "@/store/paginationAtom";
import Pagination from "@/components/composite/Pagination/Pagination";
import { FilterOptionType } from "@/components/composite/ListFilter/ListFilter";
import { MySolvedQuizzesFetchType } from "@/types/ParamsType";
import { useEffect, useMemo } from "react";
import ROUTES from "@/data/routes";
import {
  MySolvedQuizzesFilterType,
  MySolvedQuizzesSortType,
} from "@/types/FilterType";
import { mySolvedQuizFilterAtom } from "@/store/filterAtom";
import { isLoggedInAtom } from "@/store/userAtom";
import { parseQueryParams } from "@/utils/parseQueryParams";

const filterOptions: FilterOptionType<MySolvedQuizzesFilterType>[] = [
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

export default function SolvedQuiz() {
  const navigate = useNavigate();
  const [isLoggedIn] = useAtom(isLoggedInAtom);
  const [filterCriteria, setFilterCriteria] = useAtom(mySolvedQuizFilterAtom);
  const { onOptionClick } = useFilter<MySolvedQuizzesFilterType>({
    type: "queryString",
    parentPage: "my/solved-quiz",
    setFilterCriteria,
  });
  const [paginationState, setPaginationState] = useAtom(paginationAtom);
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const totalPagesLength = paginationState.totalPagesLength;
  // const params: MySolvedQuizzesFetchType = {
  //   page: paginationState.currentPage.toString() ?? "1",
  //   sort: filterCriteria.sort,
  //   direction: filterCriteria.direction,
  //   size: "6",
  // };

  const sort = queryParams.get("sort") || "CREATED_AT";
  const direction = queryParams.get("direction") || "DESC";
  const page = queryParams.get("page") || undefined;
  const size = 6;

  const { isLoading, data: myQuizzesData } = useQuery({
    queryKey: quizKeys.solvedQuiz(
      parseQueryParams<MySolvedQuizzesSortType, MySolvedQuizzesFetchType>({
        sort,
        direction,
        page,
        size,
      }),
    ),
    queryFn: async () =>
      await quizService.fetchMySolvedQuizzes(
        parseQueryParams({
          sort,
          direction,
          page,
          size,
        }),
      ),
    enabled: isLoggedIn,
  });

  const handleClickWhenNoData = () => {
    navigate(ROUTES.CREATE_QUIZ());
  };

  const endPageNumber = myQuizzesData?.endPageNumber;
  useEffect(() => {
    if (endPageNumber) {
      setPaginationState({
        ...paginationState,
        totalPagesLength: endPageNumber,
      });
    }
  }, [endPageNumber]);

  const myQuizzes = myQuizzesData?.data;

  const shouldRenderDataList = !isLoading && myQuizzes;
  const shouldRenderPagination = useMemo(() => {
    return (totalPagesLength ?? 0) > 0;
  }, [totalPagesLength]);

  return (
    shouldRenderDataList && (
      <>
        <QuizListLayout
          title="푼 퀴즈"
          quizzes={myQuizzes}
          titleWhenNoData="아직 내가 푼 퀴즈가 없어요. 😞"
          buttonNameWhenNoData="퀴즈 풀러 가기"
          onClickBtnWhenNoData={handleClickWhenNoData}
          handleOptionClick={onOptionClick}
          filterCriteria={filterCriteria}
          filterOptions={filterOptions}
          quizListType="solved"
        />
        {shouldRenderPagination ? (
          <Pagination
            type="queryString"
            parentPage="my/solved-quiz"
            paginationState={paginationState}
            setPaginationState={setPaginationState}
          />
        ) : null}
      </>
    )
  );
}
