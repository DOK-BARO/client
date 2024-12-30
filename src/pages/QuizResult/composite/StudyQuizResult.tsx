import { quizKeys } from "@/data/queryKeys";
import { quizService } from "@/services/server/quizService";
import { useQuery } from "@tanstack/react-query";
import styles from "../_quiz_result.module.scss";
import Lottie from "lottie-react";
import studyGroupResult from "@/animation/study-group-result.json";


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
			<h2>{}멤버들 중에 {}위를 했어요!</h2>
			<Lottie className={styles["decoration"]} animationData={studyGroupResult} />
			
		</section>
	);
}