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
import { MyMadeQuizzesFetchType } from "@/types/ParamsType";
import { useEffect, useMemo } from "react";
import ROUTES from "@/data/routes";

import { myDraftQuizFilterAtom } from "@/store/filterAtom";
import { isLoggedInAtom } from "@/store/userAtom";
import { parseQueryParams } from "@/utils/parseQueryParams";
import {
  MyMadeQuizzesFilterType,
  MyMadeQuizzesSortType,
} from "@/types/FilterType";

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

export default function DraftQuiz() {
  const navigate = useNavigate();
  const [isLoggedIn] = useAtom(isLoggedInAtom);

  const [filterCriteria, setFilterCriteria] = useAtom(myDraftQuizFilterAtom);
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const [paginationState, setPaginationState] = useAtom(paginationAtom);

  const { onOptionClick } = useFilter<MyMadeQuizzesFilterType>({
    type: "queryString",
    parentPage: "my/draft-quiz",
    setFilterCriteria,
  });

  const sort = queryParams.get("sort") || "CREATED_AT";
  const direction = queryParams.get("direction") || "DESC";
  const page = queryParams.get("page") || undefined;
  const size = 6;
  const temporary = true;

  const { isLoading, data: myQuizzesData } = useQuery({
    queryKey: quizKeys.myQuiz(
      parseQueryParams<MyMadeQuizzesSortType, MyMadeQuizzesFetchType>({
        sort,
        direction,
        page,
        size,
        temporary,
      }),
    ),
    queryFn: () =>
      quizService.fetchMyMadeQuizzes(
        parseQueryParams({
          sort,
          direction,
          page,
          size,
          temporary,
        }),
      ),
    enabled: isLoggedIn,
  });

  const handleClickWhenNoData = () => {
    navigate(ROUTES.CREATE_QUIZ());
  };

  const myQuizzes = myQuizzesData?.data;
  const endPageNumber = myQuizzesData?.endPageNumber;
  const totalPagesLength = paginationState.totalPagesLength;

  useEffect(() => {
    if (endPageNumber && totalPagesLength !== endPageNumber) {
      setPaginationState((prev) => ({
        ...prev,
        totalPagesLength: endPageNumber,
        pagePosition: "START",
      }));
    }
  }, [endPageNumber]);

  const shouldRenderDataList = !isLoading && myQuizzes;
  const shouldRenderPagination = useMemo(() => {
    return (totalPagesLength ?? 0) > 0;
  }, [totalPagesLength]);

  return (
    shouldRenderDataList && (
      <>
        <QuizListLayout
          title="작성 중인 퀴즈"
          quizzes={myQuizzes}
          titleWhenNoData="아직 작성 중인 퀴즈가 없어요. 😞"
          buttonNameWhenNoData="퀴즈 만들러 가기"
          onClickBtnWhenNoData={handleClickWhenNoData}
          handleOptionClick={onOptionClick}
          filterCriteria={filterCriteria}
          filterOptions={filterOptions}
          quizListType="draft"
        />
        {shouldRenderPagination ? (
          <Pagination
            type="queryString"
            parentPage="my/draft-quiz"
            paginationState={paginationState}
            setPaginationState={setPaginationState}
          />
        ) : null}
      </>
    )
  );
}
