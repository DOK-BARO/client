import { BookType } from "@/types/BookType";
import { memo } from "react";
import styles from "./_book_list_item.module.scss";

export const BookListItem = memo(
  ({
    book,
    isSelected,
    onSelect,
  }: {
    book: BookType;
    isSelected: boolean;
    onSelect: (book: BookType) => void;
  }) => {
    const handleSelect = () => {
      if (isSelected) return;
      onSelect(book);
    };
    return (
      <li
        key={book.id}
        className={styles["booklist-item"]}
        onClick={handleSelect}
      >
        <img src={book.imageUrl} alt={book.title} width={66} height={88} />
        <div className={styles["info-container"]}>
          <span className={styles.title}>{book.title}</span>
          <span className={styles.author}>
            {book.authors} ({book.publisher})
          </span>
        </div>
      </li>
    );
  },
);
