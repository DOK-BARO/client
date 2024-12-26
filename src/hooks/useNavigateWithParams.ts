import { paginationAtom } from "@/store/paginationAtom";
import { BooksFilterType, ReviewsFilterType } from "@/types/FilterType";
import { ParentComponentType } from "@/types/PaginationType";
import { FetchBooksKeyType } from "@/types/ParamsType";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 지정된 필터, 페이지, 카테고리 등의 파라미터를 URL에 반영하고
// 필요 시 제외 파라미터를 처리하는 등
// 페이지 이동과 상태 업데이트를 동시에 수행

// TODO: parentComponent -> parentPage 등..으로 변수명 변경하기
const useNavigateWithParams = (parentComponent: ParentComponentType) => {
  const navigate = useNavigate();
  const [, setPaginationState] = useAtom(paginationAtom);
  useEffect(() => {
    // Pagination 상태 초기화
    setPaginationState((prev) => ({
      ...prev,
      currentPage: 1,
      pagePosition: "START",
      middlePages: [],
      isMiddlePagesUpdated: false,
    }));
  }, [parentComponent]);

  const navigateWithParams = ({
    filter,
    page,
    category,
    parentComponentType, // 현재 어떤 페이지에 있는지
    excludeParams = [],
    itemId = undefined,
  }: {
    filter?: BooksFilterType | ReviewsFilterType;
    page?: number;
    category?: string;
    parentComponentType: ParentComponentType;
    includeParamName?: FetchBooksKeyType[];
    excludeParams?: FetchBooksKeyType[];
    itemId?: number;
  }) => {
    const queryParams = new URLSearchParams(window.location.search);

    if (filter) {
      const { sort, direction } = filter;
      if (excludeParams.includes("sort")) queryParams.delete("sort");
      if (excludeParams.includes("direction")) queryParams.delete("direction");

      queryParams.set("sort", sort);
      queryParams.set("direction", direction);
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
      setPaginationState((prev) => ({
        ...prev,
        currentPage: 1, // or 아예 삭제 (초기화)
        pagePosition: "START",
        middlePages: [],
        isMiddlePagesUpdated: false,
      }));
    }

    const pathname = !itemId
      ? `/${parentComponentType.toLowerCase()}`
      : `/${parentComponentType.toLowerCase()}/${itemId}`;

    navigate({
      pathname,
      search: `?${queryParams.toString()}`,
    });
  };
  return { navigateWithParams };
};
export default useNavigateWithParams;
