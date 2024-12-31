import { quizKeys } from "@/data/queryKeys";
import { quizService } from "@/services/server/quizService";
import { useQuery } from "@tanstack/react-query";
import styles from "../_quiz_result.module.scss";
import Lottie from "lottie-react";
import studyGroupResult from "@/animation/study-group-result.json";
import { StudyRank } from "@/svg/studyQuizResult/StudyRank";
import { gray0, gray30 } from "@/styles/abstracts/colors";
import { currentUserAtom } from "@/store/userAtom";
import { useAtom } from "jotai";
import { SolvingQuizStudyGroupGradeReuslt } from "@/types/QuizType";
import Button from "@/components/atom/Button/Button";

export default function StudyQuizResult({ studyGroupId, quizId }: { studyGroupId: string, quizId: string }) {
	const [currentUser] = useAtom(currentUserAtom);
	// TODO: 스터디 내 결과조회 (api변경 후 반영)
	const { data, isLoading } = useQuery({
		queryKey: quizKeys.studyResult(studyGroupId, quizId),
		queryFn: () => quizService.fetchStudyGradeResult(studyGroupId, quizId),
	});


	const ranking: number = data!.solvedMember.findIndex((member) => (
		member.member.id === currentUser?.id)
	) + 1;


	if (isLoading) {
		return (<div>로딩</div>);
	}
	return (
		<section className={styles["study-group-container"]}>
			<h2 className={styles["title"]}><span>{ }</span>멤버들 중에 <span>{ranking}</span>위를 했어요!</h2>
			{
				ranking === 1 &&
				<Lottie
					className={styles["decoration"]}
					animationData={studyGroupResult}
					loop={false}
				/>}
			<div className={styles["animation-container"]}>
				<ol className={styles["rank-list"]}>
					{data?.solvedMember.map((member, index) => {
						const rank: number = index + 1;
						console.log(member.member.id)
						console.log(currentUser);
						// TODO 현재 유저 가져오는 로직 수정한 후 개발 이어서 해야 할 듯 함.
						// const myRank:boolean =  member.member.id === currentUser!.id;
						const myRank: boolean = true;
						return (
							<li
								key={index}
								className={styles[myRank ? "rank-item--me" : "rank-item"]}>
								<span className={styles["rank-badge-container"]}>
									<span className={styles["rank-badge-wrapper"]}>
										<StudyRank
											className={styles["rank-badge"]}
											width={20} height={20} fill={myRank ? gray0 : gray30} />
										<span className={styles[myRank ? "rank-num--me" : "rank-num"]}>{rank}</span>
									</span>
								</span>
								<span className={styles[myRank ? "nickname--me" : "nickname"]}>{member.member.nickname}</span>
								<span>
									<span className={styles[myRank ? "correct-count--me" : "correct-count"]}>{member.correctCount}</span>
									<span className={styles[myRank ? "total-count--me" : "total-count"]}>/{data.totalQuestionCount}</span>
								</span>
							</li>
						)
					})}
				</ol>
				<Button
					size="medium"
					color="primary"
					className={styles["btn-next"]}
				>
					다음
				</Button>
			</div>
		</section>
	);
}