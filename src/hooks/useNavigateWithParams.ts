import { paginationAtom } from "@/store/paginationAtom";
import { BookParamKeyType, BooksFilterType } from "@/types/BookType";
import { ParentComponentType } from "@/types/PaginationType";
import { ReviewsFilterType } from "@/types/ReviewType";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";

const useNavigateWithParams = () => {
  const navigate = useNavigate();
  const [, setPaginationState] = useAtom(paginationAtom);
  // value: BooksFilterType | "string", // 값 filter/page
  // parentComponentType: ParentComponentType, // 페이지 타입
  // includeParamName: BookParamKeyType[], // 포함할 파라미터
  // excludeParams: BookParamKeyType[] // 삭제할 파라미터
  const navigateWithParams = ({
    filter,
    page,
    category,
    parentComponentType,
    excludeParams = [],
    itemId = undefined,
  }: {
    filter?: BooksFilterType | ReviewsFilterType;
    page?: number;
    category?: string;
    parentComponentType: ParentComponentType;
    includeParamName?: BookParamKeyType[];
    excludeParams?: BookParamKeyType[];
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
