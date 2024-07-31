import Input from "../../../components/atom/input";
import Textarea from "../../../components/atom/textarea";
import Button from "../../../components/atom/button";
import styles from "../../../styles/layout/_quizCreationForm.module.scss";
import { Step } from "..";

export default function QuizCreationForm({ steps }: { steps: Step[] }) {
  return (
    <div className={styles["container"]}>
      <h2 className={styles["title"]}>{steps[0].title}</h2>
      <h3 className={styles["step_desc"]}>{steps[0].description}</h3>

      <Button className={styles["add_study_group"]} onClick={() => {}}>
        (선택) 스터디 그룹 추가하기
      </Button>
      <Input
        id="quiz-title"
        placeholder="퀴즈 제목을 입력해주세요."
        onChange={() => {}}
        value={""}
      ></Input>
      <Textarea
        id="quiz-description"
        placeholder="퀴즈 설명을 입력해주세요."
        onChange={() => {}}
        value={""}
      ></Textarea>

      <Button
        className={styles["next"]}
        onClick={() => {
          console.log("next");
        }}
      >
        다음
      </Button>
    </div>
  );
}
