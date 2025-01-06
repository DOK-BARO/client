import { useQuery } from "@tanstack/react-query";
import { quizKeys } from "@/data/queryKeys";
import QuizListLayout from "../../layout/QuizListLayout/QuizListLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { quizService } from "@/services/server/quizService";
import { quizzesFilterAtom } from "@/store/quizAtom";
import { useAtom } from "jotai";
import useFilter from "@/hooks/useFilter";
import { paginationAtom } from "@/store/paginationAtom";
import Pagination from "@/components/composite/Pagination/Pagination";
import { BookQuizzesFilterType } from "@/types/BookType";
import useNavigateWithParams from "@/hooks/useNavigateWithParams";
import { FilterOptionType } from "@/components/composite/ListFilter/ListFilter";
import { FetchMyMadeQuizzesParams } from "@/types/ParamsType";
import { useEffect } from "react";

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

export default function MyMadeQuiz() {
	const { search } = useLocation();
	const queryParams = new URLSearchParams(search);
	const [paginationState, setPaginationState] = useAtom(paginationAtom);

	const [filterCriteria, setFilterCriteria] = useAtom(quizzesFilterAtom);
	useFilter<BookQuizzesFilterType>(setFilterCriteria);
	const { navigateWithParams } = useNavigateWithParams(
		"my/made-quiz"
	);

	const totalPagesLength = paginationState.totalPagesLength;

	const params: FetchMyMadeQuizzesParams = {
		page: queryParams.get("page") ?? "1",
		sort: queryParams.get("sort") ?? "CREATED_AT",
		direction: queryParams.get("direction") ?? "DESC",
		size: "4",
	};

	const { isLoading, data: myQuizzesData } = useQuery({
		queryKey: quizKeys.myQuiz(params),
		queryFn: async () => await quizService.fetchMyMadeQuizzes(params),
	});

	const navigate = useNavigate();
	const handleClickWhenNoData = () => {
		navigate("/create-quiz");
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
		navigateWithParams({
			filter: filter,
			parentPage: "my/made-quiz",
		});
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
