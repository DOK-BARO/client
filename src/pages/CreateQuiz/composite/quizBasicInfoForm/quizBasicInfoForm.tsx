import Input from "@/components/atom/input/input.tsx";
import styles from "./_quiz_basic_info_form.module.scss";
import useInput from "@/hooks/useInput.ts";
import { useEffect } from "react";

export default function QuizBasicInfoForm({setIsButtonDisabled} : {setIsButtonDisabled: (isDisabled: boolean) => void}) {
  const  { value:titleInputValue,onChange:onTitleChange }= useInput("");
  const { value:descriptionInputValue,onChange:onDescriptionChange }= useInput("");
  const maxLength = 150;

  useEffect(() => {
    const isDisabled = titleInputValue.trim() === "" || descriptionInputValue.trim() === "";
    setIsButtonDisabled(isDisabled);
  }, [titleInputValue, descriptionInputValue, setIsButtonDisabled]);

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
        <Input
          size="large"
          id="quiz-basic-info-description"
          value={descriptionInputValue}
          onChange={onDescriptionChange}
          placeholder="퀴즈 설명"
        />
        <div className={styles["quiz-basic-info-description-max-length"]}>
          {descriptionInputValue.length}/{maxLength}
        </div>
      </div>
    </div>
  );
}