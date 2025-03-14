import Button from "@/components/atom/Button/Button";
import styles from "./_pagination.module.scss";
import { ArrowLeft } from "@/svg/ArrowLeft";
import { gray60 } from "@/styles/abstracts/colors";
import { ArrowRight } from "@/svg/ArrowRight";
import { Dispatch, SetStateAction } from "react";
import { PaginationType, ParentPageType } from "@/types/PaginationType";
import usePagination from "@/hooks/usePagination";

// 퀴리스트링 기반 페이지네이션
interface QueryStringPaginationProps {
  type: "queryString";
  parentPage: ParentPageType;
  itemId?: number;
  paginationState: PaginationType;
  setPaginationState: Dispatch<SetStateAction<PaginationType>>;
}

// 상태 기반 페이지네이션
interface StatePaginationProps {
  type: "state";
  itemId?: number;
  parentPage?: ParentPageType;
  paginationState: PaginationType;
  setPaginationState: Dispatch<SetStateAction<PaginationType>>;
}

type Props = QueryStringPaginationProps | StatePaginationProps;

export default function Pagination(paginationProps: Props) {
  const { type, paginationState, setPaginationState, parentPage, itemId } =
    paginationProps;

  const { handlePageClick } = usePagination({
    paginationState,
    setPaginationState,
    type,
    parentPage,
    itemId,
  });

  const currentPage = paginationState.currentPage ?? 1;
  const totalPagesLength = paginationState.totalPagesLength ?? 0;
  const middlePages = paginationState.middlePages;
  const isMiddlePageUpdated = paginationState.isMiddlePagesUpdated;

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
        ariaLabel={`${page} 페이지`}
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
        ariaLabel="이전 페이지로 이동"
        iconOnly
        icon={<ArrowLeft width={16} height={16} stroke={gray60} alt="" />}
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
        ariaLabel="다음 페이지로 이동"
        iconOnly
        icon={<ArrowRight width={16} height={16} stroke={gray60} alt="" />}
        className={styles["page-button"]}
        value={"next"}
        onClick={handlePageClick}
      />
    </article>
  ) : null;
}
