import { useParams } from "react-router-dom";
import styles from "./_study_group.module.scss";
import StudyGroupUnsolvedQuiz from "../studyGroupUnsolvedQuiz/studyGroupUnsolvedQuiz";
import StudyGroupSolvedQuiz from "../studyGroupSolvedQuiz/studyGroupSolvedQuiz";

// TODO: 페이지 이동하지 않게
export default function StudyGroup() {
  const { studyGroupId } = useParams();
  const id = studyGroupId ? Number(studyGroupId) : undefined;

  return (
    <section className={styles.container}>
      {/* 풀어야 할 퀴즈 */}
      <StudyGroupUnsolvedQuiz studyGroupId={id} />

      {/* 제출한 퀴즈 */}
      <StudyGroupSolvedQuiz studyGroupId={id} />
    </section>
  );
}
