import Button from "@/components/atom/button/button";
import styles from "./_breadcrumb.module.scss";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "@/svg/arrowRight";
import { gray90 } from "@/styles/abstracts/colors";
import { setQueryParam } from "@/utils/setQueryParam";

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

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.target as HTMLButtonElement;
    const queryParams = setQueryParam("category", value);
    queryParams.delete("page");
    queryParams.delete("sort");

    navigate({
      pathname: "/books",
      search: `?${queryParams.toString()}`,
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
              onClick={handleClick}
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
