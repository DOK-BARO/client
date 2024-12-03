import { Outlet, useLocation } from "react-router-dom";
import styles from "./_book_list_layout.module.scss";
import { useQuery } from "@tanstack/react-query";
import { bookKeys } from "@/data/queryKeys";
import LNB from "../lnb/lnb";
import {
  findCurrentCategoryInfo,
  findParentCategoryInfo,
  findTopParentCategoryInfo,
} from "@/utils/findCategoryInfo";
import Breadcrumb from "../../composite/breadcrumb/breadcrumb";
import { useEffect } from "react";
import BookListFilter from "@/components/composite/bookListFilter/bookListFilter";
import Pagination from "@/components/composite/pagination/pagination";
import { SortFilterType } from "@/types/BookType";
import { useAtom } from "jotai";
import { PaginationAtom } from "@/store/paginationAtom";
import { bookService } from "@/services/server/bookService";

export default function BookListLayout() {
  // 책 카테고리 목록 가져오기
  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: bookKeys.categories(),
    queryFn: bookService.getBookCategories,
  });
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const [paginationState, setPaginationState] = useAtom(PaginationAtom);
  const totalPagesLength = paginationState.totalPagesLength;

  const category = queryParams.get("category");
  const sort = queryParams.get("sort");
  const page = queryParams.get("page");

  // 책 목록 가져오기
  const { data: booksData, isLoading: isBooksLoading } = useQuery({
    queryKey: bookKeys.list({
      category: category ? Number(category) : undefined,
      sort: sort ? (sort as SortFilterType) : undefined,
      page: page ? Number(page) : undefined,
      size: 10,
    }),
    queryFn: () =>
      bookService.getBooks({
        category: category ? Number(category) : undefined,
        sort: sort ? (sort as SortFilterType) : undefined,
        page: page ? Number(page) : undefined,
        size: 10,
      }),
  });
  console.log(booksData, isBooksLoading);

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
          <BookListFilter />
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
