import { Search } from "@/svg/search.tsx";
import { gray50 } from "@/styles/abstracts/colors.ts";
import styles from "./_search_bar.module.scss";
import Input from "@/components/atom/input/input";
import useInput from "@/hooks/useInput.ts";
import { FormEvent } from "react";
import { useQueryCurrentUser } from "@/hooks/useQueryCurrentUser.ts";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const { isLoggedIn } = useQueryCurrentUser();
  const { value: searchWord, onChange: onChangeSearchWord } = useInput("");
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      navigate("/", { state: { openModal: true } }); //TODO: 랜딩페이지로 이동
    }
    console.log("Search submitted with:", searchWord);
  };

  return (
    <div className={styles["searchbar-container"]}>
      <form onSubmit={handleSubmit}>
        <Input
          className={styles["searchbar"]}
          size="small"
          id="search-bar"
          value={searchWord}
          onChange={onChangeSearchWord}
          placeholder="배우고 싶은 책을 검색해보세요."
          leftIcon={<Search stroke={gray50} width={20} />}
          fullWidth
        />
      </form>
    </div>
  );
}
