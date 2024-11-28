import { Outlet, useParams } from "react-router-dom";
import styles from "./_book_list_layout.module.scss";
import { useQuery } from "@tanstack/react-query";
import { bookKeys } from "@/data/queryKeys";
import { getBookCategories, getBookList } from "@/services/server/bookService";
import LNB from "../lnb/lnb";
import {
  findCurrentCategoryInfo,
  findParentCategoryInfo,
  findTopParentCategoryInfo,
} from "@/utils/findCategoryInfo";
import Breadcrumb from "../../composite/breadcrumb/breadcrumb";
import { useState } from "react";
import BookListFilter from "@/components/composite/bookListFilter/bookListFilter";
import Pagination from "@/components/composite/pagination/pagination";
import usePagination from "@/hooks/usePagination";

export type SortFilterType = "PUBLISHED_AT" | "TITLE" | "QUIZ_COUNT";

export default function BookListLayout() {
  const { categoryId } = useParams();
  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: bookKeys.categories(),
    queryFn: getBookCategories,
  });
  const [sortFilter, setSortFilter] = useState<SortFilterType>("QUIZ_COUNT");
  const { currentPage } = usePagination({ totalPagesLength: 6 });

  const { data: bookListData, isLoading: isBookListLoading } = useQuery({
    queryKey: bookKeys.list({
      category: Number(categoryId),
      sort: sortFilter,
      page: currentPage,
    }),
    queryFn: () =>
      getBookList({
        category: Number(categoryId) || undefined,
        sort: sortFilter,
        page: currentPage,
        size: 10,
      }),
  });

  const bookList = bookListData?.data;
  const endPageNumber = bookListData?.endPageNumber;

  console.log(endPageNumber);

  const topParentCategoryInfo = categories
    ? findTopParentCategoryInfo(categories, Number(categoryId))
    : null;
  const parentCategoryInfo = categories
    ? findParentCategoryInfo(categories, Number(categoryId))
    : null;
  const currentCategoryInfo = categories
    ? findCurrentCategoryInfo(categories, Number(categoryId))
    : null;

  return (
    <section className={styles.container}>
      {isCategoriesLoading || !categories ? (
        <div>카테고리 로딩중</div>
      ) : (
        <LNB categoryId={Number(categoryId)} categories={categories} />
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
        {isBookListLoading || !bookListData ? (
          <div>책 목록 로딩중</div>
        ) : (
          <Outlet context={{ bookList }} />
        )}
        <Pagination totalPagesLength={15} />
      </div>
    </section>
  );
}
