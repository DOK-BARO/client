import Input from "@/components/atom/input/input.tsx";
import styles from "./_quiz_basic_info_form.module.scss";
import useInput from "@/hooks/useInput.ts";
import { useEffect } from "react";
import Textarea from "@/components/atom/textarea/textarea.tsx";
import React from "react";
import { IsQuizNextButtonEnabledAtom } from "@/store/quizAtom";
import { useAtom } from "jotai";
import useAutoResizeTextarea from "@/hooks/useAutoResizeTextArea";
import { BookQuizType } from "@/types/BookQuizType";
import { QuizCreationInfoAtom } from "@/store/quizAtom";

function QuizBasicInfoForm() {
  const descriptionMaxLength = 150;

  const {
    value: descriptionTextareaValue,
    onChange: onDescriptionChange,
    textareaRef,
  } = useAutoResizeTextarea("");
  const { value: titleInputValue, onChange: onTitleChange } = useInput("");

  const [, setIsQuizNextButtonEnabled] = useAtom<boolean>(
    IsQuizNextButtonEnabledAtom
  );

  const [, setQuizCreationInfo] = useAtom<BookQuizType>(QuizCreationInfoAtom);


  useEffect(() => {
    const disable =
      titleInputValue.trim() === "" || descriptionTextareaValue.trim() === "";
    setIsQuizNextButtonEnabled(!disable);
    
    // FIXME: titleInputValue와 desc onchange에서 따로 구현필요
    setQuizCreationInfo((prev) => ({
      ...prev,
      title: titleInputValue,
      description: descriptionTextareaValue,
    }));
  }, [titleInputValue, descriptionTextareaValue]);

  return (
    <div className={styles["quiz-basic-info-form-container"]}>
      <Input
        size="large"
        id="quiz-basic-info-title"
        value={titleInputValue}
        onChange={onTitleChange}
        placeholder="런닝스쿨! 자바스크립트 첫걸음"
      />
      <div className={styles["quiz-basic-info-description"]}>
        <Textarea
          id="quiz-basic-info-description"
          value={descriptionTextareaValue}
          onChange={onDescriptionChange}
          placeholder="퀴즈 설명"
          maxLength={descriptionMaxLength}
          textAreaRef={textareaRef}
          className={styles["quiz-basic-info-description-text-area"]}
          maxLengthShow
        />
      </div>
    </div>
  );
}

const MemoizedQuizBasicInfoForm = React.memo(QuizBasicInfoForm);
export default MemoizedQuizBasicInfoForm;
