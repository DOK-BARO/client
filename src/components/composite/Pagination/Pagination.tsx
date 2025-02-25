import Button from "@/components/atom/Button/Button";
import styles from "./_pagination.module.scss";
import { ArrowLeft } from "@/svg/ArrowLeft";
import { gray60 } from "@/styles/abstracts/colors";
import { ArrowRight } from "@/svg/ArrowRight";
import usePagination from "@/hooks/usePagination";
import { useNavigate } from "react-router-dom";
import { Dispatch, SetStateAction, useEffect } from "react";
import { setQueryParam } from "@/utils/setQueryParam";
import { PaginationType, ParentPageType } from "@/types/PaginationType";

// TODO: 직관적으로 (변수명 등)
interface QueryStringPaginationProps {
  type: "queryString";
  parentPage: ParentPageType;
  itemId?: number;
  paginationState: PaginationType;
  setPaginationState: Dispatch<SetStateAction<PaginationType>>;
}

interface StatePaginationProps {
  type: "state";
  itemId?: number;
  paginationState: PaginationType;
  setPaginationState: Dispatch<SetStateAction<PaginationType>>;
}

type Props = QueryStringPaginationProps | StatePaginationProps;

export default function Pagination(props: Props) {
  const navigate = useNavigate();
  const { paginationState, setPaginationState } = props;

  const { handlePageClick } = usePagination({
    paginationState,
    setPaginationState,
  });

  const currentPage = paginationState.currentPage ?? 1;
  const totalPagesLength = paginationState.totalPagesLength ?? 0;
  const middlePages = paginationState.middlePages;
  const isMiddlePageUpdated = paginationState.isMiddlePagesUpdated;

  useEffect(() => {
    // 쿼리 스트링 방식만 해당
    if (props.type === "queryString") {
      const queryParams = setQueryParam("page", currentPage.toString());
      const pathname = !props.itemId
        ? `/${props.parentPage.toLowerCase()}`
        : `/${props.parentPage.toLowerCase()}/${props.itemId}`;

      navigate(
        {
          pathname,
          search: `?${queryParams.toString()}`,
        },
        {
          replace: true,
        },
      );
    }
  }, [currentPage, props.type === "queryString" && props.parentPage]);

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
        icon={
          <ArrowLeft width={16} height={16} stroke={gray60} alt="이전 페이지" />
        }
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
        icon={
          <ArrowRight
            width={16}
            height={16}
            stroke={gray60}
            alt="다음 페이지"
          />
        }
        className={styles["page-button"]}
        value={"next"}
        onClick={handlePageClick}
      />
    </article>
  ) : null;
}
