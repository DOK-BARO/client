import styles from "./_list-filter.module.scss";
import Button from "@/components/atom/Button/Button";

interface Props<T> {
  onOptionClick: (filter: T) => void;
  sortFilter: T;
  filterOptions: FilterOptionType<T>[];
}

export interface FilterOptionType<T> {
  filter: T;
  label: string;
}

export default function ListFilter<
  T extends { sort: string; direction: string }
>({ sortFilter, filterOptions, onOptionClick }: Props<T>) {
  return (
    <div className={styles.container}>
      <ul>
        {filterOptions.map((option) => (
          <li key={option.label}>
            <Button
              size="xsmall"
              color="transparent"
              onClick={() => {
                onOptionClick(option.filter);
              }}
              className={`${styles["filter-button"]} ${
                sortFilter.sort === option.filter.sort &&
                sortFilter.direction === option.filter.direction
                  ? styles.active
                  : null
              }`}
            >
              {option.label}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
