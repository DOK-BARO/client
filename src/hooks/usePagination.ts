import { useEffect, useState } from "react";

interface UsePaginationReturn {
  currentPage: number;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  middlePages: number[];
}

const usePagination = ({
  initialPage,
  totalPagesLength,
}: {
  initialPage?: number;
  totalPagesLength: number;
}): UsePaginationReturn => {
  const [currentPage, setCurrentPage] = useState<number>(initialPage ?? 1); // TODO: 쿼리로 변경하기
  const [pagePosition, setPagePosition] = useState<"start" | "end" | undefined>(
    "start"
  );
  const middlePagesLength = 6;

  const getMiddlePages = (position: "start" | "end", basePage: number) => {
    let startIndex: number;

    if (position === "start") {
      startIndex = basePage - 1;
    } else if (position === "end" && basePage) {
      startIndex = basePage - middlePagesLength;
    }

    const pageList = Array.from(
      { length: middlePagesLength },
      (_, i) => startIndex + i + 1
    );
    const middlePageList = pageList.filter(
      (page) => page > 1 && page < totalPagesLength
    );

    return middlePageList;
  };
  const [middlePages, setMiddlePages] = useState<number[]>([]);

  useEffect(() => {
    if (pagePosition) {
      const middlePageList = getMiddlePages(pagePosition, currentPage);
      setMiddlePages(middlePageList);
    }
  }, [pagePosition]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.value;

    if (value === "before") {
      if (
        currentPage > middlePages[0]
        // 범위 안에 있다면
      ) {
        setCurrentPage(currentPage - 1);
        setPagePosition(undefined);
      } else {
        setCurrentPage(middlePages[0] - 1);
        setPagePosition("end");
      }
    } else if (value === "next") {
      if (
        currentPage < middlePages[middlePages.length - 1]
        // 범위 안에 있다면
      ) {
        setCurrentPage(currentPage + 1);
        setPagePosition(undefined);
      } else {
        setCurrentPage(middlePages[middlePages.length - 1] + 1);
        setPagePosition("start");
      }
    } else {
      // 숫자 클릭
      setCurrentPage(Number(value));
      setPagePosition(undefined);
    }
  };

  return {
    currentPage,
    handleClick,
    middlePages,
  };
};
export default usePagination;
