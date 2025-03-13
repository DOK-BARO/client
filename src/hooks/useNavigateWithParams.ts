import {
  paginationAtom,
  prevPaginationStateAtom,
} from "@/store/paginationAtom";
import {
  BooksFilterType,
  MyMadeQuizzesFilterType,
  QuizzesFilterType,
  ReviewsFilterType,
} from "@/types/FilterType";
import { ParentPageType } from "@/types/PaginationType";
import { BooksFetchKeyType } from "@/types/ParamsType";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
/**
 * URL의 쿼리 파라미터를 업데이트하고, 페이지 이동과 상태 관리를 수행하는 함수
 *
 * - 필터, 페이지 번호, 카테고리 등의 파라미터를 URL에 반영
 * - 특정 파라미터를 제외할 수 있도록 처리
 * - 상태 업데이트와 함께 네비게이션 수행
 */
const useNavigateWithParams = (parentPage: ParentPageType) => {
  const navigate = useNavigate();
  const [, setPaginationState] = useAtom(paginationAtom);
  const [prevPaginationState] = useAtom(prevPaginationStateAtom);

  useEffect(() => {
    console.log("useNavigateWithParams");
  }, []);

  const resetPaginationState = () =>
    setPaginationState((prev) => ({
      ...prev,
      currentPage: 1,
      pagePosition: "START",
      middlePages: [],
      isMiddlePagesUpdated: false,
    }));

  const initializePaginationState = () => {
    console.log("initializePaginationState");
    if (parentPage === "books" && prevPaginationState !== undefined) {
      // 책 상세 페이지에서 다시 목록으로 돌아갈 때 이전 상태 가져와서 저장
      console.log(
        "책 상세 페이지에서 다시 목록으로 돌아갈 때 이전 상태 가져와서 저장",
      );
      setPaginationState(prevPaginationState);
    } else {
      // 페이지네이션 상태 초기화
      resetPaginationState();
      console.log("페이지네이션 상태 초기화");
    }
  };

  // 아예 상위 카테고리 페이지(parentPage)가 바뀌면 Pagination 상태 초기화
  useEffect(() => {
    initializePaginationState();
  }, [parentPage]);

  const navigateWithParams = ({
    filter,
    title,
    page,
    category,
    parentPage, // 현재 어떤 페이지에 있는지
    excludeParams = [],
    itemId = undefined,
  }: {
    filter?:
      | BooksFilterType
      | ReviewsFilterType
      | QuizzesFilterType
      | MyMadeQuizzesFilterType;
    title?: string;
    page?: number;
    category?: string;
    parentPage: ParentPageType;
    excludeParams?: BooksFetchKeyType[];
    itemId?: number;
  }) => {
    const queryParams = new URLSearchParams(window.location.search);

    if (filter) {
      const { sort, direction } = filter;
      // TODO: if문 꼭 필요한지 확인 후 제거
      if (excludeParams.includes("sort")) queryParams.delete("sort");
      if (excludeParams.includes("direction")) queryParams.delete("direction");

      queryParams.set("sort", sort);
      queryParams.set("direction", direction);
    }
    if (title) {
      if (!excludeParams.includes("title")) {
        if (excludeParams.includes("page")) queryParams.delete("page");
        queryParams.set("title", title);
        initializePaginationState();
      }
    }
    if (page) {
      // 페이지 파라미터 처리 (exclude 옵션 고려)
      if (!excludeParams.includes("page")) {
        queryParams.set("page", page.toString());
      }
    }
    if (category) {
      if (excludeParams.includes("category")) queryParams.delete("category");
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
