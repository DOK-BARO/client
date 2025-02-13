import styles from "./_quiz_book_selection_form.module.scss";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import useInput from "@/hooks/useInput.ts";
import { bookKeys } from "@/data/queryKeys.ts";
import Input from "@/components/atom/Input/Input";
import { Search } from "@/svg/Search";
import { gray60, gray90 } from "@/styles/abstracts/colors";
import useDebounce from "@/hooks/useDebounce";
import { BookType } from "@/types/BookType";
import useUpdateQuizCreationInfo from "@/hooks/useUpdateQuizCreationInfo";
import { bookService } from "@/services/server/bookService";
import { BookListItem } from "../BookListItem/BookListItem";
import useOutsideClick from "@/hooks/useOutsideClick";
import searchNotFoundImage from "/public/assets/image/search-not-found.png";
import LoadingSpinner from "@/components/atom/LoadingSpinner/LoadingSpinner";

// 2. 도서 선택
export default function QuizBookSelectionForm() {
  const [isSearchInputClicked, setIsSearchInputClicked] =
    useState<boolean>(false);
  const inputRef = useRef<HTMLDivElement>(null);
  const {
    value: searchValue,
    onChange: onChangeSearchValue,
    resetInput: resetSearchValueInput,
  } = useInput("");
  const debouncedSearchValue = useDebounce(searchValue, 500);

  const { quizCreationInfo, updateQuizCreationInfo } =
    useUpdateQuizCreationInfo();

  const [tempSelectedBook, setTempSelectedBook] = useState<BookType | null>(
    quizCreationInfo.book,
  );
  const [selectedBook, setSelectedBook] = useState<BookType | null>(
    tempSelectedBook,
  );

  const {
    data: searchedBooks,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: bookKeys.search({ keyword: debouncedSearchValue }),
    queryFn: () =>
      bookService.fetchSearchBooks({ keyword: debouncedSearchValue }),
    enabled: debouncedSearchValue !== "",
  });

  useEffect(() => {
    if (debouncedSearchValue !== "") {
      refetch();
    }
  }, [debouncedSearchValue, refetch]);

  const isBookSearching = isLoading || isFetching;
  useOutsideClick([inputRef], () => setIsSearchInputClicked(false));

  const handleSearchBook = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeSearchValue(e);
    if (tempSelectedBook) {
      setTempSelectedBook(null);
    }
  };

  // 도서 선택(클릭)
  const handleBookSelect = (book: BookType) => {
    setSelectedBook(book);
    resetSearchValueInput();
    updateQuizCreationInfo("book", book);
  };

  // 인풋창 클릭
  const handleClickInput = () => {
    setIsSearchInputClicked(true);
  };

  return (
    <div
      ref={inputRef}
      className={styles["search-book"]}
      onClick={handleClickInput}
    >
      <Input
        leftIcon={
          <Search width={20} stroke={isSearchInputClicked ? gray90 : gray60} />
        }
        rightIcon={isBookSearching ? <LoadingSpinner width={24} /> : undefined}
        onChange={handleSearchBook}
        value={searchValue}
        id="book-name"
        placeholder="책이나 저자로 검색해보세요."
        color={isSearchInputClicked ? "black" : "default"}
        size="large"
        fullWidth
      />

      {searchedBooks && searchedBooks.length > 0 ? (
        <ul
          className={`${styles["selection-list"]}`}
          role="listbox"
          aria-label="도서 선택 상자"
        >
          {searchedBooks.map((book) => (
            <BookListItem
              key={book.id}
              book={book}
              isSelected={false}
              onSelect={handleBookSelect}
            />
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
                onSelect={handleBookSelect}
              />
            </div>
          )}

          {/* 검색 결과가 없고, 검색어가 있는 경우 */}
          {searchValue && !isBookSearching && searchedBooks?.length === 0 ? (
            <ul
              className={styles["selection-list-not-found"]}
              role="listbox"
              aria-label="도서 선택 상자"
            >
              <li className={styles["not-found"]}>
                <img
                  src={searchNotFoundImage}
                  width={100}
                  alt="검색 결과가 없습니다."
                />
                <p className={styles["not-found-text"]}>
                  검색 결과가 없습니다.
                </p>
              </li>
            </ul>
          ) : null}
        </>
      )}
    </div>
  );
}
