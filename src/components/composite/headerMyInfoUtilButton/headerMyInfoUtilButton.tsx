import styles from "./_header_menu_button.module.scss";
import { useDropDownList } from "@/hooks/useDropDownList.ts";
import Button from "@/components/atom/button/button.tsx";
import HeaderMenuList from "../headerMenuList/headerMenuList.tsx";
import { Person } from "@/svg/person.tsx";

type Props = {
  isLoggedIn: boolean;
};

export default function HeaderMyInfoUtilButton({ isLoggedIn }: Props) {
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
    <div className={styles["header-my-info-util-container"]} ref={dropDownListRef}>
      <Button
        className={styles["header-my-info-util-button"]}
        onClick={openDropDownList}
      >
        <Person width={40} height={40} />
      </Button>
      {isOpenDropDownList && anchorEl && (
        <HeaderMenuList closeDropDownList={closeDropDownList} />
      )}
    </div>
  );
}
