import { FormEvent, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useNavigateWithParams from "./useNavigateWithParams";
import useInput from "./useInput";

const useBookSearch = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    resetInput();
  }, [pathname]);

  const {
    value: searchWord,
    onChange: onSearchWordChange,
    resetInput,
  } = useInput("");

  const { navigateWithParams } = useNavigateWithParams();

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    navigateWithParams({
      title: searchWord,
      parentPage: "books",
      excludeParams: ["page"],
    });
  };
  return { onSearch, searchWord, onSearchWordChange };
};
export default useBookSearch;
