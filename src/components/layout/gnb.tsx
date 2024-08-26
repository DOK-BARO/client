import { useState } from "react";
import styles from "../../styles/layout/_gnb.module.scss";
import { Plus } from "../../../public/assets/svg/plus";
import { Minus } from "../../../public/assets/svg/minus";
import { gray50 } from "../../styles/abstracts/colors";
import { getBookCategories } from "../../services/bookService";
import { useQuery } from "@tanstack/react-query";
import { bookKeys } from "../../data/queryKeys";

const GNB = () => {
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

  return (
    <nav
      className={styles["gnb"]}
      onMouseLeave={() => {
        // setActiveCategoryIndex(null);
      }}
    >
      <div className={styles["gnb-inner-container"]}>
        <ul className={styles["category-list"]}>
          {categories?.map((category, index) => (
            <li
              key={index}
              onMouseEnter={() => {
                setActiveCategoryIndex(index);
                setExpandedSubCategories({});
              }}
            >
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
                        <button
                          onClick={() => {
                            toggleSubCategory(subCategoryId);
                          }}
                        >
                          {expandedSubCategories[subCategoryId] ? (
                            <Minus stroke={gray50} width={20} />
                          ) : (
                            <Plus stroke={gray50} width={20} />
                          )}
                        </button>
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
};

export default GNB;
