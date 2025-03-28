import styles from "./_header_menu.module.scss";
import React from "react";
import { Quiz } from "@/svg/Quiz";
import { Study } from "@/svg/Study";
import { Setting } from "@/svg/header/Setting";
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
  {
    Icon: Setting,
    content: "계정 설정",
    link: `${ROUTES.SETTINGS}`,
  },
];

interface Props {
  closeDropDownList: () => void;
}

export default function HeaderMenuList({ closeDropDownList }: Props) {
  const [currentUser] = useAtom(currentUserAtom);
  const { logout } = useLogout();
  const navigate = useNavigate();
  const userNickname =
    (currentUser?.nickname?.length ?? 0) > 6
      ? currentUser?.nickname.slice(0, 6) + "..."
      : currentUser?.nickname;

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
            navigate(`${ROUTES.MY_PAGE}/${ROUTES.SETTINGS}`);
            closeDropDownList();
          }}
        >
          <div className={styles["user-name"]}>{userNickname} 님</div>
        </button>
      </li>
      <ul className={styles["header-menu-list-item-container"]}>
        {headerMenuListItems.map((item) => (
          <HeaderMenuListItem
            key={item.content}
            Icon={item.Icon}
            content={item.content}
            link={item.link}
            closeDropDownList={closeDropDownList}
          />
        ))}
      </ul>
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
