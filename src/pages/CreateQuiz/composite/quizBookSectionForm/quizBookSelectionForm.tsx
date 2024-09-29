import Input from "../../../components/atom/input";
import useInput from "../../../hooks/useInput";
import styles from "../../../styles/composite/_quiz_book_selection_form.module.scss";
import { getBookList } from "../../../services/server/bookService.ts";
import { useQuery } from "@tanstack/react-query";
import { bookKeys } from "../../../data/queryKeys";
import { useEffect, useState } from "react";

// 2. 도서 선택
export default function QuizBookSelectionForm() {
  const { value: bookName, onChange: onChangeBookName } = useInput("");
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);

  // TODO: debouncing or throttling 적용하기

  const {
    data: searchedBookList,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: bookKeys.list(), // bookName을 객체로 감싸기
    queryFn: () => getBookList({ title: bookName }),
    enabled: false, // query가 컴포넌트가 마운트될 때 자동으로 실행되지 않도록 설정
  });

  useEffect(() => {
    refetch();
  }, [bookName, refetch]);

  if (isLoading) {
    return <div>loading</div>;
  }

  // 도서 선택(클릭)
  const onBookSelect = (bookId: number) => {
    // 전역 변수에 저장
    setSelectedBookId(bookId);
    console.log(bookId);
  };

  return (
    <div className={styles["search-book"]}>
      <Input
        onChange={onChangeBookName}
        value={bookName}
        id="book-name"
        placeholder="책 이름을 입력해주세요."
      />
      <ul
        className={styles["selection-list"]}
        role="listbox"
        aria-label="도서 선택 상자"
      >
        {searchedBookList?.map((book) => (
          // li(searchedBookListItem)컴포넌트 분리하기
          // TODO: atom으로 분리해도 괜찮을지?
          <li
            key={book.id}
            className={`${styles["booklist-item"]} ${
              selectedBookId === book.id ? styles["active"] : ""
            }`}
            onClick={() => onBookSelect(book.id)}
          >
            <img src={book.imageUrl} alt={book.title} width={66} height={88} />
            <div className={styles["info-container"]}>
              <span className={styles["title"]}>{book.title}</span>
              <span className={styles["author"]}>
                {book.authors} ({book.publisher})
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
