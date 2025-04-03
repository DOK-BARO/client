import styles from "./_header_quiz_util_button.module.scss";
import HeaderQuizUtilList from "@/components/composite/QuizMenuList/QuizMenuList";
import { useDropDownList } from "@/hooks/useDropDownList.ts";
import arrowDown from "/public/assets/svg/header/arrowDownSmall.svg";
import arrowUp from "/public/assets/svg/header/arrowUpSmall.svg";

function HeaderQuizUtilButton() {
  const {
    isOpenDropDownList,
    anchorEl,
    openDropDownList,
    closeDropDownList,
    dropDownListRef,
  } = useDropDownList();

  return (
    <div className={styles["container"]} ref={dropDownListRef}>
      <button
        onClick={openDropDownList}
        aria-label="펼치기"
        className={
          styles[
            `${isOpenDropDownList ? "quiz-util-btn--active" : "quiz-util-btn"}`
          ]
        }
      >
        퀴즈 풀기
        <img src={isOpenDropDownList ? arrowUp : arrowDown} />
      </button>
      {isOpenDropDownList && anchorEl && (
        <HeaderQuizUtilList closeDropDownList={closeDropDownList} />
      )}
    </div>
  );
}

export default HeaderQuizUtilButton;
