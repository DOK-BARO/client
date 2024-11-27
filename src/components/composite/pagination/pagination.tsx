import Button from "@/components/atom/button/button";
import styles from "./_pagination.module.scss";

export default function Pagination({
  currentPage,
  handleClick,
}: {
  currentPage: number;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <article className={styles.pagination}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Button
          size="xsmall"
          key={index}
          onClick={handleClick}
          color={currentPage === index + 1 ? "primary" : "transparent"}
          value={(index + 1).toString()}
        >
          {index + 1}
        </Button>
      ))}
    </article>
  );
}
