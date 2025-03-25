import HeaderLogo from "@/components/atom/HeaderLogo/HeaderLogo";
import Button from "@/components/atom/Button/Button";
import styles from "./_header_layout.module.scss";
import { Search } from "@/svg/Search";
import { gray60 } from "@/styles/abstracts/colors";
import StartAuthButton from "@/components/composite/StartAuthButton/StartAuthButton";
import LoginModal from "@/components/composite/LoginModal/LoginModal";
import useLoginModal from "@/hooks/useLoginModal";
import HeaderMyInfoUtilButton from "@/components/composite/HeaderMyInfoUtilButton/HeaderMyInfoUtilButton";
import HeaderQuizUtilButton from "@/components/composite/HeaderQuizUtilButton/HeaderQuizUtilButton";
import Input from "@/components/atom/Input/Input";
import { useState } from "react";
import useBookSearch from "@/hooks/useBookSearch";
import ROUTES from "@/data/routes";
import { useLocation, useNavigate } from "react-router-dom";
import TopBookNav from "../BookNav/TopBookNav";

const headerListItem: { label: string; link: string }[] = [
  { label: "퀴즈 만들기", link: ROUTES.CREATE_QUIZ() },
  { label: "내 스터디", link: `${ROUTES.MY_PAGE}/${ROUTES.MY_STUDY_GROUPS}` },
  { label: "마이페이지", link: ROUTES.MY_PAGE },
];

export default function HeaderLayout() {
  const { isLoginModalOpen, closeLoginModal } = useLoginModal();
  const { onSearch, searchWord, onSearchWordChange } = useBookSearch();
  const [isShowSearchBar, setIsShowSearchBar] = useState<boolean>(false);
  const { pathname } = useLocation();

  const navigate = useNavigate();
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
            {isShowSearchBar ? (
              <div className={styles["book-search"]}>
                <form onSubmit={onSearch}>
                  <Input
                    id="book-search"
                    onChange={onSearchWordChange}
                    value={searchWord}
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
                    // onFocus={() => setIsShowSearchBar((prev) => !prev)}
                  />
                </form>
                <ol className={styles["book-search-result"]}>
                  <li
                    // key={book.id}
                    className={styles["book-search-result-item"]}
                    // onClick={handleSelect}
                  >
                    <img
                      className={styles["book-search-result-item-image"]}
                      src={""}
                      alt={""}
                      width={66}
                      height={88}
                    />
                    <div className={styles["info-container"]}>
                      <span className={styles.title}>책 제목</span>
                      <span className={styles.author}>저자 (출판사)</span>
                    </div>
                  </li>
                </ol>
              </div>
            ) : null}
            {!isShowSearchBar ? (
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
            ) : null}
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
