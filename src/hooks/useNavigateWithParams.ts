import { PaginationAtom } from "@/store/paginationAtom";
import { BookParamKeyType } from "@/types/BookType";
import { ParentComponentType } from "@/types/PaginationType";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";

const useNavigateWithParams = () => {
  const navigate = useNavigate();
  const [, setPaginationState] = useAtom(PaginationAtom);

  const navigateWithParams = (
    e: React.MouseEvent<HTMLButtonElement>, // 값
    parentComponentType: ParentComponentType, // 페이지 타입
    includeParamName: BookParamKeyType, // 포함할 파라미터
    excludeParams: BookParamKeyType[] // 삭제할 파라미터
  ) => {
    const { value } = e.target as HTMLButtonElement;
    const queryParams = new URLSearchParams(window.location.search);

    // 제외할 파라미터 삭제
    excludeParams.forEach((param) => queryParams.delete(param));

    // 포함할 파라미터 추가
    queryParams.set(includeParamName, value);

    if (excludeParams.includes("page")) {
      setPaginationState((prev) => ({
        ...prev,
        currentPage: 1, // or 아예 삭제 (초기화)
        pagePosition: "START",
        middlePages: [],
        isMiddlePagesUpdated: false,
      }));
    }

    navigate({
      pathname: `/${parentComponentType.toLocaleLowerCase()}`,
      search: `?${queryParams.toString()}`,
    });
  };
  return { navigateWithParams };
};
export default useNavigateWithParams;
