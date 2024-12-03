import { useParams } from "react-router-dom";
import styles from "./_book_detail.module.scss";
import { useQuery } from "@tanstack/react-query";
import { bookKeys } from "@/data/queryKeys.ts";
import BookDetailSection from "./composite/bookDetailSection/bookDetailSection.tsx";
import QuizListSection from "./composite/quizListSection/quizListSection.tsx";
import { bookService } from "@/services/server/bookService.ts";

export default function Index() {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: bookKeys.detail(id!),
    queryFn: () => bookService.getBook(id!),
  });

  if (isLoading) {
    return <div>loading</div>;
  }

  if (!data) {
    return <div>book detail page error!!</div>;
  }

  return (
    <section className={styles.container}>
      <BookDetailSection bookDetailContent={data} />
      <QuizListSection />
    </section>
  );
}
