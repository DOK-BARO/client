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
import { BookType } from "@/types/BookType";
import React from "react";

// 2. 도서 선택
// Issue: 도서 선택 UI 변경 시 딜레이 있음
export default function QuizBookSelectionForm() {
  const {
    value: searchValue,
    onChange: onChangeSearchValue,
    resetInput: resetSearchValueInput,
  } = useInput("");

  const [tempSelectedBook, setTempSelectedBook] = useState<BookType | null>(
    null
  );

  // 검색어 지워져도 남아있는 // 사용자가 확실히 도서를 선택했을 때만 바뀜
  const [selectedBook, setSelectedBook] = useState<BookType | null>(
    tempSelectedBook
  );

  const [isClicked, setIsClicked] = useState<boolean>(false);
  const inputRef = useRef<HTMLDivElement>(null);
  const loadingIcon = "/assets/svg/quizBookSelectionForm/loading.gif";
  const debouncedSearchValue = useDebounce(searchValue, 500);

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
  const onBookSelect = (book: BookType) => {
    // 전역 변수에 저장
    setSelectedBook(book);
    setTempSelectedBook(book);
    resetSearchValueInput();
  };

  const BookListItem = React.memo(
    ({ book, isSelected }: { book: BookType; isSelected: boolean }) => {
      return (
        <li
          key={book.id}
          className={styles["booklist-item"]}
          onClick={() => {
            if (isSelected) return;
            onBookSelect(book);
          }}
        >
          <img src={book.imageUrl} alt={book.title} width={66} height={88} />
          <div className={styles["info-container"]}>
            <span className={styles["title"]}>{book.title}</span>
            <span className={styles["author"]}>
              {book.authors} ({book.publisher})
            </span>
          </div>
        </li>
      );
    }
  );
  return (
    <div
      ref={inputRef}
      className={styles["search-book"]}
      onClick={() => setIsClicked(true)}
    >
      <Input
        leftIcon={<Search width={24} stroke={gray60} />}
        rightIcon={
          isActuallyLoading ? <img src={loadingIcon} width={24} /> : undefined
        }
        onChange={(e) => {
          onChangeSearchValue(e);
          if (tempSelectedBook) {
            setTempSelectedBook(null);
          }
        }}
        value={searchValue}
        id="book-name"
        placeholder="책이나 저자로 검색해보세요."
        color={isClicked ? "black" : "default"}
        size="large"
      />

      {searchedBookList && searchedBookList.length > 0 ? (
        <ul
          className={styles["selection-list"]}
          role="listbox"
          aria-label="도서 선택 상자"
        >
          {searchedBookList.map((book) => (
            <BookListItem key={book.id} book={book} isSelected={false} />
          ))}
        </ul>
      ) : (
        <>
          {/* 검색 결과가 없고, searchValue가 없는 경우 선택된 책 표시 */}
          {!searchValue && selectedBook && (
            <div className={styles["selected-book"]}>
              <BookListItem
                book={tempSelectedBook ?? selectedBook}
                isSelected
              />
            </div>
          )}

          {/* 검색 결과가 없고, 검색어가 있는 경우 */}
          {searchValue && (
            <ul
              className={styles["selection-list"]}
              role="listbox"
              aria-label="도서 선택 상자"
            >
              {!isActuallyLoading ? <li>검색 결과가 없습니다.</li> : null}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
