import styles from "./_header_menu.module.scss";
import ROUTES from "@/data/routes";
import { useNavigate } from "react-router-dom";
import { HeaderMenuListItemType } from "./HeaderMenuList";
import { ICON_SIZE } from "@/data/constants";
import { gray70 } from "@/styles/abstracts/colors";

interface Props extends HeaderMenuListItemType {
  closeDropDownList: () => void;
}

export default function HeaderMenuListItem({
  Icon,
  content,
  link,
  closeDropDownList,
}: Props) {
  const iconProps = { width: ICON_SIZE, height: ICON_SIZE, color: gray70 };

  const navigate = useNavigate();

  const handleItemClick = (link: string) => {
    navigate(`${ROUTES.MY_PAGE}/${link}`);
    closeDropDownList();
  };

  return (
    <li
      className={styles["header-menu-list-item"]}
      onClick={() => handleItemClick(link)}
    >
      <Icon {...iconProps} />
      <span>{content}</span>
    </li>
  );
}
