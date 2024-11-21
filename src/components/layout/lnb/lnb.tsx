// Book Category Local Navigation Bar
import styles from "./_lnb.module.scss";
import { getBookCategories } from "@/services/server/bookService.ts";
import { useQuery } from "@tanstack/react-query";
import { bookKeys } from "@/data/queryKeys";
import Button from "@/components/atom/button/button";
import { useNavigate } from "react-router-dom";
import arrowLeft from "/assets/svg/arrowLeft.svg";

// Book Category GNB
export default function LNB({
  categoryId,
  subCategoryId,
}: {
  categoryId?: number;
  subCategoryId?: number;
}) {
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
  console.log(categories);

  return (
    <nav className={styles.lnb} aria-label="Category Navigation">
      <div className={styles["lnb-inner-container"]}>
        {categoryId ? (
          <header>
            <h2>
              <span className={styles["current-category"]}>
                <Button
                  color="transparent"
                  icon={<img src={arrowLeft} />}
                  iconOnly
                  onClick={() => navigate("/")}
                />
                {categories.find((item) => item.id === categoryId)?.name || ""}
              </span>
            </h2>
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
                .find((item) => item.id === categoryId)
                ?.details?.map((categoryDetail) => (
                  <li
                    key={categoryDetail.id}
                    className={styles["category-detail-item"]}
                  >
                    <Button
                      color="transparent"
                      className={`${styles["category-detail-item-button"]} ${
                        subCategoryId === categoryDetail.id
                          ? styles.selected
                          : ""
                      }`}
                      onClick={() =>
                        navigate(
                          `/book-list/${categoryId}/${categoryDetail.id}`
                        )
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
