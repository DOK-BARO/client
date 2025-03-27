import Input from "@/components/atom/Input/Input";
import styles from "./_book_search_input.module.scss";
import { Search } from "@/svg/Search";
import { gray60 } from "@/styles/abstracts/colors";
import { Dispatch } from "react";
import { SetStateAction } from "jotai";

interface Props {
  onSearchBook: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchValue: string;
  setIsInputFocused: Dispatch<SetStateAction<boolean>>;
}

export default function BookSearchInput({
  onSearchBook,
  searchValue,
  setIsInputFocused,
}: Props) {
  return (
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
          <Search alt="책 검색" stroke={gray60} width={20} height={20} />
        }
        label="책 검색"
        hideLabel
        onFocus={() => setIsInputFocused(true)}
      />
    </form>
  );
}
