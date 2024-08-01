import React, { useState } from "react";
import styles from "../../styles/layout/_gnb.module.scss";
import Button from "../atom/button";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { gray90 } from "../../styles/abstracts/colors";
export interface Category {
  title: string;
  subCategories: SubCategory[];
}
export interface SubCategory {
  title: string;
  topics: topic[];
}
export interface topic {
  title: string;
  // books: string[];
}
export interface GNBProps {
  categories: Category[]; // 소프트스킬, 하드스킬
}

const GNB: React.FC<GNBProps> = ({
  categories,
}: {
  categories: Category[];
}) => {
  const [skillCategoryIndex, setSkillCategoryIndex] = useState<number>(0);
  return (
    <nav className={styles[""]}>
      <div className={styles["skillCategory-list"]}>
        {categories.map((skillCategory, categoryIndex) => (
          <h2 key={categoryIndex}>
            <Button
              size="large"
              className={`${styles["skillCategory-button"]} ${
                skillCategoryIndex === categoryIndex ? styles["active"] : ""
              }`}
              onClick={() => {
                console.log(skillCategory.title);
                setSkillCategoryIndex(categoryIndex);
              }}
            >
              {skillCategory.title}
            </Button>
          </h2>
        ))}
      </div>
      {categories.map((skillCategory, categoryIndex) => (
        <div className={styles["skillCategory-item"]} key={categoryIndex}>
          {skillCategoryIndex === categoryIndex && (
            <ul className={styles["subCategory-list"]}>
              {skillCategory.subCategories.map(
                (subCategory, subCategoryIndex) => (
                  <li
                    className={styles["subCategory-item"]}
                    key={subCategoryIndex}
                  >
                    <h3>
                      <a href={`/${subCategory.title}`}>
                        {subCategory.title}
                        <ChevronRightIcon
                          width={20}
                          height={20}
                          stroke={gray90}
                        />
                        {/* <img src={chevronRight} alt="이동하기"></img> */}
                      </a>
                    </h3>
                    <ul className={styles["topic-list"]}>
                      {subCategory.topics.map((topic, topicIndex) => (
                        <li className={styles["topic-item"]} key={topicIndex}>
                          <h4>
                            <a href={`/${topic.title}`}>{topic.title}</a>
                          </h4>
                        </li>
                      ))}
                    </ul>
                  </li>
                )
              )}
            </ul>
          )}
        </div>
      ))}
    </nav>
  );
};

export default GNB;
