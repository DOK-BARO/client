import { useQuery } from "@tanstack/react-query";
import { quizKeys } from "@/data/queryKeys";
import QuizListLayout from "../../layout/QuizListLayout/QuizListLayout";
import { quizService } from "@/services/server/quizService";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import useFilter from "@/hooks/useFilter";
import { mySolvedQuizPaginationAtom } from "@/store/paginationAtom";
import Pagination from "@/components/composite/Pagination/Pagination";
import { FilterOptionType } from "@/components/composite/ListFilter/ListFilter";
import { MyMadeQuizzesFetchType } from "@/types/ParamsType";
import { useEffect, useMemo } from "react";
import ROUTES from "@/data/routes";
import { MyDraftQuizzesFilterType } from "@/types/FilterType";
import { myDraftQuizFilterAtom } from "@/store/filterAtom";
import { isLoggedInAtom } from "@/store/userAtom";

const filterOptions: FilterOptionType<MyDraftQuizzesFilterType>[] = [
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
  useFilter<MyDraftQuizzesFilterType>(setFilterCriteria);

  const [paginationState, setPaginationState] = useAtom(
    mySolvedQuizPaginationAtom,
  );

  const totalPagesLength = paginationState.totalPagesLength;
  const params: MyMadeQuizzesFetchType = {
    page: paginationState.currentPage.toString() ?? "1",
    sort: filterCriteria.sort,
    direction: filterCriteria.direction,
    size: "6",
    temporary: true,
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

  const handleOptionClick = (filter: MyDraftQuizzesFilterType) => {
    setFilterCriteria(filter);
  };

  const myQuizzes = myQuizzesData?.data;

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
          handleOptionClick={handleOptionClick}
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
