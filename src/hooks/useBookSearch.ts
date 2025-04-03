import { useEffect } from "react";
import useInput from "./useInput";
import { bookKeys } from "@/data/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { bookService } from "@/services/server/bookService";
import useDebounce from "./useDebounce";

const useBookSearch = (size?: number) => {
  const {
    value: searchValue,
    onChange: onChangeSearchValue,
    resetInput: resetSearchValueInput,
  } = useInput("");
  const debouncedSearchValue = useDebounce(searchValue, 500);

  const {
    data: searchedBooks,
    isLoading,
    isFetching,
    isFetched,
    refetch,
  } = useQuery({
    queryKey: bookKeys.search({ keyword: debouncedSearchValue }),
    queryFn: () =>
      bookService.fetchSearchBooks({ keyword: debouncedSearchValue, size }),
    enabled: debouncedSearchValue !== "",
  });

  useEffect(() => {
    if (debouncedSearchValue !== "") {
      refetch();
    }
  }, [debouncedSearchValue, refetch]);

  const isBookSearching = !isFetched || isLoading || isFetching;

  const onSearchBook = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeSearchValue(e);
    // if (tempSelectedBook) {
    //   setTempSelectedBook(null);
    // }
  };
  // // 도서 선택(클릭)
  // const onBookSelect = (book: BookType) => {
  //   setSelectedBook(book);
  //   resetSearchValueInput();
  //   updateQuizCreationInfo("book", book);
  // };

  return {
    onSearchBook,
    searchedBooks,
    searchValue,
    isBookSearching,
    resetSearchValueInput,
  };
};
export default useBookSearch;
