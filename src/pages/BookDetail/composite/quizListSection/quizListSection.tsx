import styles from "./_quiz_list_section.module.scss";
import QuizItem from "../quizItem/quizItem.tsx";
import { useQuery } from "@tanstack/react-query";
import { bookKeys } from "@/data/queryKeys.ts";
import { bookService } from "@/services/server/bookService.ts";
import { useLocation } from "react-router-dom";
import { FetchQuizzesParams } from "@/types/BookType.ts";
import Pagination from "@/components/composite/pagination/pagination.tsx";
import useNavigateWithParams from "@/hooks/useNavigateWithParams.ts";
import { BookQuizzesFilterType } from "@/types/BookType.ts";
import { FilterOptionType } from "@/components/composite/listFilter/listFilter.tsx";
import { bookQuizzesFilterAtom } from "@/store/bookAtom.ts";
import { useAtom } from "jotai";
import useFilter from "@/hooks/useBookFilter.ts";
import ListFilter from "@/components/composite/listFilter/listFilter.tsx";
import { NoDataSection } from "@/components/composite/noDataSection/noDataSection.tsx";
import { paginationAtom } from "@/store/paginationAtom.ts";
import { useEffect } from "react";

export default function QuizListSection({ bookId, handleGoToMakeQuiz }: {
	bookId: string,
	handleGoToMakeQuiz: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
	const { search } = useLocation();
	const queryParams = new URLSearchParams(search);
	const { navigateWithParams } = useNavigateWithParams();
	const [filterCriteria, setFilterCriteria] = useAtom(bookQuizzesFilterAtom);
	useFilter<BookQuizzesFilterType>(setFilterCriteria);
	const titleWhenNoData = "아직 만들어진 퀴즈가 없어요 😔"
	const buttonNameWhenNoData = "퀴즈 만들기"
	const onClickBtnWhenNoData = handleGoToMakeQuiz;

	const [paginationState, setPaginationState] = useAtom(paginationAtom);

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

	const handleOptionClick = (filter: BookQuizzesFilterType) => {
		navigateWithParams({
			filter: filter, parentComponentType: "BOOK",
			itemId: parseInt(bookId),
		});
	}
	const filterOptions: FilterOptionType<BookQuizzesFilterType>[] = [
		{
			filter: {
				sort: "STAR_RATING",
				direction: "DESC",
			},
			label: "인기순",
		},
		{
			filter: {
				sort: "CREATED_AT",
				direction: "DESC",
			},
			label: "최신순",
		},
	];

	const endPageNumber = quizzes?.endPageNumber;
	// 마지막 페이지 번호 저장
	useEffect(() => {
		setPaginationState({
			...paginationState,
			totalPagesLength: endPageNumber,
		});
	}, [endPageNumber]);

	if (isLoading) {
		return (<div>
			loading
		</div>);
	}

	return (
		<section className={styles["container"]}>
			<h3 className={styles["quiz-list-header"]}>퀴즈 목록</h3>
			<div className={styles["filter-list"]}>
				<span className={styles["filter-title"]}>정렬기준</span>
				<div className={styles["filter-button-area"]}>
					<ListFilter
						handleOptionClick={handleOptionClick}
						sortFilter={filterCriteria}
						filterOptions={filterOptions}
					/>
				</div>
			</div>

			{!quizzes || !quizzes.data?.length &&
				<NoDataSection
					title={titleWhenNoData}
					buttonName={buttonNameWhenNoData}
					onClick={onClickBtnWhenNoData}
				/>}
			<div className={styles["list-container"]}>
				{quizzes && quizzes?.data.map((quiz) => <QuizItem quiz={quiz} />)}
			</div>
			<Pagination path={`/book/${bookId}`} />
		</section>
	);
}
