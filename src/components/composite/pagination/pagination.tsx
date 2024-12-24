import Button from "@/components/atom/button/button";
import styles from "./_pagination.module.scss";
import { ArrowLeft } from "@/svg/arrowLeft";
import { gray60 } from "@/styles/abstracts/colors";
import { ArrowRight } from "@/svg/arrowRight";
import usePagination from "@/hooks/usePagination";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { setQueryParam } from "@/utils/setQueryParam";
import { useAtom } from "jotai";
import { paginationAtom } from "@/store/paginationAtom";
import { ParentComponentType } from "@/types/PaginationType";

export default function Pagination({
  parentComponent,
}: {
  parentComponent: ParentComponentType;
}) {
  const navigate = useNavigate();
  const [paginationState, setPaginationState] = useAtom(paginationAtom);

  const { handlePageClick } = usePagination({
    paginationState: paginationState,
    setPaginationState: setPaginationState,
  });
  const currentPage = paginationState.currentPage;
  const totalPagesLength = paginationState.totalPagesLength ?? 0;
  const middlePages = paginationState.middlePages;
  const isMiddlePageUpdated = paginationState.isMiddlePagesUpdated;

  useEffect(() => {
    const queryParams = setQueryParam("page", currentPage.toString());
    navigate({
      pathname: `/${parentComponent.toLowerCase()}`,
      search: `?${queryParams.toString()}`,
    });
  }, [currentPage]);

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
        onClick={handlePageClick}
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
      {isMiddlePageUpdated ? (
        <>
          <Button
            iconOnly
            icon={<ArrowLeft width={16} height={16} stroke={gray60} />}
            className={styles["page-button"]}
            value={"before"}
            onClick={handlePageClick}
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
            onClick={handlePageClick}
          />
        </>
      ) : null}
    </article>
  );
}
