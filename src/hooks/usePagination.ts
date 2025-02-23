import { PagePositionType, PaginationType } from "@/types/PaginationType";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface UsePaginationReturn {
  handlePageClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const usePagination = ({
  paginationState,
  setPaginationState,
}: {
  paginationState: PaginationType;
  setPaginationState: Dispatch<SetStateAction<PaginationType>>;
}): UsePaginationReturn => {
  const location = useLocation();

  const totalPagesLength = paginationState.totalPagesLength ?? 0;
  const currentPage = paginationState.currentPage;
  const pagePosition = paginationState.pagePosition;
  const middlePages = paginationState.middlePages;
  const middlePagesLength = paginationState.middlePagesLength;

  const getMiddlePages = (position: PagePositionType, basePage: number) => {
    let startIndex: number;

    if (position === "START") {
      startIndex = basePage - 1;
    } else if (position === "END" && basePage) {
      startIndex = basePage - middlePagesLength;
    }

    const pageList = Array.from(
      { length: middlePagesLength },
      (_, i) => startIndex + i + 1,
    );

    const middlePageList = pageList.filter(
      (page) => page > 1 && page < totalPagesLength,
    );
    return middlePageList;
  };

  useEffect(() => {
    if (pagePosition !== "BETWEEN" && totalPagesLength) {
      // 로딩 상태 업데이트
      setPaginationState({
        ...paginationState,
        isMiddlePagesUpdated: false,
      });
      const middlePageList = getMiddlePages(pagePosition, currentPage);
      setPaginationState((prev) => ({
        ...prev,
        middlePages: middlePageList,
        isMiddlePagesUpdated: true, // 중간 페이지 업데이트 완료
      }));
    }
  }, [pagePosition, totalPagesLength, location]);

  const setPageState = (
    currentPage: number,
    pagePosition: PagePositionType,
  ) => {
    setPaginationState((prev) => ({
      ...prev,
      currentPage,
      pagePosition,
    }));
  };

  const handlePageClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;

    if (value === "before") {
      if (currentPage === 1) {
        return;
      }
      if (
        currentPage > middlePages[0] ||
        currentPage === 2
        // 범위 안에 있다면
      ) {
        setPageState(currentPage - 1, "BETWEEN");
      } else {
        setPageState(middlePages[0] - 1, "END");
      }
    } else if (value === "next") {
      if (currentPage >= totalPagesLength) {
        return;
      }
      if (
        currentPage < middlePages[middlePages.length - 1] ||
        currentPage === totalPagesLength - 1
        // 범위 안에 있다면
      ) {
        setPageState(currentPage + 1, "BETWEEN");
      } else {
        setPageState(middlePages[middlePages.length - 1] + 1, "START");
      }
    } else {
      // 숫자 클릭
      let position: PagePositionType = "BETWEEN";
      if (Number(value) === 1) {
        position = "START";
      } else if (Number(value) === paginationState.totalPagesLength) {
        position = "END";
      }
      setPageState(Number(value), position);
    }
  };

  return {
    handlePageClick,
  };
};
export default usePagination;
