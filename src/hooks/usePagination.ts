import { useState } from "react";

interface UsePaginationReturn {
  currentPage: number;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const usePagination = (initialPage: number): UsePaginationReturn => {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = (e.target as HTMLInputElement).value;
    setCurrentPage(Number(value));
  };

  return { currentPage, handleClick };
};
export default usePagination;
