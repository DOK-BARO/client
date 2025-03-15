import styles from "./_popular_quiz_book_list.module.scss";
import ROUTES from "@/data/routes";
import { bookKeys } from "@/data/queryKeys";
import { bookService } from "@/services/server/bookService";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export default function PopularQuizBookList() {
  const page = 1;
  const size = 5;
  const sort = "QUIZ_COUNT";
  const direction = "DESC";
  const { data: popularQuizBooks, isLoading } = useQuery({
    queryKey: bookKeys.list({ page, size, sort, direction }),
    queryFn: () => bookService.fetchBooks({ page, size, sort, direction }),
  });

  return !isLoading && popularQuizBooks ? (
    <ol className={styles.container}>
      {popularQuizBooks?.data.map((book) => (
        <Link
          to={ROUTES.BOOK_DETAIL_SECTION(book.id)}
          className={styles["image-container"]}
        >
          <img src={book.imageUrl} alt={book.title} width={80} />
        </Link>
      ))}
    </ol>
  ) : null;
}
