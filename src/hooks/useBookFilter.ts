import { BookFilterAtom } from "@/store/bookAtom";
import { SortFilterType } from "@/types/BookType";
import { useAtom } from "jotai";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const useBookFilter = () => {
  const [, setFilterCriteria] = useAtom(BookFilterAtom);
  const { search } = useLocation();

  // URL의 쿼리 파라미터와 동기화
  useEffect(() => {
    const queryParams = new URLSearchParams(search);
    const sort = queryParams.get("sort");

    setFilterCriteria((prev) => ({
      ...prev,
      sort: sort ? (sort as SortFilterType) : prev.sort,
    }));
  }, [search, setFilterCriteria]);

  //   const setSortCriteria = (sortKey: SortFilterType) => {
  //     setFilterCriteria((prev) => ({ ...prev, sort: sortKey }));
  //   };
};

export default useBookFilter;
