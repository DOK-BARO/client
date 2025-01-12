import { useQuery } from "@tanstack/react-query";
import { quizKeys } from "@/data/queryKeys";
import QuizListLayout from "../../layout/QuizListLayout/QuizListLayout";
import { useNavigate } from "react-router-dom";
import { quizService } from "@/services/server/quizService";
import { useAtom } from "jotai";
import useFilter from "@/hooks/useFilter";
import { myMadeQuizPaginationAtom } from "@/store/paginationAtom";
import Pagination from "@/components/composite/Pagination/Pagination";
import { BookQuizzesFilterType } from "@/types/BookType";
import useNavigateWithParams from "@/hooks/useNavigateWithParams";
import { FilterOptionType } from "@/components/composite/ListFilter/ListFilter";
import { FetchMyQuizzesParams } from "@/types/ParamsType";
import { useEffect } from "react";

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
import ROUTES from "@/data/routes";
import { myMadeQuizzesFilterAtom } from "@/store/filterAtom";
import { MyMadeQuizzesFilterType } from "@/types/FilterType";

export default function MyMadeQuiz() {
	const navigate = useNavigate();
	const [filterCriteria, setFilterCriteria] = useAtom(quizzesFilterAtom);
	useFilter<BookQuizzesFilterType>(setFilterCriteria);

	const [paginationState, setPaginationState] = useAtom(myMadeQuizPaginationAtom);
	const totalPagesLength = paginationState.totalPagesLength;

	const params: FetchMyQuizzesParams = {
		page:  paginationState.currentPage.toString() ?? "1",
		sort:  filterCriteria.sort,
		direction:  filterCriteria.direction,
		size: "4",
	}

	const { isLoading, data: myQuizzesData } = useQuery({
		queryKey: quizKeys.myQuiz(params),
		queryFn: () => quizService.fetchMyMadeQuizzes(params),
	});

	const handleClickWhenNoData = () => {
		navigate(ROUTES.CREATE_QUIZ);
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

	const handleOptionClick = (filter: BookQuizzesFilterType) => {
		setFilterCriteria(filter);
	};


  const myQuizzes = myQuizzesData?.data;

  if (isLoading || !myQuizzes) {
    return <>로딩</>;
  }

  return (
    <div>
      <QuizListLayout
        title="내가 만든 퀴즈"
        quizzes={myQuizzes}
        titleWhenNoData="아직 내가 만든 퀴즈가 없어요. 😞"
        buttonNameWhenNoData="퀴즈 만들러 가기"
        onClickBtnWhenNoData={handleClickWhenNoData}
        handleOptionClick={handleOptionClick}
        filterCriteria={filterCriteria}
        filterOptions={filterOptions}
      />
      {totalPagesLength && totalPagesLength > 0 && (
        <Pagination
          type="queryString"
          parentPage={"my/made-quiz"}
          paginationState={paginationState}
          setPaginationState={setPaginationState}
        />
      )}
    </div>
  );
}
