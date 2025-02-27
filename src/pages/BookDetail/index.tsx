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
import LoadingSpinner from "@/components/atom/LoadingSpinner/LoadingSpinner.tsx";

export default function Index() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: bookKeys.detail(parseInt(id!)),
    queryFn: () => bookService.fetchBook(parseInt(id!)),
  });

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
    navigate(ROUTES.CREATE_QUIZ());
  };

  if (isLoading) {
    return <LoadingSpinner className={styles["loading-spinner"]} width={40} />;
  }

  if (!data) {
    return <div>책 데이터가 존재하지 않습니다.</div>;
  }

  const categoryList = data.categories
    ? extractCategoryList(data.categories[data.categories.length - 1])
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
          // onGoToMakeQuiz={handleGoToMakeQuiz}
        />
      </div>
    </section>
  );
}
