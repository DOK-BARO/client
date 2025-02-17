import styles from "./_question_form.module.scss";
import { useDropDownList } from "@/hooks/useDropDownList.ts";
import { ArrowDown } from "@/svg/ArrowDown";
import QuestionTemplateUtilList from "@/pages/CreateQuiz/composite/QuizWriteForm/QuestionTemplateUtilList";
import { gray60 } from "@/styles/abstracts/colors";
import Button from "@/components/atom/Button/Button";
import { QuestionTemplateType } from "@/types/QuestionTemplateType";
import useUpdateQuizCreationInfo from "@/hooks/useUpdateQuizCreationInfo";
import { AnswerType, QuizQuestionFormType } from "@/types/QuizType";

interface Props {
  questionId: number;
  list: QuestionTemplateType[];
  selectedOption: QuestionTemplateType;
  setSelectedOption: (option: QuestionTemplateType) => void;
  onUpdateQuestionFormsWithAnswerType: (
    questionId: number,
    newAnswerType: AnswerType,
  ) => void;
}
//TODO: 변수명 직관적으로 변경 필요
function QuestionTemplateTypeUtilButton({
  questionId,
  selectedOption,
  setSelectedOption,
  list,
  onUpdateQuestionFormsWithAnswerType,
}: Props) {
  const { quizCreationInfo, updateQuizCreationInfo } =
    useUpdateQuizCreationInfo();

  const onClick = (option: QuestionTemplateType) => {
    // 현재 질문이 ox이거나 ox로 바꾸려고 하는거면
    // 질문데이터 초기화
    const updatedQuestions: QuizQuestionFormType[] =
      quizCreationInfo.questions?.map((question) =>
        question.id === questionId
          ? question.answerType === "OX" || option.answerType === "OX"
            ? {
                ...question,
                selectOptions: [],
                answerType: option.answerType,
                answers: [],
              }
            : {
                ...question,
                ...selectedOption,
                answerType: option.answerType,
                answers: [],
              }
          : question,
      ) ?? [];

    updateQuizCreationInfo("questions", updatedQuestions);
    onUpdateQuestionFormsWithAnswerType(questionId, option.answerType);

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
      className={styles["question-template-type-util-button-container"]}
      ref={dropDownListRef}
    >
      <Button
        // size="medium"
        color="white"
        onClick={openDropDownList}
        iconPosition={"left"}
        className={styles["button"]}
        icon={<selectedOption.Icon width={18} height={18} stroke={gray60} />}
      >
        <h3>{selectedOption.text}</h3>
        <ArrowDown width={20} height={20} stroke={"#0A090B"} />
      </Button>
      {isOpenDropDownList && anchorEl && (
        <QuestionTemplateUtilList list={list} onClick={onClick} />
      )}
    </div>
  );
}

export default QuestionTemplateTypeUtilButton;
