import styles from "./_book_search_result_list_item.module.scss";
import { BookType } from "@/types/BookType";

interface Props {
  book: BookType;
  onSelectBook: (bookId: number) => void;
}
export default function BookSearchResultListItem({
  book,
  onSelectBook,
}: Props) {
  return (
    <li
      key={book.id}
      className={styles["book-search-result-item"]}
      onClick={() => onSelectBook(book.id)}
    >
      <img
        className={styles["book-search-result-item-image"]}
        src={book.imageUrl}
        alt={book.title}
        width={66}
        height={88}
      />
      <div className={styles["info-container"]}>
        <span className={styles.title}>{book.title}</span>
        <span className={styles.author}>
          {book.authors} ({book.publisher})
        </span>
      </div>
    </li>
  );
}
