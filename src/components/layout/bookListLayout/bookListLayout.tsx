import { Outlet, useParams } from "react-router-dom";
import styles from "./_book_list_layout.module.scss";
import { useQuery } from "@tanstack/react-query";
import { bookKeys } from "@/data/queryKeys";
import { getBookCategories } from "@/services/server/bookService";
import LNB from "../lnb/lnb";
import {
  findCurrentCategoryInfo,
  findParentCategoryInfo,
  findTopParentCategoryInfo,
} from "@/utils/findCategoryInfo";
import Breadcrumb from "../breadcrumb/breadcrumb";

export default function BookListLayout() {
  const { data: categories, isLoading } = useQuery({
    queryKey: bookKeys.categories(),
    queryFn: getBookCategories,
  });
  const { categoryId } = useParams();

  if (isLoading || !categories) {
    return <div>로딩중</div>;
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
        <h2 className={styles.title}>{topParentCategoryInfo?.name}</h2>
        <Breadcrumb list={[parentCategoryInfo, currentCategoryInfo]} />
        <Outlet />
      </div>
    </section>
  );
}
