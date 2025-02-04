import { useParams } from "react-router-dom";
import styles from "./_study_group.module.scss";
import StudyGroupUnsolvedQuiz from "../StudyGroupUnsolvedQuiz/StudyGroupUnsolvedQuiz";
import StudyGroupSolvedQuiz from "../StudyGroupSolvedQuiz/studyGroupSolvedQuiz";
import { useEffect } from "react";
import { myPageTitleAtom, studyGroupAtom } from "@/store/myPageAtom";
import { useAtom } from "jotai";
import { studyGroupKeys } from "@/data/queryKeys";
import { studyGroupService } from "@/services/server/studyGroupService";
import { useQuery } from "@tanstack/react-query";

export default function StudyGroup() {
  const { studyGroupId } = useParams();
  const id = studyGroupId ? Number(studyGroupId) : undefined;

  // TODO: 중복. 훅으로 분리
  const { data: studyGroupDetail, isLoading: isStudyGroupDetailLoading } =
    useQuery({
      queryKey: studyGroupKeys.detail(id),
      queryFn: () => (id ? studyGroupService.fetchStudyGroup(id) : null),
      enabled: !!id,
    });

  const [, setMyPageTitle] = useAtom(myPageTitleAtom);
  const [, setStudyGroup] = useAtom(studyGroupAtom);

  useEffect(() => {
    if (!isStudyGroupDetailLoading && studyGroupDetail) {
      const studyGroupLeaderId = studyGroupDetail.studyMembers?.find(
        (studyMember) => studyMember.role === "LEADER",
      )?.id;
      setMyPageTitle(studyGroupDetail.name);
      setStudyGroup({
        id: studyGroupDetail.id,
        name: studyGroupDetail.name,
        leaderId: studyGroupLeaderId!,
      });
    }
    return () => {
      setMyPageTitle("마이페이지");
      setStudyGroup(undefined);
    };
  }, [studyGroupDetail]);

  return (
    <section className={styles.container}>
      {/* 풀어야 할 퀴즈 */}
      <StudyGroupUnsolvedQuiz studyGroupId={id} />

      {/* 제출한 퀴즈 */}
      <StudyGroupSolvedQuiz studyGroupId={id} />
    </section>
  );
}
