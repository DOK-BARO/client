import { Search } from "@/svg/Search";
import { gray50 } from "@/styles/abstracts/colors.ts";
import styles from "./_search_bar.module.scss";
import Input from "@/components/atom/Input/Input";
import useInput from "@/hooks/useInput.ts";
import { FormEvent, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { isLoggedInAtom } from "@/store/userAtom";
import { useAtom } from "jotai";
import ROUTES from "@/data/routes";
import useNavigateWithParams from "@/hooks/useNavigateWithParams";

export default function SearchBar() {
  const [isLoggedIn] = useAtom(isLoggedInAtom);
  const { pathname } = useLocation();

  useEffect(() => {
    resetInput();
  }, [pathname]);

  const {
    value: searchWord,
    onChange: onSearchWordChange,
    resetInput,
  } = useInput("");
  const navigate = useNavigate();
  const { navigateWithParams } = useNavigateWithParams("books");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: 확인
    if (!isLoggedIn) {
      navigate(ROUTES.ROOT, { state: { openModal: true } }); //TODO: 랜딩페이지로 이동
    }
    navigateWithParams({
      title: searchWord,
      parentPage: "books",
      excludeParams: ["page"],
    });
  };

  return (
    <div className={styles["searchbar-container"]}>
      <form onSubmit={handleSubmit}>
        <Input
          className={styles["searchbar"]}
          size="small"
          id="search-bar"
          value={searchWord}
          onChange={onSearchWordChange}
          placeholder="배우고 싶은 책을 검색해보세요."
          leftIcon={
            <Search alt="검색" stroke={gray50} width={20} height={20} />
          }
          fullWidth
        />
      </form>
    </div>
  );
}
