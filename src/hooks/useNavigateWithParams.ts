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
import { ParentPage } from "@/types/PaginationType";
import { FetchBooksKeyType } from "@/types/ParamsType";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 지정된 필터, 페이지, 카테고리 등의 파라미터를 URL에 반영하고
// 필요 시 제외 파라미터를 처리하는 등
// 페이지 이동과 상태 업데이트를 동시에 수행
const useNavigateWithParams = (parentPage: ParentPage) => {
  const navigate = useNavigate();
  const [, setPaginationState] = useAtom(paginationAtom);
  const [prevPaginationState] = useAtom(prevPaginationStateAtom);

  const initializePaginationState = () => {
    if (parentPage === "books" && prevPaginationState !== undefined) {
      setPaginationState(prevPaginationState);
    } else {
      setPaginationState((prev) => ({
        ...prev,
        currentPage: 1,
        pagePosition: "START",
        middlePages: [],
        isMiddlePagesUpdated: false,
      }));
    }
  };

  useEffect(() => {
    setPaginationState((prev) => ({
      ...prev,
      currentPage: 1,
      pagePosition: "START",
      middlePages: [],
      isMiddlePagesUpdated: false,
    }));
  }, [prevPaginationState]);

  useEffect(() => {
    // Pagination 상태 초기화
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
    parentPage: ParentPage;
    excludeParams?: FetchBooksKeyType[];
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
      // TODO: 이전과 비교해서 페이지가 변화가 없다면, 초기화 하지 않아도 되도록 하기
      // 즉, 한번 초기화가 된 상태라면 초기화하지 않아도 되게 하기

      if (!sessionStorage.getItem("prevPage")) {
        initializePaginationState();
      } else if (
        sessionStorage.getItem("prevPage") !== (!page ? "1" : "page")
      ) {
        initializePaginationState();
      }
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
