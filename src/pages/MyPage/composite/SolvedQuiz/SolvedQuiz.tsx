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
import { FetchMyQuizzesParams } from "@/types/ParamsType";
import { useEffect } from "react";
import ROUTES from "@/data/routes";
import { MySolvedQuizzesFilterType } from "@/types/FilterType";
import { mySolvedQuizFilterAtom } from "@/store/filterAtom";

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
  const [filterCriteria, setFilterCriteria] = useAtom(mySolvedQuizFilterAtom);
  useFilter<MySolvedQuizzesFilterType>(setFilterCriteria);

  const [paginationState, setPaginationState] = useAtom(
    mySolvedQuizPaginationAtom,
  );

  const totalPagesLength = paginationState.totalPagesLength;
  const params: FetchMyQuizzesParams = {
    page: paginationState.currentPage.toString() ?? "1",
    sort: filterCriteria.sort,
    direction: filterCriteria.direction,
    size: "4",
  };

  const { isLoading, data: myQuizzesData } = useQuery({
    queryKey: quizKeys.solvedQuiz(params),
    queryFn: async () => await quizService.fetchMySolvedQuizzes(params),
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

  const handleOptionClick = (filter: MySolvedQuizzesFilterType) => {
    setFilterCriteria(filter);
  };

  const myQuizzes = myQuizzesData?.data;
  console.log(myQuizzes);

  return (
    !isLoading &&
    myQuizzes && (
      <div>
        <QuizListLayout
          title="푼 퀴즈"
          quizzes={myQuizzes}
          titleWhenNoData="아직 내가 푼 퀴즈가 없어요. 😞"
          buttonNameWhenNoData="퀴즈 풀러 가기"
          onClickBtnWhenNoData={handleClickWhenNoData}
          handleOptionClick={handleOptionClick}
          filterCriteria={filterCriteria}
          filterOptions={filterOptions}
        />
        {totalPagesLength && totalPagesLength > 0 && (
          <Pagination
            type="queryString"
            parentPage="my/solved-quiz"
            paginationState={paginationState}
            setPaginationState={setPaginationState}
          />
        )}
      </div>
    )
  );
}
