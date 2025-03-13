import { useQuery } from "@tanstack/react-query";
import { quizKeys } from "@/data/queryKeys";
import QuizListLayout from "../../layout/QuizListLayout/QuizListLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { quizService } from "@/services/server/quizService";
import { useAtom } from "jotai";
import useFilter from "@/hooks/useFilter";
import Pagination from "@/components/composite/Pagination/Pagination";
import { FilterOptionType } from "@/components/composite/ListFilter/ListFilter";
import { MyMadeQuizzesFetchType } from "@/types/ParamsType";
import { useEffect, useMemo } from "react";
import ROUTES from "@/data/routes";
import {
  MyMadeQuizzesFilterType,
  MyMadeQuizzesSortType,
} from "@/types/FilterType";
import { myMadeQuizzesFilterAtom } from "@/store/filterAtom";
import { isLoggedInAtom } from "@/store/userAtom";
import LoadingSpinner from "@/components/atom/LoadingSpinner/LoadingSpinner";
import { paginationAtom } from "@/store/paginationAtom";
import { parseQueryParams } from "@/utils/parseQueryParams";

const filterOptions: FilterOptionType<MyMadeQuizzesFilterType>[] = [
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

export default function MyMadeQuiz() {
  const navigate = useNavigate();
  const [isLoggedIn] = useAtom(isLoggedInAtom);
  const [filterCriteria, setFilterCriteria] = useAtom(myMadeQuizzesFilterAtom);
  const { onOptionClick } = useFilter<MyMadeQuizzesFilterType>({
    type: "queryString",
    parentPage: "my/made-quiz",
    setFilterCriteria,
  });
  const [paginationState, setPaginationState] = useAtom(paginationAtom);
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const totalPagesLength = paginationState.totalPagesLength;

  const sort = queryParams.get("sort") || "CREATED_AT";
  const direction = queryParams.get("direction") || "DESC";
  const page = queryParams.get("page") || undefined;
  const size = 6;

  const { isLoading, data: myQuizzesData } = useQuery({
    queryKey: quizKeys.myQuiz(
      parseQueryParams<MyMadeQuizzesSortType, MyMadeQuizzesFetchType>({
        sort,
        direction,
        page,
        size,
      }),
    ),
    queryFn: () =>
      quizService.fetchMyMadeQuizzes(
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
    if (endPageNumber && totalPagesLength !== endPageNumber) {
      setPaginationState((prev) => ({
        ...prev,
        totalPagesLength: endPageNumber,
      }));
    }
  }, [endPageNumber]);

  const myQuizzes = myQuizzesData?.data;

  const shouldRenderPagination = useMemo(() => {
    return (totalPagesLength ?? 0) > 0;
  }, [totalPagesLength]);

  if (isLoading || !myQuizzes) {
    return <LoadingSpinner pageCenter width={40} />;
  }

  return (
    <>
      <QuizListLayout
        title="만든 퀴즈"
        quizzes={myQuizzes}
        titleWhenNoData="아직 내가 만든 퀴즈가 없어요. 😞"
        buttonNameWhenNoData="퀴즈 만들러 가기"
        onClickBtnWhenNoData={handleClickWhenNoData}
        handleOptionClick={onOptionClick}
        filterCriteria={filterCriteria}
        filterOptions={filterOptions}
        quizListType="made"
      />
      {shouldRenderPagination ? (
        <Pagination
          type="queryString"
          parentPage="my/made-quiz"
          paginationState={paginationState}
          setPaginationState={setPaginationState}
        />
      ) : null}
    </>
  );
}
