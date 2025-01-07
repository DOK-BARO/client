import styles from "./_bookItem.module.scss";
import { useNavigate } from "react-router-dom";
import { BookType } from "@/types/BookType.ts";
import pencil from "/assets/svg/bookList/pencil.svg";
import ROUTES from "@/data/routes";

export default function BookItem({ book }: { book: BookType }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(ROUTES.BOOK_DETAIL_SECTION(book.id));
  };
  const bookAuthor =
    book.authors.length > 1 ? `${book.authors[0]} 외` : book.authors;

  return (
    <article className={styles["book-item"]} onClick={handleClick}>
      <figure>
        <img className={styles.img} src={book.imageUrl} alt={book.title} />
        <figcaption>{book.title}</figcaption>
      </figure>
      <div className={styles["book-item-info"]}>
        <p className={styles.title} aria-label="책 제목">
          {book.title}
        </p>
        <p className={styles.authors} aria-label="저자">
          {bookAuthor}
        </p>
        <p className={styles.publisher} aria-label="출판사">
          {book.publisher}
        </p>
        <span className={styles["quiz-count-container"]}>
          <img src={pencil} alt="퀴즈 개수" width={20} height={20} />
          <p className={styles["quiz-count"]}>{book.quizCount}</p>
        </span>
      </div>
    </article>
  );
}
