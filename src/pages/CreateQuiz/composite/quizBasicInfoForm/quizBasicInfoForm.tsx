import Input from "@/components/atom/input/input.tsx";
import styles from "./_quiz_basic_info_form.module.scss";
import useInput from "@/hooks/useInput.ts";
import { useEffect, useRef } from "react";
import Textarea from "@/components/atom/textarea/textarea.tsx";
import useTextarea from "@/hooks/useTextarea.ts";

export default function QuizBasicInfoForm({ setIsButtonDisabled } : {setIsButtonDisabled: (isDisabled: boolean) => void}) {
  const descriptionMaxLength = 150;
  const  { value:titleInputValue,onChange:onTitleChange }= useInput("");
  const { value:descriptionTextareaValue,onChange:onDescriptionChange }= useTextarea("");

  useEffect(() => {
    const isDisabled = titleInputValue.trim() === "" || descriptionTextareaValue.trim() === "";
    setIsButtonDisabled(isDisabled);
  }, [titleInputValue, descriptionTextareaValue, setIsButtonDisabled]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 자동 높이 조절
  useEffect(() => {

    if (textareaRef.current) {
      if(descriptionTextareaValue.length > 0){
        textareaRef.current.style.height = "auto"; // 초기 높이를 auto로 설정
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 내용에 따라 높이 조절
      }else{
        textareaRef.current.style.height = "56px";
      }
    }
  }, [descriptionTextareaValue.length]); // value가 변경될 때마다 실행

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
        />
      </div>
    </div>
  );
}