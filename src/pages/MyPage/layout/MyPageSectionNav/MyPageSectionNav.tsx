import styles from "./_my_page_section_nav.module.scss";
import Button from "@/components/atom/Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { SectionNavType } from "@/types/SectionNavType";
import { useEffect, useState } from "react";

interface Prop {
  sectionNavList: SectionNavType[];
}

export default function MyPageSectionNav({ sectionNavList }: Prop) {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [isSubNavItemClicked, setIsSubNavItemClicked] =
    useState<boolean>(false);

  useEffect(() => {
    const currentPath = location.pathname.replace("/my/", "");
    setActiveLink(currentPath);
  }, [location.pathname]);

  const handleSectionChange = (
    e: React.MouseEvent<HTMLButtonElement>,
    isSubNavItem: boolean = false
  ) => {
    const { value } = e.currentTarget;
    setActiveLink(value);
    navigate(value);
    setIsSubNavItemClicked(isSubNavItem);
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
              <ul
                className={`${styles["sub-steps"]} ${
                  isSubNavItemClicked ? styles["is-visible"] : ""
                }}`}
              >
                {sectionNavItem.subTitles &&
                  sectionNavItem.subTitles.map((subNavItem, index: number) => (
                    <li key={index}>
                      <Button
                        value={subNavItem.link}
                        onClick={(e) => handleSectionChange(e, true)}
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
