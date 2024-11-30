import { PagePositionType, PaginationType } from "@/types/PaginationType";
import { Dispatch, SetStateAction, useEffect } from "react";

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
  const totalPagesLength = paginationState.totalPagesLength ?? 0;
  const currentPage = paginationState.currentPage;
  const pagePosition = paginationState.pagePosition;
  const middlePages = paginationState.middlePages;
  const middlePagesLength = paginationState.middlePagesLength;

  const getMiddlePages = (position: "start" | "end", basePage: number) => {
    let startIndex: number;

    if (position === "start") {
      startIndex = basePage - 1;
    } else if (position === "end" && basePage) {
      startIndex = basePage - middlePagesLength;
    }

    const pageList = Array.from(
      { length: middlePagesLength },
      (_, i) => startIndex + i + 1
    );

    const middlePageList = pageList.filter(
      (page) => page > 1 && page < totalPagesLength
    );
    return middlePageList;
  };

  useEffect(() => {
    if (pagePosition && totalPagesLength) {
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
  }, [pagePosition, totalPagesLength]);

  const setPageState = (
    currentPage: number,
    pagePosition: PagePositionType
  ) => {
    setPaginationState((prev) => ({
      ...prev,
      currentPage,
      pagePosition,
    }));
  };

  const handlePageClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.value;

    if (value === "before") {
      if (
        currentPage > middlePages[0]
        // 범위 안에 있다면
      ) {
        setPageState(currentPage - 1, undefined);
      } else {
        setPageState(middlePages[0] - 1, "end");
      }
    } else if (value === "next") {
      if (
        currentPage < middlePages[middlePages.length - 1]
        // 범위 안에 있다면
      ) {
        setPageState(currentPage + 1, undefined);
      } else {
        setPageState(middlePages[middlePages.length - 1] + 1, "start");
      }
    } else {
      // 숫자 클릭
      let position = undefined;
      if (Number(value) === 1) {
        position = "start" as PagePositionType;
      } else if (Number(value) === paginationState.totalPagesLength) {
        position = "end" as PagePositionType;
      }
      setPageState(Number(value), position);
    }
  };

  return {
    handlePageClick,
  };
};
export default usePagination;
