import { useState } from "react";
import Button from "../../../components/atom/button";
import Input from "../../../components/atom/input";
import styles from "../../../styles/composite/_quizWriteForm.module.scss";
import useInput from "../../../hooks/useInput";

// 3. 퀴즈 작성
export default function QuizWriteForm() {
  const [quizMode, setQuizMode] = useState<string>("question"); // 질문 작성 or 답안 작성
  const { onChange: onQuestionChange, value: question } = useInput("");
  const { onChange: onOptionChange, value: option } = useInput("");
  // const [optionList, setOptionList] = useState([]);
  const onQuizModeSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
    setQuizMode(e.currentTarget.value);
  };

  return (
    <section className={styles["write-quiz"]}>
      <div className={styles["quiz-mode-buttons"]}>
        <Button
          value="question"
          size="xlarge"
          className={`${styles["set-quiz"]} ${
            quizMode === "question" ? styles["active"] : ""
          }`}
          onClick={onQuizModeSelect}
        >
          질문 설정
        </Button>
        <Button
          value="answer"
          size="xlarge"
          className={`${styles["set-answer"]} ${
            quizMode === "answer" ? styles["active"] : ""
          }`}
          onClick={onQuizModeSelect}
        >
          답안 설정
        </Button>
      </div>
      <div className={styles["input-container"]}>
        <select
          name="question-type"
          id="question-type"
          className={styles["question-type"]}
        >
          <option value="Objective">객관식</option>
          <option value="Subjective">주관식</option>
        </select>
        <Input
          className={styles["question"]}
          value={question}
          onChange={onQuestionChange}
          id="option"
          placeholder="질문을 입력해주세요."
        />
      </div>
      {/* TODO: 컴포넌트 분리하기 */}
      <fieldset className={styles["question-options"]}>
        <legend>답안 선택지</legend>
        <label htmlFor="option1">
          <input type="radio" id="option1" name="option" />
          <span>옵션 1</span>
        </label>
        <label htmlFor="option2">
          <input type="radio" id="option2" name="option" />
          <span>옵션 2</span>
        </label>
        <label htmlFor="option3">
          <input type="radio" id="option3" name="option" />
          <Input
            id="option"
            value={option}
            onChange={onOptionChange}
            placeholder="옵션 추가하기"
          />
        </label>
      </fieldset>
    </section>
  );
}
