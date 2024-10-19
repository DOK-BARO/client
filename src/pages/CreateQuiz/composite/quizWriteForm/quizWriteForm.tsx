import { ReactNode, useState } from "react";
import styles from "./_quiz_write_form.module.scss";
import Button from "@/components/atom/button/button.tsx";
import QuizWriteFormItem from "@/pages/CreateQuiz/composite/quizWriteForm/quizWriteFormItem.tsx";

// 3. 퀴즈 작성
export interface QuizWriteFormItemType {
  id: number;
  component: ReactNode;
}

export default function QuizWriteForm() {
  const [quizWriteFormList, setQuizWriteList] = useState<QuizWriteFormItemType[]>([]);
  
  const deleteQuizWriteForm = (targetId: number) => {
    console.log(targetId);

    setQuizWriteList((prevQuizList)=> {
      return prevQuizList.filter(({ id }) => id !== targetId);
    });

  };
  
  const onClickAddQuizWriteForm = () => {
    const id = Date.now();
    setQuizWriteList((prev) => [
      ...prev,
      { id: id, component: <QuizWriteFormItem id={id} deleteQuizWriteForm={deleteQuizWriteForm}/> },
    ]);
  };



  return (
    <div className={styles["container"]}>
      {quizWriteFormList.map((item) => (
        <div key={item.id}>{item.component}</div>
      ))}
      <Button size={"xlarge"} onClick={onClickAddQuizWriteForm}>
        문제 추가하기 +
      </Button>
    </div>
  );
}
