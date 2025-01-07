import { useParams } from "react-router-dom";
import styles from "./_book_detail.module.scss";
import { useQuery } from "@tanstack/react-query";
import { bookKeys } from "@/data/queryKeys.ts";
import BookDetailContent from "./composite/BookDetailSection/BookDetailSection.tsx";
import QuizListSection from "./composite/QuizListSection/QuizListSection.tsx";
import { bookService } from "@/services/server/bookService.ts";
import Breadcrumb from "@/components/composite/Breadcrumb/Breadcrumb.tsx";
import { useNavigate } from "react-router-dom";
import useUpdateQuizCreationInfo from "@/hooks/useUpdateQuizCreationInfo";
import { BookType } from "@/types/BookType";
import ROUTES from "@/data/routes.ts";

export default function Index() {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: bookKeys.detail(id!),
    queryFn: () => bookService.fetchBook(id!),
  });

  const { updateQuizCreationInfo } = useUpdateQuizCreationInfo();

  const navigate = useNavigate();
  const handleGoToMakeQuiz = () => {
    //TODO: 리팩토링
    const book: BookType = {
      id: data!.id,
      isbn: data!.isbn,
      title: data!.title,
      publisher: data!.publisher,
      publishedAt: data!.publishedAt,
      imageUrl: data!.imageUrl,
      categories: data!.categories,
      authors: data!.authors,
    };
    updateQuizCreationInfo("book", book);
    navigate(ROUTES.CREATE_QUIZ);
  };

  if (isLoading) {
    return <div>loading</div>;
  }

  if (!data) {
    return <div>book detail page error!!</div>;
  }

  return (
    <section className={styles.container}>
      <div className={styles["bread-crumb"]}>
        <Breadcrumb
          parentPage="books"
          list={data.categories.map((e, index) => ({
            id: index,
            name: e.name,
          }))}
        />
      </div>
      <div className={styles["book-detail-section"]}>
        <BookDetailContent
          bookDetailContent={data}
          onGoToMakeQuiz={handleGoToMakeQuiz}
        />
        <QuizListSection
          bookId={id ?? "0"}
          onGoToMakeQuiz={handleGoToMakeQuiz}
        />
      </div>
    </section>
  );
}
