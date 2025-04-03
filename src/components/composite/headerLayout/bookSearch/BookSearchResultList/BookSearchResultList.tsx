import styles from "./_book_search_result.module.scss";
import { useNavigate } from "react-router-dom";
import useNavigateWithParams from "@/hooks/useNavigateWithParams";
import ROUTES from "@/data/routes";
import { BookType } from "@/types/BookType";
import { Dispatch } from "react";
import { SetStateAction } from "jotai";
import rightArrow from "/public/assets/svg/header/rightArrow.svg";
import BookSearchResultListItem from "../BookSearchResultListItem/BookSearchResultListItem";

interface Props {
  searchedBooks: BookType[] | undefined;
  setIsShowSearchResult: Dispatch<SetStateAction<boolean>>;
  isBookSearching: boolean;
  searchValue: string;
}

export default function BookSearchResultList({
  searchedBooks,
  setIsShowSearchResult,
  isBookSearching,
  searchValue,
}: Props) {
  const navigate = useNavigate();

  const handleSelectBook = (bookId: number) => {
    navigate(ROUTES.BOOK_DETAIL_SECTION(bookId));
    setIsShowSearchResult((prev) => !prev);
  };

  const { navigateWithParams } = useNavigateWithParams();

  const viewMoreSearchedBooks = () => {
    navigateWithParams({
      title: searchValue,
      parentPage: "books",
      excludeParams: ["page"],
    });
    setIsShowSearchResult((prev) => !prev);
  };

  return (
    <ol className={styles["book-search-result"]}>
      {searchedBooks && searchedBooks.length > 0 ? (
        <>
          {searchedBooks.map((book) => (
            <BookSearchResultListItem
              book={book}
              onSelectBook={handleSelectBook}
            />
          ))}
          <button
            className={styles["more-result"]}
            onClick={viewMoreSearchedBooks}
          >
            <p>더 많은 검색 결과 보기</p>
            <img src={rightArrow} width={23} height={23} />
          </button>
        </>
      ) : isBookSearching ? (
        <p className={styles["no-result"]}>불러오고 있습니다..</p>
      ) : (
        <p className={styles["no-result"]}>검색 결과가 없습니다.</p>
      )}
    </ol>
  );
}
