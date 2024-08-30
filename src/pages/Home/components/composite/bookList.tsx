import { useEffect, useState } from "react";
import styles from "../../../../styles/composite/_bookList.module.scss";
import { getBookList } from "../../../../services/bookService";
import { BookType } from "../../../../types/BookType";
import BookItem from "./bookItem";

export default function BookList() {
  const [bookList, setBookList] = useState<BookType[]>();

  // TODO: tanstack-query로 변경하기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBookList();
        console.log(data);
        setBookList(data);
        // getBook();
      } catch (error) {
        console.error("Error fetching book list:", error);
      }
    };
    fetchData();

    // setBookList(data);
    // getBook();
  }, []);

  return (
    <section className={styles[""]}>
      <h2 className={styles["sr-only"]}>책 목록</h2>
      <ul className={styles["book-list-container"]}>
        {bookList?.map((book) => (
          <li>
            <BookItem key={book.id} book={book} />
          </li>
        ))}
      </ul>
    </section>
  );
}
