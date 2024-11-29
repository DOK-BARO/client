import { Outlet, useLocation } from "react-router-dom";
import styles from "./_book_list_layout.module.scss";
import { useQuery } from "@tanstack/react-query";
import { bookKeys } from "@/data/queryKeys";
import { getBookCategories, getBooks } from "@/services/server/bookService";
import LNB from "../lnb/lnb";
import {
  findCurrentCategoryInfo,
  findParentCategoryInfo,
  findTopParentCategoryInfo,
} from "@/utils/findCategoryInfo";
import Breadcrumb from "../../composite/breadcrumb/breadcrumb";
import { useEffect, useState } from "react";
import BookListFilter from "@/components/composite/bookListFilter/bookListFilter";
import Pagination from "@/components/composite/pagination/pagination";
import { SortFilterType } from "@/types/BookType";
import { useAtom } from "jotai";
import { PaginationAtom } from "@/store/paginationAtom";

export default function BookListLayout() {
  // 책 카테고리 목록 가져오기
  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: bookKeys.categories(),
    queryFn: getBookCategories,
  });
  const [sortFilter, setSortFilter] = useState<SortFilterType>("QUIZ_COUNT");
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const [paginationState, setPaginationState] = useAtom(PaginationAtom);
  const currentPage = paginationState.currentPage;
  const totalPagesLength = paginationState.totalPagesLength;

  const category = queryParams.get("category");
  const sort = queryParams.get("sort");

  // 책 목록 가져오기
  const { data: booksData, isLoading: isBooksLoading } = useQuery({
    queryKey: bookKeys.list({
      category: category ? Number(category) : undefined,
      sort: sort ? (sort as SortFilterType) : undefined,
      page: currentPage,
    }),
    queryFn: () =>
      getBooks({
        category: category ? Number(category) : undefined,
        sort: sort ? (sort as SortFilterType) : undefined,
        page: currentPage,
        size: 10,
      }),
  });

  const books = booksData?.data;
  const endPageNumber = booksData?.endPageNumber;

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

  return (
    <section className={styles.container}>
      {isCategoriesLoading || !categories ? (
        <div>카테고리 로딩중</div>
      ) : (
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
          <BookListFilter
            setSortFilter={setSortFilter}
            sortFilter={sortFilter}
          />
        </div>
        {isBooksLoading || !booksData ? (
          <div>책 목록 로딩중</div>
        ) : (
          <Outlet context={{ books }} />
        )}
        {totalPagesLength ? <Pagination /> : <>로딩중</>}
      </div>
    </section>
  );
}
