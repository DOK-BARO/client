import Button from "@/components/atom/Button/Button";
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
      <Button
        onClick={openDropDownList}
        size="xsmall"
        color="transparent"
        ariaLabel="펼치기"
        iconPosition="right"
        className={
          styles[
            `${isOpenDropDownList ? "quiz-util-btn--active" : "quiz-util-btn"}`
          ]
        }
        icon={<img src={isOpenDropDownList ? arrowUp : arrowDown} />}
      >
        퀴즈 풀기
      </Button>
      {isOpenDropDownList && anchorEl && (
        <HeaderQuizUtilList closeDropDownList={closeDropDownList} />
      )}
    </div>
  );
}

export default HeaderQuizUtilButton;
