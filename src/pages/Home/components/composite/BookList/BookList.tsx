import { useNavigate, useOutletContext } from "react-router-dom";
import styles from "./_bookList.module.scss";
import BookItem from "@/pages/Home/components/composite/BookItem/BookItem";
import { BookType } from "@/types/BookType";
import {
  paginationAtom,
  prevPaginationStateAtom,
} from "@/store/paginationAtom";
import { useAtom } from "jotai";
import ROUTES from "@/data/routes";

export default function BookList() {
  // TODO: 페이징
  const { books } = useOutletContext<{ books: BookType[] }>();
  const navigate = useNavigate();

  const [paginationState] = useAtom(paginationAtom);
  const [, setPrevPaginationState] = useAtom(prevPaginationStateAtom);
  // useEffect(() => {
  //   sessionStorage.removeItem("prevPage");
  // }, []);

  const handleClick = (id: number) => {
    navigate(ROUTES.BOOK_DETAIL_SECTION(id));
    // sessionStorage.setItem("prevPage", paginationState.currentPage.toString());

    // 바로 전 페이지네이션 상태 저장
    setPrevPaginationState(paginationState);
  };

  if (!books) {
    return <div>book list page error!!</div>;
  }
  return (
    <ul className={styles["book-list-container"]}>
      {books?.map((book) => (
        <li key={book.id} onClick={() => handleClick(book.id)}>
          <BookItem book={book} />
        </li>
      ))}
    </ul>
  );
}
