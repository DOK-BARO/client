import Button from "@/components/atom/Button/Button";
import styles from "./_breadcrumb.module.scss";
import { ArrowRight } from "@/svg/ArrowRight";
import { gray90 } from "@/styles/abstracts/colors";
import useNavigateWithParams from "@/hooks/useNavigateWithParams";
import { ParentPage } from "@/types/PaginationType";

export interface ListItem {
  id: number;
  name: string;
}
interface Props {
  list: (ListItem | null)[];
  parentPage: ParentPage;
}
export default function Breadcrumb({ list, parentPage }: Props) {
  const { navigateWithParams } = useNavigateWithParams(parentPage);

  const isAllNull = list.every((item) => item === null);
  if (isAllNull) {
    return null;
  }
  if (!list[0]) {
    list.shift();
  }

  const handleClick = (id: string | undefined) => {
    // navigateWithParams(id, "BOOKS", ["category"], ["page"]);
    navigateWithParams({
      category: id,
      parentPage: "books",
      excludeParams: ["page"],
    });
  };

  return (
    <nav className={styles.breadcrumb}>
      <ol className={styles["breadcrumb-list"]}>
        {list.map((item, index) => (
          <li
            className={styles["breadcrumb-list-item-container"]}
            key={item?.id}
          >
            <Button
              size="xsmall"
              color="transparent"
              className={`${styles["breadcrumb-list-item"]} ${
                index === list.length - 1 ? styles["last-item"] : null
              }`}
              value={item?.id.toString()}
              onClick={() => handleClick(item?.id.toString())}
            >
              {item?.name || null}
            </Button>
            {index !== list.length - 1 ? (
              <ArrowRight width={20} height={20} stroke={gray90} alt="" />
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
