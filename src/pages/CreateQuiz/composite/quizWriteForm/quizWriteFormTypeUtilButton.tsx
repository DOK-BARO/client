import styles from "./_quiz_write_form_type_util_button.module.scss";
import { useDropDownList } from "@/hooks/useDropDownList.ts";
import { ArrowDown } from "@/svg/arrowDown.tsx";
import QuizWriteFormTypeUtilList from "@/pages/CreateQuiz/composite/quizWriteForm/quizWriteFormTypeUtilList.tsx";

import Button from "@/components/atom/button/button.tsx";
import { QuestionFormTypeType } from "@/types/QuestionFormTypeType.ts";
import { useAtom } from "jotai";
import { BookQuizType } from "@/types/BookQuizType";
import { QuizCreationInfoAtom } from "@/store/quizAtom";

function QuizWriteFormTypeUtilButton({quizId, selectedOption, setSelectedOption, list }: {
  quizId: number,
  list: QuestionFormTypeType[]
  selectedOption: QuestionFormTypeType,
  setSelectedOption: (option: QuestionFormTypeType) => void
}) {

  const [, setQuizCreationInfo] = useAtom<BookQuizType>(QuizCreationInfoAtom);

  const onClick = (option: QuestionFormTypeType) => {
    setQuizCreationInfo((prev) => ({
      ...prev,
      questions: prev.questions.map((question) => 
      question.id === quizId 
      ? 
      { ...question,
        selectOptions: [],
        answerType: option.typeFlag,
        answers:[],
      } 
      : 
      question)
    }));
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