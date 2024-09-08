import Button from "../atom/button.tsx";
import styles from "../../styles/composite/_header_menu_button.module.scss";
import PersonIcon from "@mui/icons-material/Person";
import { useDropDownList } from "../../hooks/useDropDownList.ts";
import HeaderMenuList from "./headerMenuList.tsx";

type Props = {
  isLoggedIn: boolean;
}

export default function HeaderMyInfoUtilButton({ isLoggedIn }: Props) {
  const { isOpenDropDownList, anchorEl, openDropDownList, closeDropDownList, dropDownListRef } = useDropDownList();

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className={styles["header-menu-container"]} ref={dropDownListRef}>
      <Button className={styles["header-menu-button"]} onClick={openDropDownList}>
        <PersonIcon />
      </Button>
      {isOpenDropDownList && anchorEl && <HeaderMenuList closeDropDownList={closeDropDownList}/>}
    </div>
  );
}


