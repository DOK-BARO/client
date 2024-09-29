import { Search } from "public/assets/svg/search.tsx";
import { gray50 } from "@/styles/abstracts/colors.ts";
import { useState } from "react";
import styles from "@/styles/composite/_search_bar.module.scss";
import Input from "@/components/atom/input/input";

export default function SearchBar() {
  const [inputValue, setInputValue] = useState<string>("");

  return (
    <div className={styles["searchbar-container"]}>
      <Input
        className={styles["searchbar"]}
        size="small"
        id="search-bar"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        placeholder="궁금한 책을 검색해보세요!"
        leftIcon={<Search stroke={gray50} width={20} />}
      />
    </div>
  );
}
