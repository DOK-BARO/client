import styles from "./_question_form.module.scss";
import { useDropDownList } from "@/hooks/useDropDownList.ts";
import { ArrowDown } from "@/svg/ArrowDown";
import QuestionTemplateUtilList from "@/pages/CreateQuiz/composite/quizWriteForm/questionTemplateUtilList";

import Button from "@/components/atom/Button/Button";
import { QuestionTemplateType } from "@/types/QuestionTemplateType";
import useUpdateQuizCreationInfo from "@/hooks/useUpdateQuizCreationInfo";
import { QuizQuestionType } from "@/types/QuizType";
//TODO: 변수명 직관적으로 변경 필요
function QuestionTemplateTypeUtilButton({
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
        const updatedQuestions: QuizQuestionType[] =
            quizCreationInfo.questions?.map((question) =>
                question.id === quizId
                    ? {
                        ...question,
                        selectOptions: [],
                        answerType: option.answerType,
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
            className={styles["question-template-type-util-button-container"]}
            ref={dropDownListRef}
        >
            <Button
                size="medium"
                color="white"
                onClick={openDropDownList}
                iconPosition={"left"}
                icon={
                    <selectedOption.Icon
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

export default QuestionTemplateTypeUtilButton;
