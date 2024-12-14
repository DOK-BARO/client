import styles from "./_quiz_book_selection_form.module.scss";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import useInput from "@/hooks/useInput.ts";
import { bookKeys } from "@/data/queryKeys.ts";
import Input from "@/components/atom/input/input.tsx";
import { Search } from "@/svg/search";
import { gray60 } from "@/styles/abstracts/colors";
import useDebounce from "@/hooks/useDebounce";
import { BookType } from "@/types/BookType";
import { useAtom } from "jotai";
import { IsQuizNextButtonEnabledAtom } from "@/store/quizAtom";
import useUpdateQuizCreationInfo from "@/hooks/useUpdateQuizCreationInfo";
import { bookService } from "@/services/server/bookService";
import { BookListItem } from "./bookListItem";

// 2. 도서 선택
export default function QuizBookSelectionForm() {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const inputRef = useRef<HTMLDivElement>(null);
  const loadingIcon = "/assets/svg/quizBookSelectionForm/loading.gif";
  const [, setIsQuizNextButtonEnabled] = useAtom<boolean>(
    IsQuizNextButtonEnabledAtom
  );
  const {
    value: searchValue,
    onChange: onChangeSearchValue,
    resetInput: resetSearchValueInput,
  } = useInput("");
  const debouncedSearchValue = useDebounce(searchValue, 500);

  const { quizCreationInfo, updateQuizCreationInfo } =
    useUpdateQuizCreationInfo();

  const [tempSelectedBook, setTempSelectedBook] = useState<BookType | null>(
    quizCreationInfo.book
  );
  const [selectedBook, setSelectedBook] = useState<BookType | null>(
    tempSelectedBook
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

  const isActuallyLoading = isLoading || isFetching;

  useEffect(() => {
    if (!selectedBook) {
      setIsQuizNextButtonEnabled(false);
    }
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setIsClicked(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

    // 책이 선택되면 버튼 enabled
    setIsQuizNextButtonEnabled(true);
  };

  // 인풋창 클릭
  const handleClickInput = () => {
    setIsClicked(true);
  };

  return (
    <div
      ref={inputRef}
      className={styles["search-book"]}
      onClick={handleClickInput}
    >
      <Input
        leftIcon={<Search width={20} stroke={gray60} />}
        rightIcon={
          isActuallyLoading ? <img src={loadingIcon} width={24} /> : undefined
        }
        onChange={handleSearchBook}
        value={searchValue}
        id="book-name"
        placeholder="책이나 저자로 검색해보세요."
        color={isClicked ? "black" : "default"}
        size="large"
        fullWidth
      />

      {searchedBooks && searchedBooks.length > 0 ? (
        <ul
          className={styles["selection-list"]}
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
