import styles from "../../../../styles/composite/_bookList.module.scss";
import { getBookList } from "../../../../services/server/bookService.ts";
// import { BookType } from "../../../../types/BookType";
import BookItem from "./bookItem";
import { useQuery } from "@tanstack/react-query";
import { bookKeys } from "../../../../data/queryKeys";

export default function BookList() {
  const { data: bookList, isLoading } = useQuery({
    queryKey: bookKeys.list(),
    queryFn: () => getBookList(),
  });

  if (isLoading) {
    return <div>loading</div>;
  }
  if (!bookList) {
    return <div>book list page error!!</div>;
  }
  console.log(bookList);

  return (
    <section className={styles[""]}>
      <h2 className={styles["sr-only"]}>책 목록</h2>
      <ul className={styles["book-list-container"]}>
        {bookList?.map((book) => (
          <li key={book.id}>
            <BookItem book={book} />
          </li>
        ))}
      </ul>
    </section>
  );
}
