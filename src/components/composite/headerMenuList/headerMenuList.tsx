import styles from "./_header_menu_list.module.scss";
import React from "react";
import { Quiz } from "@/svg/quiz.tsx";
import { Study } from "@/svg/study.tsx";
import { Info } from "@/svg/info.tsx";
import { SVGProps } from "@/types/SVGProps.ts";
import { ICON_SIZE } from "@/data/constants.ts";
import { gray70 } from "@/styles/abstracts/colors.ts";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userKeys } from "@/data/queryKeys.ts";
import { useAtom } from "jotai";
import { CurrentUserAtom } from "@/store/userAtom";
import { ErrorType } from "@/types/ErrorType";
import { authService } from "@/services/server/authService";
import toast from "react-hot-toast";
// import { useQueryCurrentUser } from "@/hooks/useQueryCurrentUser.ts";

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
  const [currentUser, setCurrentUser] = useAtom(CurrentUserAtom);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout } = useMutation<void, ErrorType>({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.setQueryData(userKeys.user(), null);
      toast.success("로그아웃 되었습니다.");
      navigate("/");
      setCurrentUser(null);
    },
  });

  const handleLogout = () => {
    closeDropDownList();
    // 로그아웃 로직 추가
    logout();
  };

  const nickName =
    (currentUser?.nickname.length ?? 0) > 5
      ? `${currentUser?.nickname.slice(0, 6) + "..."}`
      : currentUser?.nickname;

  return (
    <ul className={styles["header-menu-list"]}>
      <li className={styles["user-info-container"]}>
        <button
          className={styles["user-info"]}
          onClick={() => {
            navigate("/my");
          }}
        >
          <span className={styles["user-name"]}>{nickName} 님</span>
          <span className={styles["user-email"]}>{currentUser?.email}</span>
        </button>
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
      <li className={styles["logout"]} onClick={handleLogout}>
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
