// Book Category Local Navigation Bar
import styles from "./_lnb.module.scss";
import Button from "@/components/atom/button/button";
import { useNavigate } from "react-router-dom";
import { BookCategory } from "@/types/GNBCategoryType";
import { findTopParentCategoryInfo } from "@/utils/findCategoryInfo";
import { ArrowLeft } from "@/svg/arrowLeft";
import { gray90 } from "@/styles/abstracts/colors";
import useNavigateWithParams from "@/hooks/useNavigateWithParams";

// Book Category GNB
export default function LNB({
  categories,
  categoryId,
}: {
  categories: BookCategory[];
  categoryId?: number;
}) {
  const navigate = useNavigate();
  const { navigateWithParams } = useNavigateWithParams();

  if (!categories) {
    return <div>book categories page error!!</div>;
  }

  const parentCategoryInfo = categoryId
    ? findTopParentCategoryInfo(categories, categoryId)
    : null;

  return (
    <nav className={styles.lnb} aria-label="Category Navigation">
      <div className={styles["lnb-inner-container"]}>
        {categoryId ? (
          <header>
            <span className={styles["current-category"]}>
              <Button
                color="transparent"
                size="xsmall"
                icon={
                  <ArrowLeft
                    alt="뒤로가기"
                    width={20}
                    height={20}
                    stroke={gray90}
                  />
                }
                iconOnly
                // TODO: 수정하기
                onClick={() => navigate("/")}
              />
              <Button
                size="xsmall"
                color="transparent"
                className={styles["parent-category-name"]}
                value={parentCategoryInfo?.id.toString()}
                onClick={(e) => {
                  navigateWithParams(e, "category", ["page"]);
                }}
              >
                {parentCategoryInfo?.name}
              </Button>
            </span>
          </header>
        ) : null}

        <ul className={styles["category-list"]}>
          {!categoryId
            ? categories?.map((category) => (
                <li key={category.id} className={styles["category-item"]}>
                  <Button
                    color="transparent"
                    size="xsmall"
                    // fullWidth
                    value={category.id.toString()}
                    className={styles["category-item-button"]}
                    onClick={(e) => {
                      navigateWithParams(e, "category", ["page"]);
                    }}
                  >
                    {category.name}
                  </Button>
                </li>
              ))
            : categories
                .find((item) => item.id === parentCategoryInfo?.id)
                ?.details?.map((categoryDetail) => (
                  <li
                    key={categoryDetail.id}
                    className={styles["category-detail-item"]}
                  >
                    <Button
                      size="xsmall"
                      color="transparent"
                      className={`${styles["category-detail-item-button"]} ${
                        categoryId === categoryDetail.id ? styles.selected : ""
                      }`}
                      value={categoryDetail.id.toString()}
                      onClick={(e) => {
                        navigateWithParams(e, "category", ["page"]);
                      }}
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
