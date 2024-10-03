import styles from "./_header_menu_list.module.scss";
import React from "react";
import { Quiz } from "@/svg/quiz.tsx";
import { Study } from "@/svg/study.tsx";
import { Info } from "@/svg/info.tsx";
import { SVGProps } from "@/types/SVGProps.ts";
import { ICON_SIZE } from "@/data/constants.ts";
import { gray70 } from "@/styles/abstracts/colors.ts";
import localApi from "@/services/local/LocalApi.ts";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { userKeys } from "@/data/queryKeys.ts";
import { useQueryCurrentUser } from "@/hooks/useQueryCurrentUser.ts";

type HeaderMenuListItem = {
  Icon: React.FC<SVGProps>;
  content: string;
};

const iconProps = { width: ICON_SIZE, height: ICON_SIZE, color: gray70 };

const headerMenuListItems: HeaderMenuListItem[] = [
  {
    Icon: Quiz,
    content: "내 퀴즈",
  },
  {
    Icon: Study,
    content: "스터디 관리",
  },
  {
    Icon: Info,
    content: "도움말",
  },
];

type Props = {
  closeDropDownList: () => void;
};

export default function HeaderMenuList({ closeDropDownList }: Props) {
  const { user, isLoading } = useQueryCurrentUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const onClickLogout = () => {
    closeDropDownList();
    localApi.removeCertification();
    queryClient.setQueryData(userKeys.user(), null);
    navigate("/");
  };

  if (isLoading) {
    return <></>;
  }

  return (
    <ul className={styles["header-menu-list"]}>
      <li className={styles["user-info-container"]}>
        <span className={styles["user-name"]}>{user?.nickname} 님</span>
        <span className={styles["user-email"]}>{user?.email}</span>
      </li>
      <div className={styles["header-menu-list-item-container"]}>
        {headerMenuListItems.map((item) => (
          <HeaderMenuListItem
            key={item.content}
            Icon={item.Icon}
            content={item.content}
          />
        ))}
      </div>
      <li className={styles["logout"]} onClick={onClickLogout}>
        로그아웃
      </li>
    </ul>
  );
}

function HeaderMenuListItem({ Icon, content }: HeaderMenuListItem) {
  return (
    <li className={styles["header-menu-list-item"]}>
      <Icon {...iconProps} />
      <span>{content}</span>
    </li>
  );
}
