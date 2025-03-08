import { useQuery } from "@tanstack/react-query";
import { quizKeys } from "@/data/queryKeys";
import QuizListLayout from "../../layout/QuizListLayout/QuizListLayout";
import { useNavigate } from "react-router-dom";
import { quizService } from "@/services/server/quizService";
import { useAtom } from "jotai";
import useFilter from "@/hooks/useFilter";
import { myMadeQuizPaginationAtom } from "@/store/paginationAtom";
import Pagination from "@/components/composite/Pagination/Pagination";
import { FilterOptionType } from "@/components/composite/ListFilter/ListFilter";
import { MyMadeQuizzesFetchType } from "@/types/ParamsType";
import { useEffect, useMemo } from "react";
import ROUTES from "@/data/routes";
import { MyMadeQuizzesFilterType } from "@/types/FilterType";
import { myMadeQuizzesFilterAtom } from "@/store/filterAtom";
import { isLoggedInAtom } from "@/store/userAtom";
import LoadingSpinner from "@/components/atom/LoadingSpinner/LoadingSpinner";

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
  useFilter<MyMadeQuizzesFilterType>(setFilterCriteria);

  const [paginationState, setPaginationState] = useAtom(
    myMadeQuizPaginationAtom,
  );
  const totalPagesLength = paginationState.totalPagesLength;

  const params: MyMadeQuizzesFetchType = {
    page: paginationState.currentPage.toString() ?? "1",
    sort: filterCriteria.sort,
    direction: filterCriteria.direction,
    size: "6",
  };

  const { isLoading, data: myQuizzesData } = useQuery({
    queryKey: quizKeys.myQuiz(params),
    queryFn: () => quizService.fetchMyMadeQuizzes(params),
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

  const handleOptionClick = (filter: MyMadeQuizzesFilterType) => {
    setFilterCriteria(filter);
  };

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
        handleOptionClick={handleOptionClick}
        filterCriteria={filterCriteria}
        filterOptions={filterOptions}
        quizListType="made"
      />
      {shouldRenderPagination ? (
        <Pagination
          type="queryString"
          parentPage={"my/made-quiz"}
          paginationState={paginationState}
          setPaginationState={setPaginationState}
        />
      ) : null}
    </>
  );
}
