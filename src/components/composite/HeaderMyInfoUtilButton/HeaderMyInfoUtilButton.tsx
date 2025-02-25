import styles from "./_header_menu_button.module.scss";
import { useDropDownList } from "@/hooks/useDropDownList.ts";
import Button from "@/components/atom/Button/Button.tsx";
import { Person } from "@/svg/Person.tsx";
import { useAtom } from "jotai";
import { isLoggedInAtom } from "@/store/userAtom.ts";
import { currentUserAtom } from "@/store/userAtom.ts";
import defaultImage from "/public/assets/svg/header/defaultProfile.svg";
import HeaderMenuList from "../headerMenu/HeaderMenuList";

export default function HeaderMyInfoUtilButton() {
  const [isLoggedIn] = useAtom(isLoggedInAtom);
  const [currentUser] = useAtom(currentUserAtom);

  const {
    isOpenDropDownList,
    anchorEl,
    openDropDownList,
    closeDropDownList,
    dropDownListRef,
  } = useDropDownList();

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div
      className={styles["header-my-info-util-container"]}
      ref={dropDownListRef}
    >
      <Button
        color="transparent"
        onClick={openDropDownList}
        iconOnly
        className={styles.profile}
        icon={
          currentUser ? (
            <img
              src={currentUser.profileImage ?? defaultImage}
              width={40}
              height={40}
              alt={`${currentUser.nickname}님의 프로필 사진`}
            />
          ) : (
            <Person width={40} height={40} alt="기본 프로필 사진" />
          )
        }
      />
      {isOpenDropDownList && anchorEl && (
        <HeaderMenuList closeDropDownList={closeDropDownList} />
      )}
    </div>
  );
}
