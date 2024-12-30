import styles from "./_header_menu_button.module.scss";
import { useDropDownList } from "@/hooks/useDropDownList.ts";
import Button from "@/components/atom/Button/Button.tsx";
import HeaderMenuList from "../headerMenuList/headerMenuList.tsx";
import { Person } from "@/svg/person.tsx";
import { UserType } from "@/types/UserType.ts";

type Props = {
  isLoggedIn: boolean;
  currentUser: UserType | null;
};

export default function HeaderMyInfoUtilButton({
  isLoggedIn,
  currentUser,
}: Props) {
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
            <img src={currentUser.profileImage ?? ""} width={40} height={40} />
          ) : (
            <Person width={40} height={40} />
          )
        }
      />
      {isOpenDropDownList && anchorEl && (
        <HeaderMenuList closeDropDownList={closeDropDownList} />
      )}
    </div>
  );
}
