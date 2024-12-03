import { Outlet, useParams } from "react-router-dom";
import styles from "./_book_list_layout.module.scss";
import { useQuery } from "@tanstack/react-query";
import { bookKeys } from "@/data/queryKeys";
import LNB from "../lnb/lnb";
import {
  findCurrentCategoryInfo,
  findParentCategoryInfo,
  findTopParentCategoryInfo,
} from "@/utils/findCategoryInfo";
import Breadcrumb from "../breadcrumb/breadcrumb";
import BookListFilter from "../bookListFilter/bookListFilter";
import { useState } from "react";
import { bookService } from "@/services/server/bookService";

export type SortFilterType = "PUBLISHED_AT" | "TITLE" | "QUIZ_COUNT";

export default function BookListLayout() {
  const { categoryId } = useParams();
  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: bookKeys.categories(),
    queryFn: bookService.getBookCategories,
  });
  const [sortFilter, setSortFilter] = useState<SortFilterType>("QUIZ_COUNT");

  const { data: bookListData, isLoading: isBookListLoading } = useQuery({
    queryKey: bookKeys.list({ category: Number(categoryId), sort: sortFilter }),
    queryFn: () =>
      bookService.getBookList({
        category: Number(categoryId) || undefined,
        sort: sortFilter,
      }),
  });

  const bookList = bookListData?.data;

  if (isBookListLoading || !bookListData) {
    return <div>책 목록 로딩중</div>;
  }

  if (isCategoriesLoading || !categories) {
    return <div>카테고리 로딩중</div>;
  }

  const topParentCategoryInfo = findTopParentCategoryInfo(
    categories,
    Number(categoryId)
  );
  const parentCategoryInfo = findParentCategoryInfo(
    categories,
    Number(categoryId)
  );
  const currentCategoryInfo = findCurrentCategoryInfo(
    categories,
    Number(categoryId)
  );

  return (
    <section className={styles.container}>
      <LNB categoryId={Number(categoryId)} categories={categories} />
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
        <Outlet context={{ bookList }} />
      </div>
    </section>
  );
}
