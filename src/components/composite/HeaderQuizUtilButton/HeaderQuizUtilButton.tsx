import Button from "@/components/atom/Button/Button";
import styles from "./_header_quiz_util_button.module.scss";
import HeaderQuizUtilList from "@/components/composite/QuizMenuList/QuizMenuList";
import { useDropDownList } from "@/hooks/useDropDownList.ts";
import { black } from "@/styles/abstracts/colors";
import { ArrowDown } from "@/svg/ArrowDown";

function HeaderQuizUtilButton() {
  const {
    isOpenDropDownList,
    anchorEl,
    openDropDownList,
    closeDropDownList,
    dropDownListRef,
  } = useDropDownList();

  return (
    <div
      className={styles["header-quiz-util-button-container"]}
      ref={dropDownListRef}
    >
      <Button onClick={openDropDownList} size="small" color="transparent">
        퀴즈 도구
        <ArrowDown
          width={24}
          height={24}
          className={styles["header-quiz-util-icon"]}
          stroke={black}
        />
        {/*<KeyboardArrowDownIcon className={styles["header-quiz-util-icon"]}/>*/}
      </Button>
      {isOpenDropDownList && anchorEl && (
        <HeaderQuizUtilList closeDropDownList={closeDropDownList} />
      )}
    </div>
  );
}

export default HeaderQuizUtilButton;
