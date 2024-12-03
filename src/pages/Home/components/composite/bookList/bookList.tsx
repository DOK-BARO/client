import { useOutletContext } from "react-router-dom";
import styles from "./_bookList.module.scss";
import BookItem from "@/pages/Home/components/composite/bookItem/bookItem.tsx";
import { BookType } from "@/types/BookType";

export default function BookList() {
  // TODO: 페이징
  const { books } = useOutletContext<{ books: BookType[] }>();
  console.log(books);

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
