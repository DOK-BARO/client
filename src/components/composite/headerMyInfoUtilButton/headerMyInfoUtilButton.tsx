import styles from "./_header_menu_button.module.scss";
import PersonIcon from "@mui/icons-material/Person";
import { useDropDownList } from "@/hooks/useDropDownList.ts";
import Button from "@/components/atom/button/button.tsx";
import HeaderMenuList from "../headerMenuList/headerMenuList.tsx";

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
    <div className={styles["header-menu-container"]} ref={dropDownListRef}>
      <Button
        className={styles["header-menu-button"]}
        onClick={openDropDownList}
      >
        <PersonIcon />
      </Button>
      {isOpenDropDownList && anchorEl && (
        <HeaderMenuList closeDropDownList={closeDropDownList} />
      )}
    </div>
  );
}
