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
  const [quizCreationInfo, setQuizCreationInfo] = useAtom<BookQuizType>(QuizCreationInfoAtom);

  const descriptionMaxLength = 150;
  const { value: titleInputValue, onChange: onTitleChange } = useInput(quizCreationInfo.title ?? "");
  const {
    value: descriptionTextareaValue,
    onChange: onDescriptionChange,
    textareaRef,
  } = useAutoResizeTextarea(quizCreationInfo.description ?? "");

  const [, setIsQuizNextButtonEnabled] = useAtom<boolean>(
    IsQuizNextButtonEnabledAtom
  );

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onDescriptionChange(e);
    setQuizCreationInfo((prev) => (
      {
        ...prev,
        description: e.target.value
      } 
    ));
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onTitleChange(e);
    setQuizCreationInfo((prev) => (
      {
        ...prev,
        title: e.target.value,
      } 
    ));
  }

  useEffect(() => {
    const  disable = titleInputValue.trim() === "" || descriptionTextareaValue.trim() === "";
    setIsQuizNextButtonEnabled(!disable);
  }, [titleInputValue, descriptionTextareaValue]);

  return (
    <div className={styles["quiz-basic-info-form-container"]}>
      <Input
        size="large"
        id="quiz-basic-info-title"
        value={titleInputValue}
        onChange={handleTitleChange}
        placeholder="런닝스쿨! 자바스크립트 첫걸음"
      />
      <div className={styles["quiz-basic-info-description"]}>
        <Textarea
          id="quiz-basic-info-description"
          value={descriptionTextareaValue}
          onChange={handleDescriptionChange}
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
