import Button from "@/components/atom/Button/Button";
import styles from "./_quiz_item.module.scss";
import infoFilled from "/public/assets/svg/myPage/info-filled.svg";
import { StudyGroupMyUnSolvedQuizType } from "@/types/StudyGroupType";
import { formatDate } from "@/utils/formatDate";
import { Link, useNavigate } from "react-router-dom";
import useModal from "@/hooks/useModal";
import Modal from "@/components/atom/Modal/Modal";
import { useQuery } from "@tanstack/react-query";
import { studyGroupKeys } from "@/data/queryKeys";
import { studyGroupService } from "@/services/server/studyGroupService";
import GradeResultItem from "../GradeResultItem/GradeResultItem";
import ROUTES from "@/data/routes";

interface Prop {
  quizData: StudyGroupMyUnSolvedQuizType;
  isSolved: boolean;
  studyGroupId: number | undefined;
}

export default function QuizItem({ quizData, isSolved, studyGroupId }: Prop) {
  const navigate = useNavigate();
  const handleGoToSolveQuiz = () => {
    navigate(ROUTES.SOLVING_QUIZ(quizData.quiz.id));
  };
  const { openModal, closeModal, isModalOpen } = useModal();

  console.log(quizData);
  const { data: gradeResult, isLoading: isGradeResultLoading } = useQuery({
    queryKey: studyGroupKeys.quizGradeResult(studyGroupId!, quizData.quiz.id),
    queryFn: () =>
      studyGroupId
        ? studyGroupService.fetchQuizStudyGroupGradeResult({
            studyGroupId,
            quizId: quizData.quiz.id,
          })
        : null,
    enabled: isModalOpen,
  });

  return (
    <li className={styles.container}>
      {isModalOpen ? (
        <Modal
          closeModal={closeModal}
          title={`${quizData.quiz.title} 점수보기`}
          contents={
            !isGradeResultLoading
              ? [
                  {
                    title: "제출한 스터디원",
                    content: gradeResult?.solvedMember ? (
                      <>
                        {gradeResult?.solvedMember.map((memberData) => (
                          <GradeResultItem
                            member={memberData.member}
                            isActive={false}
                            score={10}
                            grade={1}
                          />
                        ))}
                      </>
                    ) : (
                      <></>
                    ),
                  },
                  {
                    title: "미제출 스터디원",
                    content: gradeResult?.unSolvedMember ? (
                      <>
                        {gradeResult?.unSolvedMember.map((member) => (
                          <GradeResultItem
                            key={member.id}
                            member={member}
                            isActive={false}
                            score={10}
                            grade={1}
                            isSubmitted={false}
                          />
                        ))}
                      </>
                    ) : (
                      <></>
                    ),
                  },
                ]
              : []
          }
          bottomButtons={[
            { text: "닫기", color: "primary", onClick: closeModal },
          ]}
        />
      ) : null}
      <div className={styles["left-container"]}>
        <Link to={`/book/${quizData.book.id}`}>
          <div className={styles["img-container"]}>
            <img
              src={quizData.book.imageUrl}
              alt={quizData.book.title}
              className={styles.img}
            />
          </div>
        </Link>
        {/* TODO: 클래스 이름 변경 */}
        <span className={styles["date-container"]}>
          <p className={styles.date}>
            {formatDate(quizData.quiz.createdAt, true)}
          </p>
          <img src={infoFilled} alt="" height={14} width={14} />
        </span>
      </div>
      <div className={styles["right-container"]}>
        <div>
          <p className={styles.title}>{quizData.quiz.title}</p>
          <span className={styles.profile}>
            {quizData.quiz.contributors.length > 0 ? (
              <div className={styles["profile-images-container"]}>
                {[quizData.quiz.creator, ...quizData.quiz.contributors].map(
                  (contributor, index) => (
                    <img
                      src={contributor.profileImageUrl}
                      alt={contributor.nickname}
                      width={16}
                      height={16}
                      className={`${styles["profile-image"]} ${
                        styles[`z-index-${index + 1}`]
                      }`}
                    />
                  ),
                )}
              </div>
            ) : (
              <img
                src={quizData.quiz.creator.profileImageUrl}
                alt={quizData.quiz.creator.nickname}
                width={16}
                height={16}
                className={styles["profile-image"]}
              />
            )}
            <p className={styles["profile-nickname"]}>
              {quizData.quiz.creator.nickname}
              {quizData.quiz.contributors.length > 0 ? " 외" : null}
            </p>
          </span>
          <p className={styles.description}>{quizData.quiz.description}</p>
        </div>
        <div className={styles["button-container"]}>
          {isSolved ? (
            <Button color="white" size="xsmall" fullWidth onClick={openModal}>
              점수 리포트
            </Button>
          ) : null}
          <Button
            color="primary"
            size="xsmall"
            fullWidth
            onClick={handleGoToSolveQuiz}
          >
            {isSolved ? "다시 풀기" : "퀴즈 풀기"}
          </Button>
        </div>
      </div>
    </li>
  );
}
