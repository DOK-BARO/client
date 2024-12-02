import styles from "./_book-list-filter.module.scss";
import Button from "@/components/atom/button/button";
import useBookFilter from "@/hooks/useBookFilter";
import { useAtom } from "jotai";
import { BookFilterAtom } from "@/store/bookAtom";
import useNavigateWithParams from "@/hooks/useNavigateWithParams";

export default function BookListFilter() {
  useBookFilter();
  const [filterCriteria] = useAtom(BookFilterAtom);

  const sortFilter = filterCriteria.sort;
  const { navigateWithParams } = useNavigateWithParams();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigateWithParams(e, "BOOKS", "sort", []);
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
