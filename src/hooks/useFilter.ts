import { useLocation } from "react-router-dom";
import { SetStateAction, useEffect } from "react";

import useNavigateWithParams from "./useNavigateWithParams";
import { useAtom } from "jotai";
import {
  paginationAtom,
  prevPaginationStateAtom,
} from "@/store/paginationAtom";
import { ParentPageType } from "@/types/PaginationType";
import { NavigateMode, SupportedFilterTypes } from "@/types/FilterType";

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
  const { navigateWithParams } = useNavigateWithParams(parentPage);
  const [, setPaginationState] = useAtom(paginationAtom);
  const [, setPrevPaginationState] = useAtom(prevPaginationStateAtom);

  const queryParams = new URLSearchParams(search);
  const sort = queryParams.get("sort");
  const direction = queryParams.get("direction");

  const resetPaginationState = () => {
    setPaginationState((prev) => ({
      ...prev,
      currentPage: 1,
      pagePosition: "START",
      middlePages: [],
      isMiddlePagesUpdated: false,
    }));
  };

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
    if (type === "queryString" && parentPage) {
      setPrevPaginationState(undefined);
      resetPaginationState();

      navigateWithParams({
        filter,
        parentPage,
        excludeParams: ["page"], // 페이지 지워짐 (1 페이지로 초기화)
        itemId,
      });
    } else if (type === "state") {
      setFilterCriteria(filter as TFilter);
      resetPaginationState();
    }
  };
  return { onOptionClick };
};

export default useFilter;
