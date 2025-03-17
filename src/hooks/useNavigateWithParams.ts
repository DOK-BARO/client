import { SupportedFilterTypes } from "@/types/FilterType";
import { ParentPageType } from "@/types/PaginationType";
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
const useNavigateWithParams = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
