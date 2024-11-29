import { useLocation } from "react-router-dom";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { PaginationAtom } from "@/store/paginationAtom";

export const useSyncPaginationWithURL = () => {
  const { search } = useLocation();
  const [, setPagination] = useAtom(PaginationAtom);

  useEffect(() => {
    const queryParams = new URLSearchParams(search);
    const page = queryParams.get("page");

    // URL의 page 파라미터와 동기화
    setPagination((prev) => ({
      ...prev,
      currentPage: page ? Number(page) : 1,
    }));
  }, [search, setPagination]);
};
