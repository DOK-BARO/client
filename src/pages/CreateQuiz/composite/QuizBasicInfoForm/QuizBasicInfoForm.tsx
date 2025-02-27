import React from "react";
import Input from "@/components/atom/Input/Input";
import Textarea from "@/components/atom/Textarea/Textarea";
import styles from "./_quiz_basic_info_form.module.scss";
import useInput from "@/hooks/useInput.ts";
import useAutoResizeTextarea from "@/hooks/useAutoResizeTextArea";
import useUpdateQuizCreationInfo from "@/hooks/useUpdateQuizCreationInfo";

function QuizBasicInfoForm() {
  const { quizCreationInfo, updateQuizCreationInfo } =
    useUpdateQuizCreationInfo();
  const titleMaxLength = 127;
  const descriptionMaxLength = 150;
  const { value: titleInputValue, onChange: onTitleChange } = useInput(
    quizCreationInfo.title ?? "",
  );
  const {
    value: descriptionTextareaValue,
    onChange: onDescriptionChange,
    textareaRef,
  } = useAutoResizeTextarea(quizCreationInfo.description ?? "", 56, 3);

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    onDescriptionChange(e);
    updateQuizCreationInfo("description", e.target.value);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onTitleChange(e);
    updateQuizCreationInfo("title", e.target.value);
  };

  return (
    <div className={styles["quiz-basic-info-form-container"]}>
      <Input
        size="large"
        id="quiz-basic-info-title"
        value={titleInputValue}
        onChange={handleTitleChange}
        placeholder="퀴즈 제목"
        maxLength={titleMaxLength}
        fullWidth
        label="퀴즈 제목"
        hideLabel
      />
      <div className={styles["quiz-basic-info-description"]}>
        <Textarea
          id="quiz-basic-info-description"
          value={descriptionTextareaValue}
          onChange={handleDescriptionChange}
          placeholder="퀴즈 설명"
          maxLength={descriptionMaxLength}
          textAreaRef={textareaRef}
          maxLengthShow
          fullWidth
          size="large"
          label="퀴즈 설명"
        />
      </div>
    </div>
  );
}

const MemoizedQuizBasicInfoForm = React.memo(QuizBasicInfoForm);
export default MemoizedQuizBasicInfoForm;
