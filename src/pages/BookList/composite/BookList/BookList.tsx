import { useNavigate } from "react-router-dom";
import styles from "./_bookList.module.scss";
import BookItem from "@/pages/BookList/composite/BookItem/BookItem";
import { BookType } from "@/types/BookType";
import {
  paginationAtom,
  prevPaginationStateAtom,
} from "@/store/paginationAtom";
import { useAtom } from "jotai";
import ROUTES from "@/data/routes";

interface Props {
  books: BookType[];
}
export default function BookList({ books }: Props) {
  // TODO: 페이징
  const navigate = useNavigate();

  const [paginationState] = useAtom(paginationAtom);
  const [, setPrevPaginationState] = useAtom(prevPaginationStateAtom);

  const handleClick = (id: number) => {
    navigate(ROUTES.BOOK_DETAIL_SECTION(id));
    // sessionStorage.setItem("prevPage", paginationState.currentPage.toString());

    // 바로 전 페이지네이션 상태 저장
    setPrevPaginationState(paginationState);
  };

  if (!books) {
    return <div>책 데이터가 존재하지 않습니다.</div>;
  }
  return (
    <ol className={styles["book-list-container"]}>
      {books?.map((book) => (
        <li key={book.id} onClick={() => handleClick(book.id)}>
          <BookItem book={book} />
        </li>
      ))}
    </ol>
  );
}
