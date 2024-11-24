import Button from "@/components/atom/button/button";
import styles from "./_breadcrumb.module.scss";
import arrowRight from "/assets/svg/bookList/arrowRight.svg";
import { useNavigate } from "react-router-dom";

export default function Breadcrumb({
  list,
}: {
  list: ({ id: number; name: string } | null)[];
}) {
  const navigate = useNavigate();

  const isAllNull = list.every((item) => item === null);
  if (isAllNull) {
    return null;
  }
  if (!list[0]) {
    list.shift();
  }

  return (
    <nav className={styles.breadcrumb}>
      <ol className={styles["breadcrumb-list"]}>
        {list.map((item, index) => (
          <li className={styles["breadcrumb-list-item-container"]}>
            <Button
              size="xsmall"
              color="transparent"
              className={`${styles["breadcrumb-list-item"]} ${
                index === list.length - 1 ? styles["last-item"] : null
              }`}
              onClick={() => {
                navigate(`/book-list/${item?.id}`);
              }}
            >
              {item?.name || null}
            </Button>
            {index !== list.length - 1 ? (
              <img src={arrowRight} width={20} height={20} />
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
