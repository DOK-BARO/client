import {
  paginationAtom,
  prevPaginationStateAtom,
} from "@/store/paginationAtom";
import { SupportedFilterTypes } from "@/types/FilterType";
import { ParentPageType } from "@/types/PaginationType";
import { useAtom } from "jotai";
import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface NavigateWithParamsProps<TFilter extends SupportedFilterTypes> {
  filter?: TFilter;
  title?: string;
  page?: number;
  category?: string;
  parentPage: ParentPageType;
  excludeParams?: string[];
  itemId?: number;
}

/**
 * URL의 쿼리 파라미터를 업데이트하고, 페이지 이동과 상태 관리를 수행하는 함수
 *
 * - 필터, 페이지 번호, 카테고리 등의 파라미터를 URL에 반영
 * - 특정 파라미터를 제외할 수 있도록 처리
 * - 상태 업데이트와 함께 네비게이션 수행
 */
const useNavigateWithParams = (parentPage?: ParentPageType) => {
  const navigate = useNavigate();
  const location = useLocation();
  const memoizedParentPage = useMemo(() => parentPage, [parentPage]);

  const [, setPaginationState] = useAtom(paginationAtom);
  const [prevPaginationState] = useAtom(prevPaginationStateAtom);

  const resetPaginationState = () => {
    setPaginationState((prev) => ({
      ...prev,
      currentPage: 1,
      pagePosition: "START",
      middlePages: [],
      isMiddlePagesUpdated: false,
    }));
  };

  const initializePaginationState = () => {
    if (parentPage === "books" && prevPaginationState !== undefined) {
      // 책 상세 페이지에서 다시 목록으로 돌아갈 때 이전 상태 가져와서 저장
      setPaginationState(prevPaginationState);
    } else {
      // 페이지네이션 상태 초기화
      resetPaginationState();
    }
  };

  // 아예 상위 카테고리 페이지(parentPage)가 바뀌면 Pagination 상태 초기화
  useEffect(() => {
    if (memoizedParentPage) {
      // 초기화 작업
      initializePaginationState();
    }
  }, [memoizedParentPage]);

  const navigateWithParams = <TFilter extends SupportedFilterTypes>({
    filter,
    title,
    page,
    category,
    parentPage,
    excludeParams = [],
    itemId,
  }: NavigateWithParamsProps<TFilter>) => {
    const queryParams = new URLSearchParams(location.search);

    if (!parentPage) {
      return;
    }

    if (filter) {
      const { sort, direction } = filter;

      if (excludeParams.includes("sort")) queryParams.delete("sort");
      if (excludeParams.includes("direction")) queryParams.delete("direction");

      queryParams.set("sort", sort);
      queryParams.set("direction", direction);
    }

    if (title) {
      if (!excludeParams.includes("title")) {
        if (excludeParams.includes("page")) {
          queryParams.delete("page");
        }
        queryParams.set("title", title);
        initializePaginationState();
      }
    }
    if (page) {
      if (!excludeParams.includes("page")) {
        queryParams.set("page", page.toString());
      }
    }
    if (category) {
      if (excludeParams.includes("category")) {
        queryParams.delete("category");
      }
      queryParams.set("category", category);
    }

    // 제외할 파라미터 삭제
    excludeParams.forEach((param) => queryParams.delete(param));

    if (excludeParams.includes("page")) {
      // 페이지네이션 상태도 초기화
      initializePaginationState();
    }

    const pathname = !itemId
      ? `/${parentPage.toLowerCase()}`
      : `/${parentPage.toLowerCase()}/${itemId}`;

    navigate({
      pathname,
      search: `?${queryParams.toString()}`,
    });
  };
  return { navigateWithParams };
};
export default useNavigateWithParams;
