import styles from "./_quiz_list_section.module.scss";
import QuizItem from "../quizItem/quizItem.tsx";
import Button from "@/components/atom/button/button.tsx";
import { useQuery } from "@tanstack/react-query";
import { bookKeys } from "@/data/queryKeys.ts";
import { bookService } from "@/services/server/bookService.ts";
import { useLocation } from "react-router-dom";
import { FetchQuizzesParams } from "@/types/BookType.ts";

export default function QuizListSection({ bookId }: { bookId: string }) {
	const { search } = useLocation();
	const queryParams = new URLSearchParams(search);

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
	}

	const { data: quizzes, isLoading } = useQuery({
		queryKey: bookKeys.quizList(params),
		queryFn: () => bookService.fetchBookQuizzes(params),
	});

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
					<Button
						className={styles["filter-button"]}
						size="xsmall" color="transparent">인기순</Button>
					<Button
						className={styles["filter-button"]}
						size="xsmall" color="transparent">최신순</Button>
				</div>
			</div>

			<div className={styles["list-container"]}>
				{quizzes && quizzes?.data.map((quiz) => <QuizItem quiz={quiz} />)}
			</div>
		</section>
	);
}
