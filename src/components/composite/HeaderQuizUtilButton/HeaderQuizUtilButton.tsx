import Button from "@/components/atom/Button/Button";
import styles from "./_header_quiz_util_button.module.scss";
import HeaderQuizUtilList from "@/components/composite/QuizMenuList/QuizMenuList";
import { useDropDownList } from "@/hooks/useDropDownList.ts";
import { black } from "@/styles/abstracts/colors";
import { ArrowDown2 } from "@/svg/ArrowDown";

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
        <ArrowDown2 width={24} height={24} stroke={black} />
      </Button>
      {isOpenDropDownList && anchorEl && (
        <HeaderQuizUtilList closeDropDownList={closeDropDownList} />
      )}
    </div>
  );
}

export default HeaderQuizUtilButton;
