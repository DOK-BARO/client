import styles from "../_quiz_item.module.scss";
import infoFilled from "/public/assets/svg/myPage/infoFilled.svg";
import link from "/public/assets/svg/myPage/link.svg";
import Button from "@/components/atom/Button/Button";
import Tooltip from "@/components/atom/Tooltip/Tooltip";
import ROUTES from "@/data/routes";
import useTooltip from "@/hooks/useTooltip";
import { MySolvedQuizDataType } from "@/types/QuizType";
import { Link } from "react-router-dom";

// 푼 퀴즈 아이템
export default function SolvedQuizItem({
  myQuiz,
  formattedDate,
  onReSolveQuiz,
  onCopyQuizLink,
}: {
  myQuiz: MySolvedQuizDataType;
  formattedDate: string;
  onReSolveQuiz: (
    e: React.MouseEvent<HTMLButtonElement>,
    quizId: number,
  ) => void;
  onCopyQuizLink: (
    e: React.MouseEvent<HTMLButtonElement>,
    quizId: number,
  ) => void;
}) {
  const { isTooltipVisible, showTooltip, hideTooltip } = useTooltip();

  return (
    <li>
      <Link
        to={ROUTES.QUIZ_DETAIL(myQuiz.quiz?.id)}
        className={styles.container}
      >
        <div className={styles["left-container"]}>
          <div className={styles["img-container"]}>
            <img src={myQuiz.bookImageUrl} alt={""} className={styles.img} />
          </div>
          <div className={styles["creator-profile"]}>
            <img
              src={myQuiz.quiz.creator.profileImageUrl ?? ""} // TODO: defaultImage 설정하기
              alt={`${myQuiz.quiz.creator.nickname}님의 프로필 이미지`}
              width={32}
              height={32}
              className={styles.profile}
            />
            <p>{myQuiz.quiz.creator.nickname}</p>
          </div>
        </div>
        <div className={styles["right-container"]}>
          <div>
            <div className={styles["right-container-header"]}>
              <span className={styles["date-container"]}>
                <p className={styles.date}>{formattedDate}</p>
                <img
                  onMouseEnter={showTooltip}
                  onMouseLeave={hideTooltip}
                  alt="푼 날짜"
                  src={infoFilled}
                  height={14}
                  width={14}
                />
                {isTooltipVisible && (
                  <Tooltip className={styles.tooltip} label="푼 날짜" />
                )}
              </span>

              <Button
                className={styles["copy-link"]}
                onClick={(e) => onCopyQuizLink(e, myQuiz.quiz.id)}
                iconOnly
                icon={
                  <img
                    src={link}
                    width={20}
                    height={20}
                    alt="퀴즈 공유 링크 복사"
                  />
                }
              />
            </div>
            <p className={styles.title}>{myQuiz.quiz.title}</p>
            {/* TODO: description 넣기 */}
            <p className={styles.description}>{""}</p>
          </div>
          <Button
            fullWidth
            color="primary"
            size="small"
            onClick={(e) => onReSolveQuiz(e, myQuiz.quiz.id)}
            className={styles.resolve}
          >
            다시 풀기
          </Button>
        </div>
      </Link>
    </li>
  );
}
