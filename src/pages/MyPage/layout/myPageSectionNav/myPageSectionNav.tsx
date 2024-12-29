import styles from "./_my_page_section_nav.module.scss";
import Button from "@/components/atom/button/button";
import { useNavigate } from "react-router-dom";
import { SectionNavType } from "@/types/SectionNavType";
import { useState } from "react";

interface Prop {
  sectionNavList: SectionNavType[];
}

export default function MyPageSectionNav({ sectionNavList }: Prop) {
  const navigate = useNavigate();

  const [activeLink, setActiveLink] = useState<string | null>(null);

  const handleSectionChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;
    setActiveLink(value);
    navigate(value);
  };

  return (
    <aside className={styles["container"]}>
      <ul>
        {sectionNavList.map((sectionNavItem, index: number) => {
          return (
            <li
              key={index}
              className={`${styles["steps"]} ${
                sectionNavItem.subTitles ? styles["have-sub-step"] : ""
              }`}
            >
              <Button
                onClick={handleSectionChange}
                value={sectionNavItem.link}
                fullWidth
                color={
                  activeLink === sectionNavItem.link ? "white" : "transparent"
                } // 클릭된 버튼만 색상 변경
              >
                {sectionNavItem.title}
              </Button>
              <ul className={styles["sub-steps-container"]}>
                {sectionNavItem.subTitles &&
                  sectionNavItem.subTitles.map((subNavItem, index: number) => (
                    <li key={index}>
                      <Button
                        value={subNavItem.link}
                        onClick={handleSectionChange}
                        className={styles["sub-steps"]}
                        color={
                          activeLink === subNavItem.link
                            ? "white"
                            : "transparent"
                        } // 서브 버튼 색상 변경
                        fullWidth
                      >
                        <div style={{ width: 20, height: 20 }} />
                        {subNavItem.title}
                      </Button>
                    </li>
                  ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
