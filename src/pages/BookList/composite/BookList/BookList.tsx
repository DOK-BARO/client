import { useNavigate } from "react-router-dom";
import styles from "./_bookList.module.scss";
import BookItem from "@/pages/BookList/composite/BookItem/BookItem";
import { BookType } from "@/types/BookType";

import ROUTES from "@/data/routes";

interface Props {
  books: BookType[];
}
export default function BookList({ books }: Props) {
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(ROUTES.BOOK_DETAIL_SECTION(id));
  };

  if (!books) {
    return <div>책 데이터가 존재하지 않습니다.</div>;
  }
  return (
    <ol className={styles["book-list-container"]}>
      {books?.map((book) => (
        <li key={book.id} onClick={() => handleClick(book.id)}>
          <BookItem book={book} />
        </li>
      ))}
    </ol>
  );
}
