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
  const { currentPage, handleClick } = usePagination(1);

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
        <Pagination currentPage={currentPage} handleClick={handleClick} />
      </div>
    </section>
  );
}
