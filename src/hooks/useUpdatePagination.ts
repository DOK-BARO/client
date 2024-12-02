// import { PaginationAtom } from "@/store/paginationAtom";
// import { useAtom } from "jotai";
// import { useNavigate } from "react-router-dom";

// export const useUpdatePagination = () => {
//   const [pagination, setPagination] = useAtom(PaginationAtom);
//   const navigate = useNavigate();

//   const setPage = (page: number) => {
//     setPagination((prev) => ({
//       ...prev,
//       currentPage: page,
//     }));

//     // URL 업데이트
//     const queryParams = new URLSearchParams(window.location.search);
//     queryParams.set("page", page.toString());
//     navigate({
//       pathname: "/books",
//       search: `?${queryParams.toString()}`,
//     });
//   };

//   return { pagination, setPage };
// };
