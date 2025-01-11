import { Outlet, useLocation } from "react-router-dom";
import styles from "./_book_list_layout.module.scss";
import { useQuery } from "@tanstack/react-query";
import { bookKeys } from "@/data/queryKeys";
import LNB from "../../composite/Lnb/Lnb";
import {
  findCurrentCategoryInfo,
  findParentCategoryInfo,
  findTopParentCategoryInfo,
} from "@/utils/findCategoryInfo";
import Breadcrumb from "../../../../components/composite/Breadcrumb/Breadcrumb";
import { useEffect } from "react";
import Pagination from "@/components/composite/Pagination/Pagination";
import { useAtom } from "jotai";
import {
  paginationAtom,
  prevPaginationStateAtom,
} from "@/store/paginationAtom";
import { bookService } from "@/services/server/bookService";
import ListFilter, {
  FilterOptionType,
} from "@/components/composite/ListFilter/ListFilter";
import useNavigateWithParams from "@/hooks/useNavigateWithParams";
import useFilter from "@/hooks/useFilter";
import { BooksFilterType, BooksSortType } from "@/types/FilterType";
import { parseQueryParams } from "@/utils/parseQueryParams";
import { FetchBooksParams } from "@/types/ParamsType";
import { bookFilterAtom } from "@/store/filterAtom";

// TODO: 외부 파일로 분리하기
const filterOptions: FilterOptionType<BooksFilterType>[] = [
  {
    filter: {
      sort: "TITLE",
      direction: "ASC",
    },
    label: "가다나순",
  },
  {
    filter: {
      sort: "QUIZ_COUNT",
      direction: "DESC",
    },
    label: "퀴즈순",
  },
];

export default function BookListLayout() {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const [paginationState, setPaginationState] = useAtom(paginationAtom);

  // -FilterAtom에 저장된 필터 상태를 지정하는 함수 setFilterCriteria를 useFilter에 전달
  const [filterCriteria, setFilterCriteria] = useAtom(bookFilterAtom);
  useFilter<BooksFilterType>(setFilterCriteria);
  const { navigateWithParams } = useNavigateWithParams("books");

  console.log("filtercriteria", filterCriteria);

  // 책 카테고리 목록 가져오기
  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: bookKeys.categories(),
    queryFn: bookService.fetchBookCategories,
  });

  // URL로부터 queryParams 값 가져옴
  const category = queryParams.get("category") || undefined; // 기본값: 없음 (모든 책 목록)
  const sort = queryParams.get("sort") || "TITLE"; // 기본값: 가나다
  const direction = queryParams.get("direction") || "ASC"; // 기본값: ASC
  const page = queryParams.get("page") || undefined; // parseQueryParams함수 안에서 기본값 1로 설정
  const size = 10; // 한번에 불러올 최대 길이: 책 목록에서는 10 고정값.
  const title = queryParams.get("title") || undefined;
  // 책 목록 가져오기
  const { data: booksData, isLoading: isBooksLoading } = useQuery({
    queryKey: bookKeys.list(
      parseQueryParams<BooksSortType, FetchBooksParams>({
        title,
        category,
        sort,
        direction,
        page,
        size,
      })
    ),
    queryFn: () =>
      bookService.fetchBooks(
        parseQueryParams({ title, category, sort, direction, page, size })
      ),
  });

  const books = booksData?.data;
  const endPageNumber = booksData?.endPageNumber;

  // 마지막 페이지 번호 저장
  useEffect(() => {
    if (endPageNumber && paginationState.totalPagesLength !== endPageNumber) {
      setPaginationState((prev) => ({
        ...prev,
        totalPagesLength: endPageNumber,
      }));
    }
  }, [endPageNumber]);

  const [, setPrePaginationState] = useAtom(prevPaginationStateAtom);

  // filterOptions 클릭 시
  const handleOptionClick = (filter: BooksFilterType) => {
    sessionStorage.setItem("prevPage", page ? page : "1");
    setPrePaginationState(undefined);

    navigateWithParams({
      filter: filter,
      parentPage: "books",
      excludeParams: ["page"],
    });
  };

  const topParentCategoryInfo = categories
    ? findTopParentCategoryInfo(categories, Number(category))
    : null;
  const parentCategoryInfo = categories
    ? findParentCategoryInfo(categories, Number(category))
    : null;
  const currentCategoryInfo = categories
    ? findCurrentCategoryInfo(categories, Number(category))
    : null;

  return (
    <section className={styles.container}>
      {isCategoriesLoading || !categories ? null : (
        <LNB categoryId={Number(category)} categories={categories} />
      )}

      <div className={styles["book-list-container"]}>
        <h2 className={styles.title}>
          {topParentCategoryInfo?.name || "전체 책 목록"}
        </h2>
        <div className={styles["breadcrumb-filter-container"]}>
          {currentCategoryInfo ? (
            <Breadcrumb
              parentPage="books"
              list={[parentCategoryInfo, currentCategoryInfo]}
            />
          ) : (
            <span />
          )}
          <ListFilter
            onOptionClick={handleOptionClick}
            sortFilter={filterCriteria}
            filterOptions={filterOptions}
          />
        </div>
        {isBooksLoading || !booksData ? null : <Outlet context={{ books }} />}
        {paginationState.totalPagesLength ? (
          <Pagination
            type="queryString"
            parentPage="books"
            paginationState={paginationState}
            setPaginationState={setPaginationState}
          />
        ) : null}
      </div>
    </section>
  );
}
