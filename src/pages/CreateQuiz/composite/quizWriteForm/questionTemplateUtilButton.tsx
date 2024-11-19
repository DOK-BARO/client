import styles from "./_quiz_write_form_type_util_button.module.scss";
import { useDropDownList } from "@/hooks/useDropDownList.ts";
import { ArrowDown } from "@/svg/arrowDown.tsx";
import QuestionTemplateUtilList from "@/pages/CreateQuiz/composite/quizWriteForm/questionTemplateUtilList";

import Button from "@/components/atom/button/button.tsx";
import { QuestionTemplateType } from "@/types/QuestionFormTypeType.ts";
import useUpdateQuizCreationInfo from "@/hooks/useUpdateQuizCreationInfo";
import { BookQuizQuestionType } from "@/types/BookQuizType";

function QuestionTemplateUtilButton({
  quizId,
  selectedOption,
  setSelectedOption,
  list,
}: {
  quizId: number;
  list: QuestionTemplateType[];
  selectedOption: QuestionTemplateType;
  setSelectedOption: (option: QuestionTemplateType) => void;
}) {
  const { quizCreationInfo, updateQuizCreationInfo } =
    useUpdateQuizCreationInfo();

  const onClick = (option: QuestionTemplateType) => {
    const updatedQuestions: BookQuizQuestionType[] =
      quizCreationInfo.questions?.map((question) =>
        question.id === quizId
          ? {
              ...question,
              selectOptions: [],
              answerType: option.typeFlag,
              answers: [],
            }
          : question
      ) ?? [];
    updateQuizCreationInfo("questions", updatedQuestions);

    setSelectedOption(option);
    closeDropDownList();
  };

  const {
    isOpenDropDownList,
    anchorEl,
    openDropDownList,
    closeDropDownList,
    dropDownListRef,
  } = useDropDownList();
  return (
    <div
      className={styles["quiz-write-form-type-util-button-container"]}
      ref={dropDownListRef}
    >
      <Button
        size="medium"
        color="white"
        onClick={openDropDownList}
        iconPosition={"left"}
        icon={
          <selectedOption.Icon
            className={styles["header-quiz-util-icon"]}
            width={20}
            height={20}
            stroke={"black"}
          />
        }
      >
        <h3>{selectedOption.text}</h3>
        <ArrowDown
          width={20}
          height={20}
          className={styles["quiz-write-form-type-util-icon"]}
          stroke={"black"}
        />
      </Button>
      {isOpenDropDownList && anchorEl && (
        <QuestionTemplateUtilList list={list} onClick={onClick} />
      )}
    </div>
  );
}

export default QuestionTemplateUtilButton;
