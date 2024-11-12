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
  //TODO: 제목 텍스트 값을 전역변수로 사용하고 있다보니 titleInputValue는 사용하지 않아도 될듯 함. 어떻게 처리할지 논의 필요
  const { value: titleInputValue, onChange: onTitleChange } = useInput("");

  const [, setIsQuizNextButtonEnabled] = useAtom<boolean>(
    IsQuizNextButtonEnabledAtom
  );

  const [quizCreationInfo, setQuizCreationInfo] = useAtom<BookQuizType>(QuizCreationInfoAtom);


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
        value={quizCreationInfo.title}
        onChange={handleTitleChange}
        placeholder="런닝스쿨! 자바스크립트 첫걸음"
      />
      <div className={styles["quiz-basic-info-description"]}>
        <Textarea
          id="quiz-basic-info-description"
          value={quizCreationInfo.description}
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
