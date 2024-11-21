// Book Category Local Navigation Bar
import styles from "./_lnb.module.scss";
import { getBookCategories } from "@/services/server/bookService.ts";
import { useQuery } from "@tanstack/react-query";
import { bookKeys } from "@/data/queryKeys";
import Button from "@/components/atom/button/button";
import { useNavigate } from "react-router-dom";
import arrowLeft from "/assets/svg/arrowLeft.svg";
import { BookCategory } from "@/types/GNBCategoryType";

// Book Category GNB
export default function LNB({ categoryId }: { categoryId?: number }) {
  const { data: categories, isLoading } = useQuery({
    queryKey: bookKeys.categories(),
    queryFn: getBookCategories,
  });
  const navigate = useNavigate();

  if (isLoading) {
    return <div>loading</div>;
  }
  if (!categories) {
    return <div>book categories page error!!</div>;
  }

  const parentCategoryId = categoryId
    ? findTopParentCategoryId(categories, categoryId)
    : null;

  console.log("parentId", parentCategoryId);

  return (
    <nav className={styles.lnb} aria-label="Category Navigation">
      <div className={styles["lnb-inner-container"]}>
        {categoryId ? (
          <header>
            <span className={styles["current-category"]}>
              <Button
                color="transparent"
                icon={<img src={arrowLeft} />}
                iconOnly
                onClick={() => navigate("/")}
              />
              {categories.find((item) => item.id === parentCategoryId)?.name ||
                ""}
            </span>
          </header>
        ) : null}

        <ul className={styles["category-list"]}>
          {!categoryId
            ? categories?.map((category) => (
                <li key={category.id} className={styles["category-item"]}>
                  <Button
                    color="transparent"
                    size="medium"
                    className={styles["category-item-button"]}
                    onClick={() => navigate(`/book-list/${category.id}`)}
                  >
                    {category.name}
                  </Button>
                </li>
              ))
            : categories
                .find((item) => item.id === parentCategoryId)
                ?.details?.map((categoryDetail) => (
                  <li
                    key={categoryDetail.id}
                    className={styles["category-detail-item"]}
                  >
                    <Button
                      color="transparent"
                      className={`${styles["category-detail-item-button"]} ${
                        categoryId === categoryDetail.id ? styles.selected : ""
                      }`}
                      onClick={() =>
                        navigate(`/book-list/${categoryDetail.id}`)
                      }
                    >
                      {categoryDetail.name}
                    </Button>
                  </li>
                ))}
        </ul>
      </div>
    </nav>
  );
}

// 가장 상위의 부모 카테고리 아이디를 찾음
const findTopParentCategoryId = (
  categories: BookCategory[],
  targetId: number
): number | null => {
  const traverse = (
    items: BookCategory[],
    parentId: number | null
  ): number | null => {
    for (const item of items) {
      // 'parentId'가 targetId로 일치하는지 체크
      if (item.id === targetId) {
        return parentId === null ? item.id : parentId; // parentId가 null이면 자기 자신을 반환
      }

      // 자식 요소가 있을 경우 재귀적으로 탐색
      if (item.details && item.details.length > 0) {
        const result = traverse(
          item.details,
          parentId === null ? item.id : parentId
        );

        if (result !== null) {
          return result;
        }
      }
    }
    return null; // 찾지 못하면 null 반환
  };

  return traverse(categories, null);
};
