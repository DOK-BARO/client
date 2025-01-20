import styles from "./_my_page_section_nav.module.scss";
import Button from "@/components/atom/Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { SectionNavType } from "@/types/SectionNavType";
import { useEffect, useState } from "react";
import { isNumberString } from "@/utils/isNumberString";
import { useAtom } from "jotai";
import { currentUserAtom } from "@/store/userAtom";
interface Prop {
  sectionNavList: SectionNavType[];
}

const calculateActiveLink = (pathname: string): string | null => {
  const paths = pathname.split("/");
  const basePath = paths[1] === "my" ? paths[2] : null;
  const subPath = paths[3];

  return subPath === undefined || isNumberString(subPath)
    ? basePath || ""
    : `${basePath}/${subPath}`;
};

export default function MyPageSectionNav({ sectionNavList }: Prop) {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser] = useAtom(currentUserAtom);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [isSubNavItemClicked, setIsSubNavItemClicked] =
    useState<boolean>(false);

  useEffect(() => {
    setActiveLink(calculateActiveLink(location.pathname));
  }, [location.pathname]);

  // activeLink 업데이트 및 navigate
  const handleSectionChange = (
    e: React.MouseEvent<HTMLButtonElement>,
    isSubNavItem: boolean = false,
  ) => {
    const { value } = e.currentTarget;
    setActiveLink(calculateActiveLink(value));
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
                  sectionNavItem.subTitles.map((subNavItem, index: number) => {
                    const isEmailAuthType: boolean =
                      currentUser?.accountType === "EMAIL";
                    const isCurrentTitlePassword: boolean =
                      subNavItem.title === "비밀번호 변경";
                    // console.log(`${sectionNavItem.title}1111"`);
                    if (!isEmailAuthType && isCurrentTitlePassword) {
                      // console.log(`${isEmailAuthType}!!!"`);
                      return null;
                    }
                    return (
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
                    );
                  })}
              </ul>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
