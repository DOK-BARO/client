// Book Category Local Navigation Bar
import styles from "./_lnb.module.scss";
import Button from "@/components/atom/Button/Button";
import { useNavigate } from "react-router-dom";
import { BookCategoryType } from "@/types/GNBCategoryType";
import { findTopParentCategoryInfo } from "@/utils/findCategoryInfo";
import { ArrowLeft } from "@/svg/ArrowLeft";
import { gray90 } from "@/styles/abstracts/colors";
import useNavigateWithParams from "@/hooks/useNavigateWithParams";
import ROUTES from "@/data/routes";

// Book Category GNB

interface Props {
  categories: BookCategoryType[];
  categoryId?: number;
}

export default function LNB({ categories, categoryId }: Props) {
  const navigate = useNavigate();
  const { navigateWithParams } = useNavigateWithParams();
  // const [, setPrevPaginationState] = useAtom(prevPaginationStateAtom);

  if (!categories) {
    return <div>book categories page error!!</div>;
  }

  const parentCategoryInfo = categoryId
    ? findTopParentCategoryInfo(categories, categoryId)
    : null;

  const handleClick = (id: string | undefined) => {
    // setPrevPaginationState(undefined);
    navigateWithParams({
      category: id,
      parentPage: "books",
      excludeParams: ["page"],
    });
  };

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
                  <ArrowLeft alt="" width={20} height={20} stroke={gray90} />
                }
                iconOnly
                onClick={() => navigate(ROUTES.BOOK_LIST)}
                ariaLabel="뒤로가기"
              />
              <Button
                size="xsmall"
                color="transparent"
                className={styles["parent-category-name"]}
                value={parentCategoryInfo?.id.toString()}
                onClick={() => handleClick(parentCategoryInfo?.id.toString())}
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
                    value={category.id.toString()}
                    className={styles["category-item-button"]}
                    onClick={() => handleClick(category.id.toString())}
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
                      onClick={() => handleClick(categoryDetail.id.toString())}
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
