import { quizKeys } from "@/data/queryKeys";
import { quizService } from "@/services/server/quizService";
import { useQuery } from "@tanstack/react-query";
import styles from "../_quiz_result.module.scss";
import Lottie from "lottie-react";
import studyGroupResult from "@/animation/study-group-result.json";
import { StudyRank } from "@/svg/studyQuizResult/StudyRank";
import { gray30 } from "@/styles/abstracts/colors";

export default function StudyQuizResult({ studyGroupId, quizId }: { studyGroupId: string, quizId: string }) {
	// TODO: 스터디 내 결과조회 (api변경 후 반영)
	const { data, isLoading } = useQuery({
		queryKey: quizKeys.studyResult(studyGroupId, quizId),
		queryFn: () => quizService.fetchStudyGradeResult(studyGroupId, quizId),
	});
	if (isLoading) {
		return (<div>로딩</div>);
	}
	return (
		<section className={styles["study-group-container"]}>
			<h2>{ }멤버들 중에 { }위를 했어요!</h2>
			{/* TODO: 1등일때만 보이게 */}
			<Lottie
				className={styles["decoration"]}
				animationData={studyGroupResult}
				loop={false}
			/>
			<ol className={styles["rank-list"]}>
				{data?.solvedMember.map((member, index) => {
					const rank: number = index + 1;
					return (
						<li className={styles["rank-item"]}>
							<span className={styles["rank-badge-container"]}>
								<span className={styles["rank-badge-wrapper"]}>
								<StudyRank
									className={styles["rank-badge"]}
									width={20} height={20} fill={gray30} />
								<span className={styles["rank-num"]}>{rank}</span>
								</span>
							</span>
							<span className={styles["nickname"]}>{member.member.nickname}</span>
							<span>
								<span className={styles["correct-count"]}>{member.correctCount}</span>
								<span className={styles["total-count"]}>/{data.totalQuestionCount}</span>
							</span>
						</li>
					)
				})}
			</ol>
		</section>
	);
}