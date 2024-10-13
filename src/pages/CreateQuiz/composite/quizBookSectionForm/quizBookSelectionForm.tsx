import styles from "./_quiz_book_selection_form.module.scss";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import useInput from "@/hooks/useInput.ts";
import { bookKeys } from "@/data/queryKeys.ts";
import { getBookList } from "@/services/server/bookService.ts";
import Input from "@/components/atom/input/input.tsx";
import { Search } from "@/svg/search";
import { gray60 } from "@/styles/abstracts/colors";
import useDebounce from "@/hooks/useDebounce";

// 2. 도서 선택
export default function QuizBookSelectionForm() {
  const { value: searchValue, onChange: onChangeSearchValue } = useInput("");
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const inputRef = useRef<HTMLDivElement>(null);

  const debouncedSearchValue = useDebounce(searchValue, 500);

  // TODO: debouncing or throttling 적용하기
  const {
    data: searchedBookList,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: bookKeys.list({ title: debouncedSearchValue }),
    queryFn: () => getBookList({ title: debouncedSearchValue }),
    enabled: debouncedSearchValue !== "",
  });

  useEffect(() => {
    if (debouncedSearchValue !== "") {
      refetch();
    }
  }, [debouncedSearchValue, refetch]);

  const isActuallyLoading = isLoading || isFetching;

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsClicked(false);
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, []);

  // 도서 선택(클릭)
  const onBookSelect = (bookId: number) => {
    // 전역 변수에 저장
    setSelectedBookId(bookId);
    console.log(bookId);
  };

  return (
    <div
      ref={inputRef}
      className={styles["search-book"]}
      onClick={() => setIsClicked(true)}
    >
      <Input
        leftIcon={<Search width={24} stroke={gray60} />}
        rightIcon={isActuallyLoading ? <div>로딩중</div> : undefined}
        onChange={onChangeSearchValue}
        value={searchValue}
        id="book-name"
        placeholder="책이나 저자로 검색해보세요."
        color={isClicked ? "black" : "default"}
        size="large"
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
