import { PlusCircle } from "../../../assets/svg/plusCircle";
import Button from "../../../components/atom/button";
import Input from "../../../components/atom/input";
import Textarea from "../../../components/atom/textarea";
import styles from "../../../styles/composite/_quizBasicInfoForm.module.scss";
// import styles from "../../../styles/layout/_quizCreationForm.module.scss";
import { primary, primary30 } from "../../../styles/abstracts/colors";
// 1. 기본 정보 입력
export default function QuizBasicInfoForm() {
  return (
    <>
      <Button
        size="large"
        className={styles["add-study-group"]}
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
        onChange={(e) => {
          console.log(e.currentTarget.value);
        }}
        value={""}
      ></Input>
      <Textarea
        id="quiz-description"
        placeholder="퀴즈 설명을 입력해주세요."
        className={styles["quiz-description"]}
        onChange={(e) => {
          console.log(e.currentTarget.value);
        }}
        value={""}
      ></Textarea>
    </>
  );
}
