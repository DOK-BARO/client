import styles from "./_bookList.module.scss";
import { useQuery } from "@tanstack/react-query";
import { bookKeys } from "@/data/queryKeys.ts";
import { getBookList } from "@/services/server/bookService.ts";
import BookItem from "@/pages/Home/components/composite/bookItem/bookItem.tsx";
// import { BookType } from "../../../../types/BookType";

export default function BookList() {
  // TODO: 페이징
  const { data, isLoading } = useQuery({
    queryKey: bookKeys.list(),
    queryFn: () => getBookList(),
  });

  const bookList = data?.data;
  const endPageNumber = data?.endPageNumber;
  console.log("endPageNumber", endPageNumber);

  if (isLoading) {
    return <div>loading</div>;
  }
  if (!bookList) {
    return <div>book list page error!!</div>;
  }

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
