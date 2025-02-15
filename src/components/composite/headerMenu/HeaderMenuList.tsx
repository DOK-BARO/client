import styles from "./_header_menu.module.scss";
import React from "react";
import { Quiz } from "@/svg/Quiz";
import { Study } from "@/svg/Study";
import { SVGProps } from "@/types/SVGProps.ts";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { currentUserAtom } from "@/store/userAtom";
import ROUTES from "@/data/routes";
import useLogout from "@/hooks/mutate/useLogout";
import HeaderMenuListItem from "./HeaderMenuItem";
import Button from "@/components/atom/Button/Button";

export interface HeaderMenuListItemType {
  Icon: React.FC<SVGProps>;
  content: string;
  link: string;
}

const headerMenuListItems: HeaderMenuListItemType[] = [
  {
    Icon: Quiz,
    content: "내 퀴즈",
    link: `${ROUTES.MY_MADE_QUIZ}`,
  },
  {
    Icon: Study,
    content: "스터디 관리",
    link: `${ROUTES.MY_STUDY_GROUPS}`,
  },
];

interface Props {
  closeDropDownList: () => void;
}

export default function HeaderMenuList({ closeDropDownList }: Props) {
  const [currentUser] = useAtom(currentUserAtom);
  const { logout } = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    closeDropDownList();
    logout();
  };

  return (
    <ul className={styles["header-menu-list"]}>
      <li>
        <button
          className={styles["user-info-btn"]}
          onClick={() => {
            navigate(ROUTES.MY_PAGE);
            closeDropDownList();
          }}
        >
          <div className={styles["user-name"]}>{currentUser?.nickname} 님</div>
          <div className={styles["user-email"]}>{currentUser?.email}</div>
        </button>
      </li>
      <div className={styles["header-menu-list-item-container"]}>
        {headerMenuListItems.map((item) => (
          <HeaderMenuListItem
            key={item.content}
            Icon={item.Icon}
            content={item.content}
            link={item.link}
            closeDropDownList={closeDropDownList}
          />
        ))}
      </div>
      <li>
        <Button
          size="medium"
          onClick={handleLogout}
          className={styles["logout"]}
        >
          로그아웃
        </Button>
      </li>
    </ul>
  );
}
