import { useState } from "react";
import styles from "./_gnb.module.scss";
import { Plus } from "@/svg/plus";
import { Minus } from "@/svg/minus";
import { gray50 } from "@/styles/abstracts/colors";
import { getBookCategories } from "@/services/server/bookService.ts";
import { useQuery } from "@tanstack/react-query";
import { bookKeys } from "@/data/queryKeys";
import Button from "@/components/atom/button/button";
import useGNB from "@/hooks/useGNB";

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
    queryFn: getBookCategories,
  });

  if (isLoading) {
    return <div>loading</div>;
  }
  if (!categories) {
    return <div>book categories page error!!</div>;
  }

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
              <h2
                className={`${
                  activeCategoryIndex === index ? styles["hover"] : ""
                }`}
              >
                {category.name}
              </h2>
            </li>
          ))}
        </ul>
        {categories?.map((category, index) => (
          <div className={styles["category-item"]} key={index}>
            {activeCategoryIndex === index && (
              <ul className={styles["sub-category-list"]}>
                {category.details?.map((subCategory, subCategoryId) => (
                  <li key={subCategoryId}>
                    <span>
                      <a href={`/${subCategory.name}`}>
                        <h3>{subCategory.name}</h3>
                      </a>
                      {subCategory?.details?.length ?? 0 > 0 ? (
                        <Button
                          onClick={() => {
                            toggleSubCategory(subCategoryId);
                          }}
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
                            <a href={`/${detail.name}`}>
                              <h4>{detail.name}</h4>
                            </a>
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
