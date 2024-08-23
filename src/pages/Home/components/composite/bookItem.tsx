import { BookType } from "../../../../types/BookType";
import styles from "../../../../styles/composite/_bookItem.module.scss";
export default function BookItem({ book }: { book: BookType }) {
  return (
    <article className={styles["book-item-container"]}>
      <figure>
        <img
          className={styles["book-img"]}
          src={book.imageUrl}
          alt={book.title}
        />
        <figcaption>{book.title}</figcaption>
      </figure>
      <h3>{book.title}</h3>
      <p>{book.authors}</p>
      <p>{book.publisher}</p>
    </article>
  );
}
