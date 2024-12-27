import { useParams } from "react-router-dom";
import styles from "./_study_group.module.scss";
import StudyGroupUnsolvedQuiz from "../studyGroupUnsolvedQuiz/studyGroupUnsolvedQuiz";
import StudyGroupSolvedQuiz from "../studyGroupSolvedQuiz/studyGroupSolvedQuiz";
import { useEffect } from "react";
import { myPageTitleAtom, studyGroupNameAtom } from "@/store/myPageAtom";
import { useAtom } from "jotai";

export default function StudyGroup() {
  const { studyGroupId } = useParams();
  const id = studyGroupId ? Number(studyGroupId) : undefined;

  const [, setMyPageTitle] = useAtom(myPageTitleAtom);
  const [studyGroupName] = useAtom(studyGroupNameAtom);

  useEffect(() => {
    if (studyGroupName) {
      setMyPageTitle(studyGroupName);
    }
    return () => setMyPageTitle("마이페이지");
  }, [studyGroupName]);

  return (
    <section className={styles.container}>
      {/* 풀어야 할 퀴즈 */}
      <StudyGroupUnsolvedQuiz studyGroupId={id} />

      {/* 제출한 퀴즈 */}
      <StudyGroupSolvedQuiz studyGroupId={id} />
    </section>
  );
}
