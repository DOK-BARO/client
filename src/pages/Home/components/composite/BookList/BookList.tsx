import { useOutletContext } from "react-router-dom";
import styles from "./_bookList.module.scss";
import BookItem from "@/pages/Home/components/composite/BookItem/BookItem";
import { BookType } from "@/types/BookType";

export default function BookList() {
  // TODO: 페이징
  const { books } = useOutletContext<{ books: BookType[] }>();

  if (!books) {
    return <div>book list page error!!</div>;
  }

  return (
    <ul className={styles["book-list-container"]}>
      {books?.map((book) => (
        <li key={book.id}>
          <BookItem book={book} />
        </li>
      ))}
    </ul>
  );
}
