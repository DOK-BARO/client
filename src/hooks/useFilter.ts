import { useLocation } from "react-router-dom";
import { SetStateAction, useEffect } from "react";
import useNavigateWithParams from "./useNavigateWithParams";
import { ParentPageType } from "@/types/PaginationType";
import { NavigateMode, SupportedFilterTypes } from "@/types/FilterType";
import { paginationAtom } from "@/store/paginationAtom";
import { useAtom } from "jotai";

interface Props<TFilter extends SupportedFilterTypes> {
  type: NavigateMode;
  setFilterCriteria: (value: SetStateAction<TFilter>) => void;
  resetFilter?: () => void;
  parentPage?: ParentPageType;
  itemId?: number;
}

const useFilter = <TFilter extends SupportedFilterTypes>({
  type,
  setFilterCriteria,
  resetFilter,
  parentPage,
  itemId,
}: Props<TFilter>) => {
  const { search } = useLocation();
  const { navigateWithParams } = useNavigateWithParams();
  const queryParams = new URLSearchParams(search);
  const sort = queryParams.get("sort");
  const direction = queryParams.get("direction");
  const [, setPaginationState] = useAtom(paginationAtom);

  // URL의 쿼리 파라미터와 동기화
  useEffect(() => {
    if (resetFilter) {
      resetFilter();
    }
    setFilterCriteria((prev) => ({
      ...prev,
      sort: sort ? (sort as TFilter["sort"]) : prev.sort,
      direction: direction
        ? (direction as TFilter["direction"])
        : prev.direction,
    }));
  }, [setFilterCriteria, search]);

  const onOptionClick = (filter: TFilter) => {
    setPaginationState((prev) => ({
      ...prev,
      pagePosition: "START",
    }));
    if (type === "queryString" && parentPage) {
      navigateWithParams({
        filter,
        parentPage,
        excludeParams: ["page"], // 페이지 지워짐 (1 페이지로 초기화)
        itemId,
      });
    } else if (type === "state") {
      setFilterCriteria(filter as TFilter);
    }
  };
  return { onOptionClick };
};

export default useFilter;
