import { Dispatch } from "react";
import styles from "./_book-list-filter.module.scss";
import Button from "@/components/atom/button/button";
import { SetStateAction } from "jotai";
import { useNavigate } from "react-router-dom";
import { SortFilterType } from "@/types/BookType";
import { setQueryParam } from "@/utils/setQueryParam";

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
    // resetPagination();
    setSortFilter(value as SortFilterType);

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
