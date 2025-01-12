import { useQuery } from "@tanstack/react-query";
import { quizKeys } from "@/data/queryKeys";
import QuizListLayout from "../../layout/QuizListLayout/QuizListLayout";
import { quizService } from "@/services/server/quizService";
import { useNavigate } from "react-router-dom";
import { quizzesFilterAtom } from "@/store/quizAtom";
import { useAtom } from "jotai";
import useFilter from "@/hooks/useFilter";
import { solvedQuizPaginationAtom } from "@/store/paginationAtom";
import Pagination from "@/components/composite/Pagination/Pagination";
import { BookQuizzesFilterType } from "@/types/BookType";
import { FilterOptionType } from "@/components/composite/ListFilter/ListFilter";
import { FetchMyQuizzesParams } from "@/types/ParamsType";
import { useEffect } from "react";
import ROUTES from "@/data/routes";

const filterOptions: FilterOptionType<BookQuizzesFilterType>[] = [
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
	const [filterCriteria, setFilterCriteria] = useAtom(quizzesFilterAtom);
	useFilter<BookQuizzesFilterType>(setFilterCriteria);

	const [paginationState, setPaginationState] = useAtom(solvedQuizPaginationAtom);

	const totalPagesLength = paginationState.totalPagesLength;
	const params: FetchMyQuizzesParams = {
		page: paginationState.currentPage.toString() ?? "1",
		sort: filterCriteria.sort,
		direction: filterCriteria.direction,
		size: "4",
	}
  const navigate = useNavigate();
  const handleClickWhenNoData = () => {
    navigate("/create-quiz");
  };

	const handleClickWhenNoData = () => {
		navigate(ROUTES.CREATE_QUIZ);
	};

  const handleOptionClick = (filter: BookQuizzesFilterType) => {
    navigateWithParams({
      filter: filter,
      parentPage: "my/solved-quiz",
    });
  };

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
				title="내가 푼 퀴즈"
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
					parentPage={"my/solved-quiz"}
					paginationState={paginationState}
					setPaginationState={setPaginationState}
				/>
			)}
		</div>

	);


  return (
    <div>
      <QuizListLayout
        title="내가 푼 퀴즈"
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
          parentPage={"my/solved-quiz"}
          paginationState={paginationState}
          setPaginationState={setPaginationState}
        />
      )}
    </div>
  );
}
