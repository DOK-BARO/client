import Button from "@/components/atom/button/button";
import styles from "./_breadcrumb.module.scss";
import { ArrowRight } from "@/svg/arrowRight";
import { gray90 } from "@/styles/abstracts/colors";
import useNavigateWithParams from "@/hooks/useNavigateWithParams";

export default function Breadcrumb({
  list,
}: {
  list: ({ id: number; name: string } | null)[];
}) {
  const { navigateWithParams } = useNavigateWithParams();

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
              onClick={(e) =>
                navigateWithParams(e, "BOOKS", "category", ["page"])
              }
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
