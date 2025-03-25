import styles from "./_header_layout.module.scss";
import HeaderLogo from "@/components/atom/HeaderLogo/HeaderLogo";
import Button from "@/components/atom/Button/Button";
import { Search } from "@/svg/Search";
import { gray60 } from "@/styles/abstracts/colors";
import StartAuthButton from "@/components/composite/StartAuthButton/StartAuthButton";
import LoginModal from "@/components/composite/LoginModal/LoginModal";
import useLoginModal from "@/hooks/useLoginModal";
import HeaderMyInfoUtilButton from "@/components/composite/HeaderMyInfoUtilButton/HeaderMyInfoUtilButton";
import HeaderQuizUtilButton from "@/components/composite/HeaderQuizUtilButton/HeaderQuizUtilButton";
import Input from "@/components/atom/Input/Input";
import { useEffect, useRef, useState } from "react";
import useBookSearch from "@/hooks/useBookSearch";
import ROUTES from "@/data/routes";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import TopBookNav from "../BookNav/TopBookNav";
import rightArrow from "/public/assets/svg/header/rightArrow.svg";
import useNavigateWithParams from "@/hooks/useNavigateWithParams";
import useOutsideClick from "@/hooks/useOutsideClick";

const headerListItem: { label: string; link: string }[] = [
  { label: "퀴즈 만들기", link: ROUTES.CREATE_QUIZ() },
  { label: "내 스터디", link: `${ROUTES.MY_PAGE}/${ROUTES.MY_STUDY_GROUPS}` },
  { label: "마이페이지", link: ROUTES.MY_PAGE },
];

export default function HeaderLayout() {
  const { isLoginModalOpen, closeLoginModal } = useLoginModal();
  const {
    onSearchBook,
    searchValue,
    searchedBooks,
    isBookSearching,
    resetSearchValueInput,
  } = useBookSearch(3);
  const [isShowSearchResult, setIsShowSearchResult] = useState<boolean>(false);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams(); // 쿼리 파라미터를 가져옴
  const navigate = useNavigate();

  useEffect(() => {
    const title = searchParams.get("title");
    if (!title) {
      resetSearchValueInput();
    }
  }, [searchParams]);

  const handleSelectBook = (bookId: number) => {
    navigate(ROUTES.BOOK_DETAIL_SECTION(bookId));
    setIsShowSearchResult((prev) => !prev);
  };

  const { navigateWithParams } = useNavigateWithParams();

  const viewMoreSearchedBooks = () => {
    navigateWithParams({
      title: searchValue,
      parentPage: "books",
      excludeParams: ["page"],
    });
    setIsShowSearchResult((prev) => !prev);
  };
  const inputRef = useRef<HTMLDivElement>(null);
  useOutsideClick([inputRef], () => setIsInputFocused(false));

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
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <Input
                  id="book-search"
                  onChange={onSearchBook}
                  value={searchValue}
                  className={styles["book-search-input"]}
                  size="xsmall"
                  placeholder="배우고 싶은 책을 검색해보세요."
                  leftIcon={
                    <Search
                      alt="책 검색"
                      stroke={gray60}
                      width={20}
                      height={20}
                    />
                  }
                  label="책 검색"
                  hideLabel
                  onFocus={() => setIsInputFocused(true)}
                />
              </form>
              {isShowSearchResult ? (
                <ol className={styles["book-search-result"]}>
                  {searchedBooks && searchedBooks.length > 0 ? (
                    <>
                      {searchedBooks.map((book) => (
                        <li
                          key={book.id}
                          className={styles["book-search-result-item"]}
                          onClick={() => handleSelectBook(book.id)}
                        >
                          <img
                            className={styles["book-search-result-item-image"]}
                            src={book.imageUrl}
                            alt={book.title}
                            width={66}
                            height={88}
                          />
                          <div className={styles["info-container"]}>
                            <span className={styles.title}>{book.title}</span>
                            <span className={styles.author}>
                              {book.authors} ({book.publisher})
                            </span>
                          </div>
                        </li>
                      ))}
                      <button
                        className={styles["more-result"]}
                        onClick={viewMoreSearchedBooks}
                      >
                        <p>더 많은 검색 결과 보기</p>
                        <img src={rightArrow} width={23} height={23} />
                      </button>
                    </>
                  ) : isBookSearching ? (
                    <p className={styles["no-result"]}>불러오고 있습니다..</p>
                  ) : (
                    <p className={styles["no-result"]}>검색 결과가 없습니다.</p>
                  )}
                </ol>
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
