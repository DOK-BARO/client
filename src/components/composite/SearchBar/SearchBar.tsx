import { Search } from "@/svg/Search";
import { gray50 } from "@/styles/abstracts/colors.ts";
import styles from "./_search_bar.module.scss";
import Input from "@/components/atom/Input/Input";
import useBookSearch from "@/hooks/useBookSearch";

export default function SearchBar() {
  const { onSearch, searchWord, onSearchWordChange } = useBookSearch();
  return (
    <div className={styles["searchbar-container"]}>
      <form onSubmit={onSearch}>
        <Input
          className={styles["searchbar"]}
          size="small"
          id="search-bar"
          value={searchWord}
          onChange={onSearchWordChange}
          placeholder="배우고 싶은 책을 검색해보세요."
          leftIcon={
            <Search alt="책 검색" stroke={gray50} width={20} height={20} />
          }
          fullWidth
          label="책 검색"
          hideLabel
        />
      </form>
    </div>
  );
}
