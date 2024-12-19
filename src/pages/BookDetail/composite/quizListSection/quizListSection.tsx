import styles from "./_quiz_list_section.module.scss";
import QuizItem from "../quizItem/quizItem.tsx";
import Button from "@/components/atom/button/button.tsx";

export default function QuizListSection() {
  return (
    <section className={styles["container"]}>
      <h3 className={styles["quiz-list-header"]}>퀴즈 목록</h3>
      <div className={styles["filter-list"]}>
        <span className={styles["filter-title"]}>정렬기준</span>
				<div className={styles["filter-button-area"]}>
        <Button 
				className={styles["filter-button"]}
				size="xsmall" color="transparent">인기순</Button>
        <Button 
				className={styles["filter-button"]}
				size="xsmall" color="transparent">최신순</Button>
				</div>
      </div>

      <div className={styles["list-container"]}>
				{/* TODO: 이거 그리기 */}
        <QuizItem quizLevel={"쉬움"} />
        <QuizItem  quizLevel={"쉬움"} />
        <QuizItem  quizLevel={"쉬움"} />
        <QuizItem  quizLevel={"쉬움"} />
        <QuizItem  quizLevel={"쉬움"} />
        <QuizItem  quizLevel={"쉬움"} />
      </div>
    </section>
  );
}
