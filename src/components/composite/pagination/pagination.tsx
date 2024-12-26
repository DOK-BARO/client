import Button from "@/components/atom/button/button";
import styles from "./_pagination.module.scss";
import { ArrowLeft } from "@/svg/arrowLeft";
import { gray60 } from "@/styles/abstracts/colors";
import { ArrowRight } from "@/svg/arrowRight";
import usePagination from "@/hooks/usePagination";
import { useNavigate } from "react-router-dom";
import { Dispatch, SetStateAction, useEffect } from "react";
import { setQueryParam } from "@/utils/setQueryParam";
import { PaginationType, ParentPage } from "@/types/PaginationType";

// TODO: 직관적으로 (변수명 등)
interface Props {
  parentPage?: ParentPage; // 쿼리스트링
  paginationState: PaginationType; // 상태
  setPaginationState: Dispatch<SetStateAction<PaginationType>>; // 상태
}

export default function Pagination({
  parentPage,
  paginationState,
  setPaginationState,
}: Props) {
  const navigate = useNavigate();

  const { handlePageClick } = usePagination({
    paginationState,
    setPaginationState,
  });

  const currentPage = paginationState.currentPage;
  const totalPagesLength = paginationState.totalPagesLength ?? 0;
  const middlePages = paginationState.middlePages;
  const isMiddlePageUpdated = paginationState.isMiddlePagesUpdated;

  useEffect(() => {
    if (!parentPage) {
      return;
    }
    const queryParams = setQueryParam("page", currentPage.toString());
    navigate({
      pathname: `/${parentPage}`,
      search: `?${queryParams.toString()}`,
    });
  }, [currentPage]);

  // 페이지 번호 버튼
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

  return isMiddlePageUpdated ? (
    <article className={styles.pagination}>
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
        {1 !== totalPagesLength ? renderButton(totalPagesLength) : null}
      </span>
      <Button
        iconOnly
        icon={<ArrowRight width={16} height={16} stroke={gray60} />}
        className={styles["page-button"]}
        value={"next"}
        onClick={handlePageClick}
      />
    </article>
  ) : null;
}
