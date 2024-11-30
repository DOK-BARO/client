import styles from "./_book-list-filter.module.scss";
import Button from "@/components/atom/button/button";
import { useNavigate } from "react-router-dom";
import { setQueryParam } from "@/utils/setQueryParam";
import useBookFilter from "@/hooks/useBookFilter";
import { useAtom } from "jotai";
import { BookFilterAtom } from "@/store/bookAtom";

export default function BookListFilter() {
  const navigate = useNavigate();
  useBookFilter();
  const [filterCriteria] = useAtom(BookFilterAtom);

  const sortFilter = filterCriteria.sort;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.target as HTMLButtonElement;
    const queryParams = setQueryParam("sort", value);

    navigate({
      pathname: "/books",
      search: `?${queryParams.toString()}`,
    });
  };

  return (
    <div className={styles["book-list-filter"]}>
      <ul>
        <Button
          size="xsmall"
          color="transparent"
          value="TITLE"
          onClick={handleClick}
          className={`${styles["filter-button"]} ${
            sortFilter === "TITLE" ? styles.active : null
          }`}
        >
          가나다순
        </Button>
        <Button
          size="xsmall"
          color="transparent"
          value="QUIZ_COUNT"
          onClick={handleClick}
          className={`${styles["filter-button"]} ${
            sortFilter === "QUIZ_COUNT" ? styles.active : null
          }`}
        >
          퀴즈순
        </Button>
      </ul>
    </div>
  );
}
