import styles from "../../styles/composite/_header_menu_list.module.scss";
import React from "react";
import { QuizIcon } from "../../../public/assets/svg/quiz-icon.tsx";
import { StudyIcon } from "../../../public/assets/svg/study-icon.tsx";
import { InfoIcon } from "../../../public/assets/svg/info-icon.tsx";
import { SVGProps } from "../../types/SVGProps.ts";
import { ICON_SIZE } from "../../data/constants.ts";
import { gray70 } from "../../styles/abstracts/colors.ts";
import localApi from "../../services/local/LocalApi.ts";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { userKeys } from "../../data/queryKeys.ts";

type HeaderMenuListItem = {
  Icon: React.FC<SVGProps>;
  content: string;
}

const iconProps = { width:  ICON_SIZE , height: ICON_SIZE , color: gray70  };

const headerMenuListItems: HeaderMenuListItem[] = [
  {
    "Icon": QuizIcon,
    "content": "내 퀴즈",
  },
  {
    "Icon": StudyIcon,
    "content": "스터디 관리",
  },
  {
    "Icon": InfoIcon,
    "content": "도움말",
  },
];

type Props = {
  closeDropDownList : () => void;
}

export default function HeaderMenuList({ closeDropDownList } : Props){
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const onClickLogout = () => {
    closeDropDownList();
    localApi.removeCertification();
    queryClient.setQueryData(userKeys.user(),null);
    navigate("/");
  };

  return (
    <ul className={styles["header-menu-list"]}>
      <li className={styles["user-info-container"]}>
        <span className={styles["user-name"]}>독바로 님</span>
        <span className={styles["user-email"]}>dokbaro@gmail.com</span>
      </li>
      <div className={styles["header-menu-list-item-container"]}>
        {headerMenuListItems.map((item) => (
          <HeaderMenuListItem key={item.content} Icon={item.Icon} content={item.content}/>
        ))}
      </div>
      <li className={styles["logout"]} onClick={onClickLogout}>로그아웃</li>
    </ul>
  );
}

function HeaderMenuListItem({ Icon, content }: HeaderMenuListItem) {
  return (
    <li className={styles["header-menu-list-item"]}>
      <Icon {...iconProps}/>
      <span>{content}</span>
    </li>
  );
}