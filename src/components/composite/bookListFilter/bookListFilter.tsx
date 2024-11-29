import { Dispatch } from "react";
import styles from "./_book-list-filter.module.scss";
import Button from "@/components/atom/button/button";
import { SetStateAction } from "jotai";
import { useNavigate } from "react-router-dom";
import { SortFilterType } from "@/types/BookType";

export default function BookListFilter({
  setSortFilter,
  sortFilter,
}: {
  setSortFilter: Dispatch<SetStateAction<SortFilterType>>;
  sortFilter: SortFilterType;
}) {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.target as HTMLButtonElement;
    const queryParams = new URLSearchParams(window.location.search);
    setSortFilter(value as SortFilterType);

    queryParams.set("sort", value);
    navigate(`?${queryParams.toString()}`, { replace: true });
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
