import Input from "../../../components/atom/input";
import Textarea from "../../../components/atom/textarea";
import Button from "../../../components/atom/button";
import styles from "../../../styles/layout/_quizCreationForm.module.scss";
import { Step } from "..";
import { PlusCircle } from "../../../assets/svg/plusCircle";

import { gray0, primary, primary30 } from "../../../styles/abstracts/colors";
import { RightArrow } from "../../../assets/svg/rightArrow";
export default function QuizCreationForm({ steps }: { steps: Step[] }) {
  return (
    <div className={styles["container"]}>
      <h2 className={styles["title"]}>{steps[0].title}</h2>
      <h3 className={styles["step_desc"]}>{steps[0].description}</h3>

      <Button
        size="large"
        className={styles["add_study_group"]}
        onClick={() => {}}
      >
        <PlusCircle
          alt="스터디 그룹 추가 버튼"
          width={24}
          height={24}
          fill={primary}
          stroke={primary30}
        />
        (선택) 스터디 그룹 추가하기
      </Button>
      <Input
        className={styles["quiz-title"]}
        id="quiz-title"
        placeholder="퀴즈 제목을 입력해주세요."
        onChange={() => {}}
        value={""}
      ></Input>
      <Textarea
        id="quiz-description"
        placeholder="퀴즈 설명을 입력해주세요."
        className={styles["quiz-description"]}
        onChange={() => {}}
        value={""}
      ></Textarea>

      <div className={styles["next-container"]}>
        <Button
          className={styles["next"]}
          onClick={() => {
            console.log("next");
          }}
        >
          다음
          <RightArrow alt="다음 버튼" width={20} height={20} stroke={gray0} />
        </Button>
      </div>
    </div>
  );
}
