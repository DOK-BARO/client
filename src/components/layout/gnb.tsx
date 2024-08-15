import React, { useState } from "react";
import styles from "../../styles/layout/_gnb.module.scss";
import { Plus } from "../../../public/assets/svg/plus";
import { Minus } from "../../../public/assets/svg/minus";
import { gray50 } from "../../styles/abstracts/colors";
import { Category, GNBProps } from "../../types/GNBCategoryType";

const GNB: React.FC<GNBProps> = ({
  categories,
}: {
  categories: Category[];
}) => {
  const [skillCategoryIndex, setSkillCategoryIndex] = useState<number>(0);
  const [openSubCategories, setOpenSubCategories] = useState<{
    [key: number]: boolean;
  }>({});

  const toggleTopics = (subCategoryIndex: number) => {
    setOpenSubCategories((prev) => ({
      ...prev,
      [subCategoryIndex]: !prev[subCategoryIndex],
    }));
  };

  return (
    <nav className={styles[""]}>
      <div className={styles["gnb-inner-container"]}>
        <ul className={styles["skillCategory-list"]}>
          {categories.map((skillCategory, categoryIndex) => (
            <li
              key={categoryIndex}
              className={`${styles["skillCategory-title"]} ${
                skillCategoryIndex === categoryIndex ? styles["hover"] : ""
              }`}
              onMouseEnter={() => {
                setSkillCategoryIndex(categoryIndex);
                setOpenSubCategories({});
              }}
            >
              <h2>{skillCategory.title}</h2>
            </li>
          ))}
        </ul>
        {categories.map((skillCategory, categoryIndex) => (
          <div className={styles["skillCategory-item"]} key={categoryIndex}>
            {skillCategoryIndex === categoryIndex && (
              <ul className={styles["subCategory-list"]}>
                {skillCategory?.subCategories?.map(
                  (subCategory, subCategoryIndex) => (
                    <li
                      className={styles["subCategory-item"]}
                      key={subCategoryIndex}
                    >
                      <span>
                        <a href={`/${subCategory.title}`}>
                          <h3>{subCategory.title}</h3>
                        </a>
                        {subCategory?.topics ? (
                          <button
                            onClick={() => {
                              toggleTopics(subCategoryIndex);
                            }}
                          >
                            {openSubCategories[subCategoryIndex] ? (
                              <Minus stroke={gray50} width={20} />
                            ) : (
                              <Plus stroke={gray50} width={20} />
                            )}
                          </button>
                        ) : null}
                      </span>

                      {openSubCategories[subCategoryIndex] && (
                        <ul className={styles["topic-list"]}>
                          {subCategory?.topics?.map((topic, topicIndex) => (
                            <li
                              className={styles["topic-item"]}
                              key={topicIndex}
                            >
                              <a href={`/${topic.title}`}>
                                <h4>{topic.title}</h4>
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  )
                )}
              </ul>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default GNB;
