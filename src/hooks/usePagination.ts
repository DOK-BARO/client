import {
  PagePositionType,
  PaginationType,
  ParentPageType,
} from "@/types/PaginationType";
import { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import useNavigateWithParams from "./useNavigateWithParams";

interface UsePaginationReturn {
  handlePageClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
// url이 먼저 -> 상태 업데이트
const usePagination = ({
  paginationState,
  setPaginationState,
  type,
  parentPage,
  itemId,
}: {
  paginationState: PaginationType;
  setPaginationState: Dispatch<SetStateAction<PaginationType>>;
  type: "queryString" | "state";
  itemId?: number;
  parentPage?: ParentPageType;
}): UsePaginationReturn => {
  const location = useLocation();

  const totalPagesLength = paginationState.totalPagesLength ?? 0;
  const currentPage = paginationState.currentPage;
  const pagePosition = paginationState.pagePosition;
  const middlePages = paginationState.middlePages;
  const middlePagesLength = paginationState.middlePagesLength;
  const { navigateWithParams } = useNavigateWithParams();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const pageFromUrl = Number(queryParams.get("page") ?? "1");

    // URL 변경 시 페이지네이션 상태 업데이트
    setPageState(pageFromUrl, pagePosition);
  }, [location.search]);

  const changePage = (newPage: number, newPagePosition: PagePositionType) => {
    // URL 업데이트
    if (type === "queryString" && parentPage) {
      navigateWithParams({
        page: newPage,
        parentPage,
        itemId,
      });
      setPaginationState((prev) => ({
        ...prev,
        pagePosition: newPagePosition,
      }));
    } else {
      // URL 변경 없이 상태만 업데이트하는 경우
      setPageState(newPage, newPagePosition);
    }
  };

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

  // 중간 페이지 리스트 업데이트
  const updateMiddlePages = (page: number) => {
    // 로딩 상태 업데이트
    if (pagePosition === "BETWEEN") {
      return;
    }
    setPaginationState((prev) => ({
      ...prev,
      isMiddlePagesUpdated: false,
    }));
    const middlePageList = getMiddlePages(pagePosition, page);
    setPaginationState((prev) => ({
      ...prev,
      middlePages: middlePageList,
      isMiddlePagesUpdated: true,
    }));
  };

  const setPageState = (page: number, pagePosition: PagePositionType) => {
    setPaginationState((prev) => ({
      ...prev,
      currentPage: page,
      pagePosition,
      parentPage,
    }));
  };
  const memoizedTotalPagesLength = useMemo(
    () => totalPagesLength,
    [totalPagesLength],
  );

  useEffect(() => {
    updateMiddlePages(currentPage);
  }, [pagePosition, currentPage, memoizedTotalPagesLength]);

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
        changePage(currentPage - 1, "BETWEEN");
      } else {
        changePage(middlePages[0] - 1, "END");
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
        changePage(currentPage + 1, "BETWEEN");
      } else {
        changePage(middlePages[middlePages.length - 1] + 1, "START");
      }
    } else {
      // 숫자 클릭
      let position: PagePositionType = "BETWEEN";
      if (Number(value) === 1) {
        position = "START";
      } else if (Number(value) === paginationState.totalPagesLength) {
        position = "END";
      }
      changePage(Number(value), position);
    }
  };

  return {
    handlePageClick,
  };
};
export default usePagination;
