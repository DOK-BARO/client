import Button from "@/components/atom/button/button";
import styles from "./_pagination.module.scss";
import { ArrowLeft } from "@/svg/arrowLeft";
import { gray60 } from "@/styles/abstracts/colors";
import { ArrowRight } from "@/svg/arrowRight";
import usePagination from "@/hooks/usePagination";

export default function Pagination({
  totalPagesLength,
}: {
  totalPagesLength: number;
}) {
  const { currentPage, handleClick, middlePages } = usePagination({
    initialPage: 1,
    totalPagesLength: totalPagesLength,
  });

  const renderButton = (page: number, isEllipsis: boolean = false) => {
    if (isEllipsis) {
      return (
        <span key={`ellipsis-${page}`} className={styles.ellipsis}>
          ...
        </span>
      );
    }
    return (
      <Button
        key={page}
        size="xsmall"
        onClick={handleClick}
        value={page.toString()}
        color="transparent"
        className={
          currentPage === page ? styles["page-button"] : styles.inActive
        }
      >
        {page}
      </Button>
    );
  };

  return (
    <article className={styles.pagination}>
      <Button
        iconOnly
        icon={<ArrowLeft width={16} height={16} stroke={gray60} />}
        className={styles["page-button"]}
        value={"before"}
        onClick={handleClick}
      />

      <span className={styles["page-container"]}>
        {renderButton(1)}
        {middlePages[0] > 2 && renderButton(-1, true)}
        {middlePages.map((page) => renderButton(page))}
        {middlePages[middlePages.length - 1] < totalPagesLength - 1 &&
          renderButton(totalPagesLength + 1, true)}
        {renderButton(totalPagesLength)}
      </span>

      <Button
        iconOnly
        icon={<ArrowRight width={16} height={16} stroke={gray60} />}
        className={styles["page-button"]}
        value={"next"}
        onClick={handleClick}
      />
    </article>
  );
}
