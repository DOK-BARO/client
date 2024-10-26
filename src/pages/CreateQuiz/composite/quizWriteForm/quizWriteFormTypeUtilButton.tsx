import styles from "./_quiz_write_form_type_util_button.module.scss";
import { useDropDownList } from "@/hooks/useDropDownList.ts";
import { ArrowDown } from "@/svg/arrowDown.tsx";
import QuizWriteFormTypeUtilList from "@/pages/CreateQuiz/composite/quizWriteForm/quizWriteFormTypeUtilList.tsx";

import Button from "@/components/atom/button/button.tsx";
import { QuestionFormTypeType } from "@/types/QuestionFormTypeType.ts";

function QuizWriteFormTypeUtilButton({ selectedOption, setSelectedOption, list }: {
  list: QuestionFormTypeType[]
  selectedOption: QuestionFormTypeType,
  setSelectedOption: (option: QuestionFormTypeType) => void
}) {


  const onClick = (option: QuestionFormTypeType) => {
    setSelectedOption(option);
    closeDropDownList();
  };

  const { isOpenDropDownList, anchorEl, openDropDownList, closeDropDownList, dropDownListRef } = useDropDownList();
  return (
    <div className={styles["quiz-write-form-type-util-button-container"]} ref={dropDownListRef}>
      <Button
        className={styles["quiz-write-form-type-util-button"]}
        onClick={openDropDownList}
        iconPosition={"left"}
        icon={<selectedOption.Icon
          className={styles["header-quiz-util-icon"]}
          width={24}
          height={24}
          stroke={"black"}
        />}
      >
        <h3>{selectedOption.text}</h3>
        <ArrowDown width={24} height={24} className={styles["quiz-write-form-type-util-icon"]} stroke={"black"}/>
      </Button>
      {isOpenDropDownList && anchorEl &&
        <QuizWriteFormTypeUtilList
          list={list}
          onClick={onClick}
        />}
    </div>
  );
}

export default QuizWriteFormTypeUtilButton;