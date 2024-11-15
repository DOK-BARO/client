import React, { useEffect } from "react";
import { useAtom } from "jotai";
import Input from "@/components/atom/input/input.tsx";
import Textarea from "@/components/atom/textarea/textarea.tsx";
import styles from "./_quiz_basic_info_form.module.scss";
import useInput from "@/hooks/useInput.ts";
import useAutoResizeTextarea from "@/hooks/useAutoResizeTextArea";
import { IsQuizNextButtonEnabledAtom, QuizCreationInfoAtom } from "@/store/quizAtom";
import { BookQuizType } from "@/types/BookQuizType";

function QuizBasicInfoForm() {
  const [quizCreationInfo, setQuizCreationInfo] = useAtom<BookQuizType>(QuizCreationInfoAtom);
  const [, setIsQuizNextButtonEnabled] = useAtom<boolean>(IsQuizNextButtonEnabledAtom);

  const descriptionMaxLength = 150;
  const { value: titleInputValue, onChange: onTitleChange } = useInput(quizCreationInfo.title ?? "");
  const { value: descriptionTextareaValue,onChange: onDescriptionChange,textareaRef } = useAutoResizeTextarea(quizCreationInfo.description ?? "");

  useEffect(() => {
    const  disable = titleInputValue.trim() === "" || descriptionTextareaValue.trim() === "";
    setIsQuizNextButtonEnabled(!disable);
  }, [titleInputValue, descriptionTextareaValue]);

  const updateQuizCreationInfo = (field: keyof BookQuizType, value: string) => {
    setQuizCreationInfo((prev) => (
      {
        ...prev,
        [field]: value
      } 
    ));
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onDescriptionChange(e);
    updateQuizCreationInfo("description",e.target.value);
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onTitleChange(e);
    updateQuizCreationInfo("title",e.target.value);
  }

 
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
