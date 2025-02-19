import { quizKeys, studyGroupKeys } from "@/data/queryKeys";
import { quizService } from "@/services/server/quizService";
import { useQuery } from "@tanstack/react-query";
import styles from "../_quiz_result.module.scss";
import Lottie from "lottie-react";
import studyGroupResult from "@/animation/study-group-result.json";
import { StudyRank } from "@/svg/studyQuizResult/StudyRank";
import { gray00, gray30 } from "@/styles/abstracts/colors";
import { currentUserAtom } from "@/store/userAtom";
import { useAtom } from "jotai";
import Button from "@/components/atom/Button/Button";
import { studyGroupService } from "@/services/server/studyGroupService";
import { useNavigate } from "react-router-dom";
import ROUTES from "@/data/routes";
import LoadingSpinner from "@/components/atom/LoadingSpinner/LoadingSpinner";
interface Props {
  studyGroupId: number;
  quizId: number;
}
export default function StudyQuizResult({ studyGroupId, quizId }: Props) {
  const [currentUser] = useAtom(currentUserAtom);
  const navigate = useNavigate();

  const { data: quizResultStudyData, isLoading: isQuizResultStudyLoading } =
    useQuery({
      queryKey: quizKeys.studyResult(studyGroupId, quizId),
      queryFn: () => quizService.fetchStudyGradeResult(studyGroupId, quizId),
    });

  const { data: studyGroupData, isLoading: isStudyGroupLoading } = useQuery({
    queryKey: studyGroupKeys.detail(studyGroupId),
    queryFn: () => studyGroupService.fetchStudyGroup(studyGroupId),
  });

  const ranking: number =
    (quizResultStudyData?.solvedMember.findIndex(
      (member) => member.member.id === currentUser?.id,
    ) ?? -1) + 1;

  const handleDoneClick = () => {
    navigate(ROUTES.STUDY_GROUP(studyGroupId));
  };

  if (isQuizResultStudyLoading || isStudyGroupLoading) {
    return <LoadingSpinner pageCenter width={40} />;
  }
  return (
    <section className={styles["study-group-container"]}>
      <h2 className={styles["title"]}>
        <span>{studyGroupData?.name}</span> 멤버들 중에 <span>{ranking}</span>
        위를 했어요!
      </h2>
      {ranking === 1 && (
        <Lottie
          className={styles["decoration"]}
          animationData={studyGroupResult}
          loop={false}
        />
      )}
      <div className={styles["animation-container"]}>
        <ol className={styles["rank-list"]}>
          {quizResultStudyData?.solvedMember.map((member, index) => {
            const rank: number = index + 1;
            const myRank: boolean = member.member.id === currentUser!.id;

            return (
              <li
                key={index}
                className={styles[myRank ? "rank-item--me" : "rank-item"]}
              >
                <span className={styles["rank-badge-container"]}>
                  <span className={styles["rank-badge-wrapper"]}>
                    <StudyRank
                      className={styles["rank-badge"]}
                      width={20}
                      height={20}
                      fill={myRank ? gray00 : gray30}
                    />
                    <span
                      className={styles[myRank ? "rank-num--me" : "rank-num"]}
                    >
                      {rank}
                    </span>
                  </span>
                </span>
                <span className={styles[myRank ? "nickname--me" : "nickname"]}>
                  {member.member.nickname}
                </span>
                <span>
                  <span
                    className={
                      styles[myRank ? "correct-count--me" : "correct-count"]
                    }
                  >
                    {member.correctCount}
                  </span>
                  <span
                    className={
                      styles[myRank ? "total-count--me" : "total-count"]
                    }
                  >
                    /{quizResultStudyData.totalQuestionCount}
                  </span>
                </span>
              </li>
            );
          })}
        </ol>
        <Button
          size="medium"
          color="primary"
          className={styles["btn-next"]}
          onClick={handleDoneClick}
        >
          완료
        </Button>
      </div>
    </section>
  );
}
