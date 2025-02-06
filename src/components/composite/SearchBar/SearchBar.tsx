import { Search } from "@/svg/Search";
import { gray50 } from "@/styles/abstracts/colors.ts";
import styles from "./_search_bar.module.scss";
import Input from "@/components/atom/Input/Input";
import useInput from "@/hooks/useInput.ts";
import { FormEvent, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useNavigateWithParams from "@/hooks/useNavigateWithParams";
import { FetchBooksKeyType, FetchBooksParams } from "@/types/ParamsType";

export default function SearchBar() {
  const { pathname } = useLocation();

  useEffect(() => {
    resetInput();
  }, [pathname]);

  const {
    value: searchWord,
    onChange: onSearchWordChange,
    resetInput,
  } = useInput("");
  const { navigateWithParams } = useNavigateWithParams("books");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const excludeParams: FetchBooksKeyType[] = ["page"];
    if (!searchWord) {
      excludeParams.push("keyword");
    }
    navigateWithParams({
      keyword: searchWord,
      parentPage: "books",
      excludeParams: excludeParams,
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
