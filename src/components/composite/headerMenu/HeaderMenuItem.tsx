import styles from "./_header_menu.module.scss";
import ROUTES from "@/data/routes";
import { useNavigate } from "react-router-dom";
import { HeaderMenuListItemType } from "./HeaderMenuList";
import { ICON_SIZE } from "@/data/constants";
import { gray70 } from "@/styles/abstracts/colors";
import Button from "@/components/atom/Button/Button";
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
    <li>
      <Button
        className={styles["header-menu-list-item"]}
        onClick={() => handleItemClick(link)}
        iconPosition="left"
        icon={<Icon {...iconProps} alt="" />}
      >
        {content}
      </Button>
    </li>
  );
}
