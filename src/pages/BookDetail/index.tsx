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
import { extractCategoryList } from "@/utils/extractCategoryList.ts";
import ROUTES from "@/data/routes.ts";
import { useEffect } from "react";

export default function Index() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: bookKeys.detail(id!),
    queryFn: () => bookService.fetchBook(id!),
  });
  // useEffect(() => {
  //   return () => {
  //     sessionStorage.removeItem("prevPage");
  //   };
  // }, []);

  const { updateQuizCreationInfo } = useUpdateQuizCreationInfo();

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
  const categoryList = data.categories
    ? extractCategoryList(data.categories[0])
    : [];
  return (
    <section className={styles.container}>
      <Breadcrumb parentPage="books" list={categoryList} />

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
