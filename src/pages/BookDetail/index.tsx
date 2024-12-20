import { useParams } from "react-router-dom";
import styles from "./_book_detail.module.scss";
import { useQuery } from "@tanstack/react-query";
import { bookKeys } from "@/data/queryKeys.ts";
import BookDetailContent from "./composite/bookDetailSection/bookDetailSection.tsx";
import QuizListSection from "./composite/quizListSection/quizListSection.tsx";
import { bookService } from "@/services/server/bookService.ts";
import Breadcrumb from "@/components/composite/breadcrumb/breadcrumb.tsx";

export default function Index() {
	const { id } = useParams();

	const { data, isLoading } = useQuery({
		queryKey: bookKeys.detail(id!),
		queryFn: () => bookService.fetchBook(id!),
	});

	if (isLoading) {
		return <div>loading</div>;
	}

	if (!data) {
		return <div>book detail page error!!</div>;
	}

	return (
		<section className={styles.container}>
			<div className={styles["bread-crumb"]}>
			<Breadcrumb list={data.categories.map((e, index) => ({ id: index, name: e.name }))} />
			</div>
			<div className={styles["book-detail-section"]}>
				<BookDetailContent bookDetailContent={data} />
				<QuizListSection bookId={id ?? "0"}/>
			</div>
		</section>
	);
}
