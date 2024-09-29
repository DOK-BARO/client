import styles from "./_quiz_list_section.module.scss";
import QuizItem from "../quizItem/quizItem.tsx";

export default function QuizListSection() {
  return (
    <section className={styles["container"]}>
      <h3 className={styles["quiz-list-header"]}>퀴즈 리스트</h3>
      <div className={styles["filter-list"]}>
        {/*TODO: 필터 버튼으로*/}
        <span className={styles["filter-title"]}>정렬기준</span>
        <span>관련도순</span>
        <span>인기순</span>
        <span>최신순</span>
      </div>

      <div className={styles["list-container"]}>
        <QuizItem isDokPick={false} quizLevel={"쉬움"} />
        <QuizItem isDokPick={true} quizLevel={"쉬움"} />
        <QuizItem isDokPick={false} quizLevel={"쉬움"} />
        <QuizItem isDokPick={true} quizLevel={"쉬움"} />
        <QuizItem isDokPick={false} quizLevel={"쉬움"} />
        <QuizItem isDokPick={true} quizLevel={"쉬움"} />
      </div>
    </section>
  );
}
