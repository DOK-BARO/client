import { FC, useState, useEffect } from "react";
import styles from "@/pages/CreateQuiz/composite/quizWriteForm/_quiz_write_form_item.module.scss";
import { QuestionFormMode } from "@/data/constants.ts";
import SelectOptionCheckBox from "@/pages/CreateQuiz/composite/quizWriteForm/selectOptionCheckBox";
import { QuizQuestionType } from "@/types/QuizType";
import useUpdateQuizCreationInfo from "@/hooks/useUpdateQuizCreationInfo";
import { useQuestionTemplate } from "@/hooks/useQuestionTemplate";

export const CheckBoxQuestionTemplate: FC<{
  questionFormMode?: string;
  questionFormId?: string;
}> = ({ questionFormMode, questionFormId }) => {
  const { quizCreationInfo, updateQuizCreationInfo } = useUpdateQuizCreationInfo();
  const {
    options,
    setOptions,
    focusedOptionIndex,
    setFocusedOptionIndex,
    deleteOption,
    onClickAddQuizOptionItem,
    getQuestion,
  } = useQuestionTemplate("CHECK_BOX",questionFormId!);

  const setInitialAnswer = (): { [key: string]: boolean } => {
    const question:QuizQuestionType = getQuestion();
    console.log(question);
    const initCheckedOptions: { [key: string]: boolean } = {};
    question.selectOptions.forEach(({ id, value }) => {
      if (question.answers.includes(value)) {
        // 답안에 value가 포함되어 있으면
        initCheckedOptions[id] = true; // 해당 선택지의 id를 true로 설정
      }
    });
    return initCheckedOptions;
  };
  const [checkedOptions, setCheckedOptions] = useState<{
    [key: string]: boolean;
  }>(setInitialAnswer());

  const disabled: boolean = questionFormMode === QuestionFormMode.QUESTION;
  
  const handleOptionFocus = (id: number) => {
    setFocusedOptionIndex(id);
  };
  const handleOptionBlur = () => {
    setFocusedOptionIndex(null);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked, value } = event.target;
    console.log("onChange: ", id, checked, value);
    console.log("quesformid; ", questionFormId);

    setCheckedOptions((prev) => {
      return {
        ...prev,
        [id]: checked,
      };
    });

    const updatedQuestions = quizCreationInfo.questions!.map((question) =>
      question.id.toString() === questionFormId
        ? {
          ...question,
          answers: checked
            ? [...question.answers, value]
            : question.answers.filter((answer) => answer !== value),
        }
        : question
    );
    updateQuizCreationInfo("questions", updatedQuestions);
  };

  useEffect(() => {
    //TODO: 리팩토링 필요
    const question = getQuestion();
    const initCheckedOptions: { [key: string]: boolean } = {};

    if (questionFormMode === QuestionFormMode.QUESTION) {
      question.selectOptions.forEach(({ id }) => {
        initCheckedOptions[id] = false;
      });
      setCheckedOptions(initCheckedOptions);
    } else {
      question.selectOptions.forEach(({ id, value }) => {
        if (question.answers.includes(value)) {
          // 답안에 value가 포함되어 있으면
          initCheckedOptions[id] = true; // 해당 선택지의 id를 true로 설정
        }
      });
      setCheckedOptions(initCheckedOptions);
    }
  }, [questionFormMode]);

  const setText = (optionId: number, label: string) => {
    const updatedOptions = options.map((option) => {
      if (option.id === optionId) {
        return { ...option, label };
      }
      return option;
    });
    setOptions(updatedOptions);
  };

  return (
    <fieldset className={styles["question-options"]}>
      <legend>답안 선택지</legend>
      {options.map((option) => (
        <SelectOptionCheckBox
          key={option.id}
          option={option}
          checked={checkedOptions[option.id]}
          deleteOption={deleteOption}
          focusedOptionIndex={focusedOptionIndex}
          handleOptionFocus={handleOptionFocus}
          handleOptionBlur={handleOptionBlur}
          disabled={disabled}
          onChange={handleCheckboxChange}
          setText={setText}
          questionFormId={questionFormId!.toString()}
          selectedValue={checkedOptions}
          quizMode={questionFormMode!}
        />
      ))}
      {questionFormMode == QuestionFormMode.QUESTION && (
        <AddOptionButton onAdd={onClickAddQuizOptionItem} />
      )}
    </fieldset>
  );
};

function AddOptionButton({ onAdd }: { onAdd: () => void }) {
  return (
    <div className={styles["option-add-button-container"]}>
      <button className={styles["option-add-button"]} onClick={onAdd}>
        <div className={styles["option-add-button-check-square"]} />
        <span>옵션 추가하기</span>
      </button>
    </div>
  );
}
