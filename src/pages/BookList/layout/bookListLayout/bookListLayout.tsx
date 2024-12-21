import { Outlet, useLocation } from "react-router-dom";
import styles from "./_book_list_layout.module.scss";
import { useQuery } from "@tanstack/react-query";
import { bookKeys } from "@/data/queryKeys";
import LNB from "../../composite/lnb/lnb";
import {
  findCurrentCategoryInfo,
  findParentCategoryInfo,
  findTopParentCategoryInfo,
} from "@/utils/findCategoryInfo";
import Breadcrumb from "../../../../components/composite/breadcrumb/breadcrumb";
import { useEffect } from "react";
import Pagination from "@/components/composite/pagination/pagination";
import { useAtom } from "jotai";
import { paginationAtom } from "@/store/paginationAtom";
import { bookService } from "@/services/server/bookService";
import ListFilter, {
  FilterOptionType,
} from "@/components/composite/listFilter/listFilter";
import { bookFilterAtom } from "@/store/bookAtom";
import useNavigateWithParams from "@/hooks/useNavigateWithParams";
import useFilter from "@/hooks/useBookFilter";
import { BooksFilterType } from "@/types/FilterType";

// TODO: 분리
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

  // -FilterAtom에 저장된 필터 상태를 지정하는 함수 setFilterCriteria를 useFilter에 전달
  const [filterCriteria, setFilterCriteria] = useAtom(bookFilterAtom);
  useFilter<BooksFilterType>(setFilterCriteria);
  const { navigateWithParams } = useNavigateWithParams();

  // 책 카테고리 목록 가져오기
  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: bookKeys.categories(),
    queryFn: bookService.fetchBookCategories,
  });

  const [paginationState, setPaginationState] = useAtom(paginationAtom);
  const totalPagesLength = paginationState.totalPagesLength;

  const category = queryParams.get("category");
  const sort = queryParams.get("sort");
  const direction = queryParams.get("direction");
  const page = queryParams.get("page");

  // 책 목록 가져오기
  const { data: booksData, isLoading: isBooksLoading } = useQuery({
    queryKey: bookKeys.list({
      category: category ? Number(category) : undefined,
      sort: sort ? (sort as BooksFilterType["sort"]) : undefined,
      direction: direction ? (sort as BooksFilterType["direction"]) : undefined,
      page: page ? Number(page) : undefined,
      size: 10,
    }),
    queryFn: () =>
      bookService.fetchBooks({
        category: category ? Number(category) : undefined,
        sort: sort ? (sort as BooksFilterType["sort"]) : undefined,
        direction: direction
          ? (direction as BooksFilterType["direction"])
          : undefined,
        page: page ? Number(page) : undefined,
        size: 10,
      }),
  });

  const books = booksData?.data;
  const endPageNumber = booksData?.endPageNumber;

  // 마지막 페이지 번호 저장
  useEffect(() => {
    setPaginationState({
      ...paginationState,
      totalPagesLength: booksData?.endPageNumber,
    });
  }, [endPageNumber]);

  const topParentCategoryInfo = categories
    ? findTopParentCategoryInfo(categories, Number(category))
    : null;
  const parentCategoryInfo = categories
    ? findParentCategoryInfo(categories, Number(category))
    : null;
  const currentCategoryInfo = categories
    ? findCurrentCategoryInfo(categories, Number(category))
    : null;

  const handleOptionClick = (filter: BooksFilterType) => {
    navigateWithParams({ filter: filter, parentComponentType: "BOOKS" });
  };

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
            <Breadcrumb list={[parentCategoryInfo, currentCategoryInfo]} />
          ) : (
            <span />
          )}
          <ListFilter
            handleOptionClick={handleOptionClick}
            sortFilter={filterCriteria}
            filterOptions={filterOptions}
          />
        </div>
        {isBooksLoading || !booksData ? null : <Outlet context={{ books }} />}
        {totalPagesLength ? <Pagination /> : null}
      </div>
    </section>
  );
}
