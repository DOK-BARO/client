import { PagePositionType, PaginationType } from "@/types/PaginationType";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface UsePaginationReturn {
  currentPage: number;
  handlePageClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  middlePages: number[];
}

const usePagination = ({
  paginationState,
  setPaginationState,
}: {
  paginationState: PaginationType;
  setPaginationState: Dispatch<SetStateAction<PaginationType>>;
}): UsePaginationReturn => {
  const { search } = useLocation();

  const totalPagesLength = paginationState.totalPagesLength;
  const currentPage = paginationState.currentPage;
  const pagePosition = paginationState.pagePosition;
  const middlePages = paginationState.middlePages;
  const middlePagesLength = paginationState.middlePagesLength;

  // URL에서 쿼리 파라미터 가져오기 및 상태 동기화
  useEffect(() => {
    const queryParams = new URLSearchParams(search);
    const page = queryParams.get("page");
    setPaginationState((prev) => ({
      ...prev,
      currentPage: page ? Number(page) : 1,
    }));
  }, [search, setPaginationState]);

  const getMiddlePages = (position: "start" | "end", basePage: number) => {
    let startIndex: number;
    console.log("position", position);

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
      (page) => page > 1 && page < totalPagesLength!
    );
    return middlePageList;
  };

  useEffect(() => {
    if (pagePosition && totalPagesLength) {
      const middlePageList = getMiddlePages(pagePosition, currentPage);
      setPaginationState({
        ...paginationState,
        middlePages: middlePageList,
      });
    }
  }, [pagePosition]);

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
    currentPage,
    handlePageClick,
    middlePages,
  };
};
export default usePagination;
