import { useState } from "react";
import styles from "./_gnb.module.scss";
import { Plus } from "@/svg/plus";
import { Minus } from "@/svg/minus";
import { gray50 } from "@/styles/abstracts/colors";
import { useQuery } from "@tanstack/react-query";
import { bookKeys } from "@/data/queryKeys";
import Button from "@/components/atom/Button/Button";
import useGNB from "@/hooks/useGNB";
import useNavigateWithParams from "@/hooks/useNavigateWithParams";
import { bookService } from "@/services/server/bookService";

// Book Category GNB
export default function GNB() {
  const { isGNBHidden } = useGNB();
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number | null>(
    null
  );
  const [expandedSubCategories, setExpandedSubCategories] = useState<{
    [key: number]: boolean;
  }>({});

  const { data: categories, isLoading } = useQuery({
    queryKey: bookKeys.categories(),
    queryFn: bookService.fetchBookCategories,
  });
  const { navigateWithParams } = useNavigateWithParams("books");

  if (isLoading) {
    return <div>loading</div>;
  }
  if (!categories) {
    return <div>book categories page error!!</div>;
  }

  const handleClick = (id: string) => {
    // navigateWithParams(e, "BOOKS", "category", ["page"]);
    navigateWithParams({
      parentPage: "books",
      category: id,
      excludeParams: ["page"],
    });
  };

  const toggleSubCategory = (subCategoryId: number) => {
    setExpandedSubCategories((prev) => ({
      ...prev,
      [subCategoryId]: !prev[subCategoryId],
    }));
  };

  const handleMouseLeave = () => {
    setActiveCategoryIndex(null);
  };

  const handleMouseEnter = (index: number) => {
    setActiveCategoryIndex(index);
    setExpandedSubCategories({});
  };

  // TODO: heading 태그 다른 태그로 변경하기
  return (
    <nav
      className={`${styles.gnb} ${isGNBHidden ? styles.hidden : ""}`}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles["gnb-inner-container"]}>
        <ul className={styles["category-list"]}>
          {categories?.map((category, index) => (
            <li key={index} onMouseEnter={() => handleMouseEnter(index)}>
              <Button
                className={`${styles["category-item-title"]} ${
                  activeCategoryIndex === index ? styles["hover"] : ""
                }`}
                color="transparent"
                value={category.id.toString()}
                onClick={() => handleClick(category.id.toString())}
              >
                {category.name}
              </Button>
            </li>
          ))}
        </ul>
        {categories?.map((category, index) => (
          <div className={styles["category-item"]} key={index}>
            {activeCategoryIndex === index && (
              <ul className={styles["sub-category-list"]}>
                {category.details?.map((subCategory, subCategoryId) => (
                  <li key={subCategoryId}>
                    <span
                      className={styles["sub-category-item-button-container"]}
                    >
                      <Button
                        color="transparent"
                        size="small"
                        value={subCategory.id.toString()}
                        onClick={() => handleClick(subCategory.id.toString())}
                        className={styles["sub-category-item"]}
                      >
                        {subCategory.name}
                      </Button>
                      {subCategory?.details?.length ?? 0 > 0 ? (
                        <Button
                          onClick={() => {
                            toggleSubCategory(subCategoryId);
                          }}
                          className={styles.more}
                          iconOnly
                        >
                          {expandedSubCategories[subCategoryId] ? (
                            <Minus stroke={gray50} width={20} height={20} />
                          ) : (
                            <Plus stroke={gray50} width={20} height={20} />
                          )}
                        </Button>
                      ) : null}
                    </span>

                    {expandedSubCategories[subCategoryId] && (
                      <ul className={styles["sub-category-detail-list"]}>
                        {subCategory?.details?.map((detail, detailIndex) => (
                          <li key={detailIndex}>
                            <Button
                              size="small"
                              color="transparent"
                              className={styles["sub-category-detail-item"]}
                              value={detail.id.toString()}
                              onClick={() => handleClick(detail.id.toString())}
                            >
                              {detail.name}
                            </Button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
