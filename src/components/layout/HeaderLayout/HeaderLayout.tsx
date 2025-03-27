import styles from "./_header_layout.module.scss";
import HeaderLogo from "@/components/atom/HeaderLogo/HeaderLogo";
import Button from "@/components/atom/Button/Button";
import StartAuthButton from "@/components/composite/StartAuthButton/StartAuthButton";
import LoginModal from "@/components/composite/LoginModal/LoginModal";
import useLoginModal from "@/hooks/useLoginModal";
import HeaderMyInfoUtilButton from "@/components/composite/HeaderMyInfoUtilButton/HeaderMyInfoUtilButton";
import HeaderQuizUtilButton from "@/components/composite/HeaderQuizUtilButton/HeaderQuizUtilButton";
import { useEffect, useRef, useState } from "react";
import useBookSearch from "@/hooks/useBookSearch";
import ROUTES from "@/data/routes";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import TopBookNav from "../BookNav/TopBookNav";
import BookSearchInput from "@/components/composite/headerLayout/bookSearch/BookSearchInput/BookSearchInput";
import BookSearchResultList from "@/components/composite/headerLayout/bookSearch/BookSearchResultList/BookSearchResultList";

const headerListItem: { label: string; link: string }[] = [
  { label: "퀴즈 만들기", link: ROUTES.CREATE_QUIZ() },
  { label: "내 스터디", link: `${ROUTES.MY_PAGE}/${ROUTES.MY_STUDY_GROUPS}` },
  { label: "마이페이지", link: ROUTES.MY_PAGE },
];

export default function HeaderLayout() {
  const { isLoginModalOpen, closeLoginModal } = useLoginModal();
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLDivElement>(null);

  const [isShowSearchResult, setIsShowSearchResult] = useState<boolean>(false);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

  const {
    onSearchBook,
    searchValue,
    searchedBooks,
    isBookSearching,
    resetSearchValueInput,
  } = useBookSearch(3);

  useEffect(() => {
    const title = searchParams.get("title");
    if (!title) {
      resetSearchValueInput();
    }
  }, [searchParams]);

  useEffect(() => {
    const shouldShowSearchResult = !!searchValue && isInputFocused;
    setIsShowSearchResult(shouldShowSearchResult);
  }, [searchValue, isInputFocused]);

  return (
    <header className={styles.header}>
      <div className={styles["header-container"]}>
        <div className={styles["header-inner-container"]}>
          <div className={styles["row"]}>
            <HeaderLogo />
            <ul className={styles["snb"]}>
              <li>
                <HeaderQuizUtilButton />
              </li>
              {headerListItem.map((item) => (
                <li className={styles["snb__item"]}>
                  <Button
                    className={styles["snb__item-btn"]}
                    onClick={() => {
                      navigate(item.link);
                    }}
                  >
                    {item.label}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles["input-profile-container"]}>
            {/* {isShowSearchBar ? ( */}
            <div className={styles["book-search"]} ref={inputRef}>
              <BookSearchInput
                searchValue={searchValue}
                onSearchBook={onSearchBook}
                setIsInputFocused={setIsInputFocused}
              />
              {isShowSearchResult ? (
                <BookSearchResultList
                  searchedBooks={searchedBooks}
                  isBookSearching={isBookSearching}
                  setIsShowSearchResult={setIsShowSearchResult}
                  searchValue={searchValue}
                />
              ) : null}
            </div>
            {/* ) : null} */}
            {/* {!isShowSearchBar ? (
              <Button
                iconOnly={true}
                icon={
                  <Search
                    alt="도서 검색"
                    stroke={gray60}
                    width={18}
                    height={18}
                  />
                }
                onClick={() => {
                  setIsShowSearchBar((prev) => !prev);
                }}
              />
            ) : null} */}
            <StartAuthButton />
            <HeaderMyInfoUtilButton />
          </div>
          {isLoginModalOpen && <LoginModal closeModal={closeLoginModal} />}
        </div>
      </div>
      {pathname === ROUTES.BOOK_LIST ? <TopBookNav /> : null}
    </header>
  );
}
